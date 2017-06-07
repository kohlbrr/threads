const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../index');

const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = user.Model.generateSalt();
    user.password = user.Model.encryptPassword(user.password, user.salt);
  }
};

module.exports = db.define('user', {

  name: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'Guest',
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  address: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
  googleId: Sequelize.STRING,
  facebookId: Sequelize.STRING,
  isAdmin: Sequelize.BOOLEAN,
},
  {
    instanceMethods: {
      validPassword(candidatePwd) {
        return this.Model.encryptPassword(candidatePwd, this.salt) === this.password;
      },
    },
    classMethods: {
      generateSalt() {
        return crypto.randomBytes(16).toString('base64');
      },
      encryptPassword(plainText, salt) {
        return crypto.createHash('sha1').update(plainText).update(salt).digest('hex');
      },
    },
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword,
    },
  });

