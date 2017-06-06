const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(8080, () => console.log('Server running in PORT 8080'));
