module.exports = {
    devServer: {
        port: 80,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/style/index.scss";`
            }
        }
    }
}