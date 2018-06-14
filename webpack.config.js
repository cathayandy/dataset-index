var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var url = require('url');
var config = require('./config.js');

module.exports = {
    entry: {
        index: './static/index.jsx',
    },
    output: {
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/dist/',
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                cacheDirectory: false,
                presets: ['es2015', 'react', 'stage-2'],
                plugins: [
                    'transform-object-rest-spread',
                    [
                        'import',
                        {
                            libraryName: 'antd',
                            style: true,
                        },
                    ],
                ],
            },
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader',
            }),
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                use: 'css-loader?sourceMap!postcss-loader!less-loader?{"sourceMap":true}',
            }),
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]',
            },
        }, {
            test: /\.md$/,
            use: [{
                loader: 'babel-loader',
                query: {
                    cacheDirectory: false,
                    presets: ['es2015', 'react', 'stage-2'],
                },
            }, {
                loader: 'react-markdown-loader',
            }],
        }],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify(
                        process.env.NODE_ENV || 'development'
                    ),
                },
            },
            config: {
                ip: JSON.stringify(config.ip),
                port: JSON.stringify(config.port),
                title: JSON.stringify(config.title),
            }
        }),
    ],
    resolve: {
        extensions: ['.js', '.css', '.jsx', 'less', '.md'],
        modules: ['node_modules'],
    },
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            test: /(\.jsx|\.js)$/,
            compress: {
                warnings: false,
            },
        }),
    ]);
    module.exports.devtool = 'source-map';
}