'use strict'

const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  'mode': 'development',
  entry: {
      app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    port: 7878,
    hot: true
  },
  plugins: [
    // vue-loader所需插件
    new VueLoaderPlugin(),
    // webpack-dev-server实现热重载所需插件
    new webpack.HotModuleReplacementPlugin(),
    // 根据模板生成html，在html中插入引用打包文件的<srcipt>标签
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // 在生成打包文件之前，先清理输出文件夹
    new CleanWebpackPlugin(['dist'])
  ]
}