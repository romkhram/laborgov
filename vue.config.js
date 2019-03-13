const path = require('path');
const webpack = require('webpack');

module.exports = {
    publicPath: process.env.NODE_ENV == 'production' ? '/ui/' :  '/ui',
    devServer: {
      proxy: {
        '/api': {
          target: 'https://95.216.167.149:31100/',
          changeOrigin: true
        },
        '/file': {
          target: 'https://95.216.167.149:31100/',
          changeOrigin: true
        },
        '/utils': {
          target: 'https://95.216.167.149:31100/',
          changeOrigin: true
        },
        '/reports': {
          target: 'https://95.216.167.149:31100/',
          changeOrigin: true
        },
        '/epetitions': {
          target: 'https://95.216.167.149:31100/',
          changeOrigin: true
        },
        '/delivery': {
          target: 'https://95.216.167.149:31100/',
          changeOrigin: true
        },
        '/scheduler': {
          target: 'https://95.216.167.149:31100/',
          changeOrigin: true
        },
        '/epetitionsFile': {
          target: 'https://95.216.167.149:31100/',
          changeOrigin: true
        },
        '/oauth2server': {
          target: 'https://95.216.167.149:31100/',
          changeOrigin: true
        },
      }
    },
    configureWebpack: {
          resolve: {
            alias: {
                Api: path.resolve(__dirname, 'src/api/'),
                Components: path.resolve(__dirname, 'src/components/'),
                Constants: path.resolve(__dirname, 'src/constants/'),
                Container: path.resolve(__dirname, 'src/container/'),
                Views: path.resolve(__dirname, 'src/views/'),
                Helpers: path.resolve(__dirname, 'src/helpers/'),
                Themes: path.resolve(__dirname, 'src/themes/')
            },
            extensions: ['*', '.js', '.vue', '.json']
        },
        plugins: [
              //jquery plugin
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery'
            })
        ]
    }
}
