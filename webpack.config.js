const webpack = require('webpack');

module.exports = {
  entry: [
    'jquery/dist/jquery.min.js',
    'bootstrap/dist/js/bootstrap.min.js',
    'bootstrap/dist/css/bootstrap.css',
    './browser/src/index.js',
  ],
  output: {
    path: __dirname,
    filename: './server/public/js/bundle.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: [ 'react', 'es2015'] },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.ncss$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
};
