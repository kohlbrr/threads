const Product = require('./Product');
const User = require('./User');
const Cartcontents = require('./Cartcontents');
const Review = require('./Review');
const Design = require('./Design');
const Category = require('./Category');
const Clothing = require('./Clothing');
const Order = require('./Order');
const OrderProducts = require('./OrderProducts');

Product.belongsTo(Design);
Product.belongsToMany(Order, { through: OrderProducts });
Product.belongsToMany(User, { through: Cartcontents });

Design.hasMany(Product, { onDelete: 'cascade', hooks: 'true' });
Design.belongsTo(Clothing);
Design.belongsTo(Category);
Design.hasMany(Review);

Clothing.hasMany(Category, { onDelete: 'cascade', hooks: true });
Clothing.hasMany(Design);

Category.belongsTo(Clothing);
Category.hasMany(Design, { onDelete: 'cascade', hooks: true });

User.hasMany(Review);
User.belongsToMany(Product, { through: Cartcontents });
User.hasMany(Order);

Review.belongsTo(User);
Review.belongsTo(Design);

Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderProducts });

module.exports = {
  Product,
  User,
  Cartcontents,
  Review,
  Design,
  Category,
  Clothing,
  Order,
  OrderProducts,
};
