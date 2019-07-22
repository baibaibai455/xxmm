const production_boo = process.env.NODE_ENV == 'production';

const TerserPlugin = require('terser-webpack-plugin');

/*----------------* 代理的域名*---------------*/
const base_config = require('./src/utils/base.config');
const baseURL = base_config.baseURL;


module.exports = {
    publicPath: './',
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [require('postcss-px2rem')({
                    remUnit: 37.5
                })]
            },
            sass: {
                // data: require('fs').readFileSync('src/scss/var.scss', 'utf-8')
            }
        }
    },

    productionSourceMap: false,

    devServer: {
        // open: true,      //自动打开浏览器
        host: '',
        port: '',
        public: '',
        proxy: {
            '^/proxy': {
                target: baseURL,
                ws: true, // 是否启用websockets
                changOrigin: true,//开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    '^/proxy': '/'
                }
            }
        }
    },

    configureWebpack: {
        performance: {
            hints: false // 选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」  build时候的警告
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {

                            warnings: true,
                            drop_console: true,//console
                            drop_debugger: true,
                            pure_funcs: ['console.log', 'alert']//移除console,alert

                        }
                    }
                })
            ]
        }
    },
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');

        // 或者
        // 修改它的选项：
        // config.plugin('prefetch').tap(options => {
        //     options[0].fileBlacklist = options[0].fileBlacklist || [];
        //     options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/);
        //     return options;
        // });
    }
};



