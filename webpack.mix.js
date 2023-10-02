const mix = require('laravel-mix');
const path = require('path');
const fs = require('fs');
require('laravel-mix-compress');

const getWebpackConfig = (libraryName) => ({
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
    },
    output: {
        library: libraryName,
        libraryTarget: 'window',
    },
    stats: 'errors-only',
});

// Configure for typeCheck.js
mix.js('src/TypeCheck.js', 'dist/typeCheck.js')
    .webpackConfig(getWebpackConfig('typeCheck'))
    .setPublicPath('dist')
    .compress({
        useBrotli: true,
    })
    .webpackConfig(getWebpackConfig('PowerHelpers'))
    .disableNotifications();
