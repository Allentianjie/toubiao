module.exports = {
    publicPath: './',
    productionSourceMap: false,
    chainWebpack: config => {
        config.module.rule('pug')
            .test(/\.pug$/)
            .use('pug-html-loader')
            .loader('pug-html-loader')
            .end()
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV !== "production") {
            // 开发环境配置
            config.devtool = "source-map";
        }
    },
    devServer: {
        // 处理host不识别
        disableHostCheck: false,
        https: false,
        // 配置自动启动浏览器
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/': {
                ws: false, // proxy websockets
                target: 'http://neizhen-gateway:9999',
                changeOrigin: true,
                pathRewrite: {
                    '^/': '' //需要rewrite重写的,
                }
            },
        }
    }
}
