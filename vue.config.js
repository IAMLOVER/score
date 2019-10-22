const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
};
module.exports = {
    publicPath: "/",
    lintOnSave: false, //关闭整个页面的eslint检查
    productionSourceMap: true,
    chainWebpack(config) {
        config.resolve.alias
            .set('components', resolve('src/components'))
    }
};