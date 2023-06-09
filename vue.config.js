const webpack = require('webpack')

module.exports = {
    lintOnSave: false,
    publicPath: './',
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
		chainWebpack: config => {
			// svg rule loader
			const svgRule = config.module.rule('svg') // 找到svg-loader
			svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
			svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
			svgRule.test(/\.svg$/).use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: 'icon-[name]' })
		}
}
// module.exports = {
//   publicPath: './',
// 	chainWebpack: config => {
// 		// svg rule loader
// 		const svgRule = config.module.rule('svg') // 找到svg-loader
// 		svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
// 		svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
// 		svgRule.test(/\.svg$/).use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: 'icon-[name]' })
// 	}
// }