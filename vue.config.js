const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

//Cesium
const cesiumSource = './node_modules/cesium/Source'
const cesiumBuild = './node_modules/cesium/Build/Cesium'

module.exports = {
    // 基本路径
    publicPath: "./",
    // 输出文件目录
    outputDir: "dist",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === "darwin",
        host: "0.0.0.0",
        port: 5000,
        https: false,
        hotOnly: false,
        disableHostCheck: true

    },

    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
                'cesium': path.resolve(__dirname, cesiumBuild)
            }
        },
        plugins: [
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'cesium/Workers' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumBuild, 'Assets'), to: 'cesium/Assets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumBuild, 'Widgets'), to: 'cesium/Widgets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: 'cesium/ThirdParty' }]),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('./cesium/')
            }),
        ],
    }
};
