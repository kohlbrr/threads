/* eslint-disable global-require*/
if (process.env.NODE_ENV === 'development') require('./secrets');
/* eslint-enable */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const session = require('express-session');
const passport = require('passport');;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');

const PORT = process.env.PORT || 8080;

const store = new SequelizeStore({ db });

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, '../node_modules')));

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;


app.use(session({
  secret: process.env.SESSION_SECRET || 'This is the development secret',
  store,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Server Error');
});

db.sync()
.then(() =>
  app.listen(PORT, () => console.log('Server running in PORT ${PORT}')));


module.exports = app;
