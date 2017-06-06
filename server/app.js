const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
/* eslint-disable global-require*/
if (process.env.NODE_ENV === 'development') require('./secrets');
/* eslint-enable */

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

app.use('/', routes);

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(8080, () => console.log('Server running in PORT 8080'));

module.exports = app;
