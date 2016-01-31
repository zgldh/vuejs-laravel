module.exports = {
    entry: {
        main: './src/main.js',
        admin: './src/admin.js',
    },
    output: {
        path: '../public/dist',
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.js$/,
                loader: 'babel!eslint',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/
            },
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/,
                loader: 'url',
                query: {
                    // inline files smaller then 10kb as base64 dataURL
                    limit: 10000,
                    // fallback to file-loader with this naming scheme
                    name: '[name].[ext]?[hash]'
                }
            },
            // Bootstrap 4
            {test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery'},
            {test: /\.(woff2?|svg)$/, loader: 'url?limit=10000'},
            {test: /\.(ttf|eot)$/, loader: 'file'}
        ]
    },
    // vue-loader config:
    // lint all JavaScript inside *.vue files with ESLint
    // make sure to adjust your .eslintrc
    vue: {
        loaders: {
            js: 'babel!eslint'
        }
    }
}
