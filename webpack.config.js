const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/main.js'],
  output: {
    publicPath: '/',
    path: __dirname + '/build',
    filename: '[name].js'
  },
  module: {
    rules: [
      { 
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name () {
              return '[hash].[ext]'
            },
            publicPath: '/assets/images/',
            outputPath: '/assets/images/'
          }  
        }]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  devServer: {
    host: '192.168.242.193',//your ip address
    port: 8080,
    overlay: true,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: 'http://211.192.165.100:3031',
        secure: false,
        changeOrigin : true
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new VueLoaderPlugin(),
  ]
};