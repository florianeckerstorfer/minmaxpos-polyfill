module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            'src/**/*.js',
            'test/**/*.spec.js',
            'node_modules/polyfill/dist/polyfill.js'
        ],
        frameworks: ['browserify', 'jasmine'],
        preprocessors: {
            'src/**/*.js': ['browserify'],
            'test/**/*.js': ['browserify']
        },
        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        },
        exclude: [],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
};
