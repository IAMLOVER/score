const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
};
module.exports = {
  publicPath:"/credit_score/",
  lintOnSave: false, //关闭整个页面的eslint检查
  productionSourceMap: false,
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
  }
};