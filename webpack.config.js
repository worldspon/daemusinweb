const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/main.js'],
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  devServer: {
    host: '192.168.0.25',//your ip address
    port: 8080,
    overlay: true,
    historyApiFallback: true,
    contentBase: '/src',
    proxy: {
      '/': {
        target: 'http://211.192.165.100:3030',
        secure: false,
        changeOrigin : true
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
  ]
};