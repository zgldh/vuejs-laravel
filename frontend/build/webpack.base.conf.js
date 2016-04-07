var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/index.js',
    admin: './src/admin.js',
  },
  output: {
    path: path.resolve(__dirname, '../../public/dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: "[id].chunk.js"
  },
  resolve: {
    extensions: ['', '.js', '.css', '.sass', '.scss', '.vue'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      "jQuery": "jquery"
    })
  ],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules|semantic/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loader: 'scss'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      },
      {test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
      {test: /\.woff2$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2"},
      {test: /\.ttf$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
      {test: /\.eot$/, loader: "file-loader"},
      {test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"}
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
