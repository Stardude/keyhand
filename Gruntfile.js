module.exports = grunt => {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            default: {
                files: {
                    'frontend/assets/css/style.css': 'frontend/styles/style.less'
                },
                options: {
                    compress: true
                }
            }
        },
        clean: {
            assets: [
                'frontend/assets/css/**',
                'frontend/assets/js/**'
            ]
        },
        includeSource: {
            options: {
                basePath: 'frontend/'
            },
            dist: {
                files: {
                    'frontend/index.html': 'frontend/index.template.html'
                }
            }
        },
        concat: {
            dependencies_js: {
                files: {
                    'frontend/assets/js/dependencies.js': [
                        'node_modules/angular/angular.min.js',
                        'node_modules/angular-ui-router/release/angular-ui-router.min.js'
                    ]
                }
            }
        },
        watch: {
            less: {
                files: ['frontend/styles/**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.registerTask('build', ['clean', 'includeSource', 'concat:dependencies_js', 'less']);
};
