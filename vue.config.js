/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - Clean Vue.js Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


module.exports = {
  publicPath: '/',
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    hotOnly: true,
    disableHostCheck: true,
    clientLogLevel: 'warning',
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    proxy: {
      '/api': {
        target: 'http://192.168.208.104:3030',
        changeOrigin: true
      },
      '/assets': {
        target: 'http://192.168.208.104:3030',
        changeOrigin: true
      },
      '/api/socket.io': {
        target: 'http://192.168.208.104:3030',
        changeOrigin: true
      },
      '/socket.io': {
        target: 'ws://192.168.208.104:3030',
        ws: true,
        changeOrigin: true
      },
      // '/sockjs-node': {
      //   target: 'ws://192.168.208.100:3030',
      //   ws: true,
      //   changeOrigin: true
      // }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  runtimeCompiler: true
}
