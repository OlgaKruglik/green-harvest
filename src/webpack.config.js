const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
mode: 'development',
devtool: 'eval-source-map',
entry: { main: path.resolve(__dirname, 'src', 'scripts', 'index.tsx') },
output: {
filename: '[name].[contenthash].js',
path: path.resolve(__dirname, 'dist')
},
watch: true,
module: {
rules: [
// ... другие правила
{
test: /\.tsx?$/,
exclude: /node_modules/,
use: {
loader: 'babel-loader',
options: {
presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
}
}
},
// Правило для обработки SVG файлов
{
test: /\.svg$/,
use: ['file-loader']
}
]
},
resolve: {
extensions: ['.tsx', '.ts', '.js', '.jsx']
},
plugins: [
new CleanWebpackPlugin(),
new HTMLWebpackPlugin({
title: 'webpack test',
template: path.resolve(__dirname, 'src', 'index.html')
})
],
devServer: {
historyApiFallback: true,
}
};
