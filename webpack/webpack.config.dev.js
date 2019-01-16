const path = require('path');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootFolder = path.resolve(__dirname, '..');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: [
    path.resolve(__dirname, '../src/client') 
  ],

  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {

    alias: {
      client: path.resolve(rootFolder, 'src/client'),
      utils: path.resolve(rootFolder, 'src/app/utils'),
      routes: path.resolve(rootFolder, 'src/app/routes'),
      action: path.resolve(rootFolder, 'src/app/actions'),
      reducers: path.resolve(rootFolder, 'src/app/reducers'),
      constants: path.resolve(rootFolder, 'src/app/constants'),
      components: path.resolve(rootFolder, 'src/app/components'),

      scss: path.resolve(rootFolder, 'src/app/scss'),
      vars: path.resolve(rootFolder, 'src/app/scss/_vars.scss'),
      mixins: path.resolve(rootFolder, 'src/app/scss/_mixins.scss'),
    },

    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.scss'],

    modules: [
      'node_modules',
      'src/app',
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          // 'resolve-url-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]__[hash:base64:5]',
            }
          },
          'sass-loader',
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?limit=100000',
      }
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: [
              'last 3 version',
              'ie >= 10',
            ],
          }),
        ],
        context: path.join(__dirname, '../src'),
      },
    }),


    // // Формирует CSS
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    })
  ]
};
