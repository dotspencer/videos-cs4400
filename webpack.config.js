var path = require('path');

module.exports = {
  entry: [__dirname + '/js/main.js'],
  output: {
    path: path.join(__dirname + '/js'), // Output directory
    filename: 'bundle.js'
  }
}