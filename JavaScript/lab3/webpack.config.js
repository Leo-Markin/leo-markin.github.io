const path = require('path');

module.exports = {
  mode: 'development',
  entry: './lab3.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};