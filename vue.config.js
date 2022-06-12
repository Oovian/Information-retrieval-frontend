const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
})


let proxyObj = {}
let proxyObj_mock = {}

proxyObj['/'] = {
  ws: false,
  target: 'http://101.43.129.108:8000/',
  changeOrigin: true,
  pathReWrite: {
    '^/': '/'
  }
}

proxyObj_mock['/'] = {
  ws: false,
  target: 'http://127.0.0.1:4523/mock/1046951/',
  changeOrigin: true,
  pathReWrite: {
    '^/': '/'
  }
}
module.exports = {
  devServer: {
    host: 'localhost',
    port: 9099,
    proxy: proxyObj
  }
}