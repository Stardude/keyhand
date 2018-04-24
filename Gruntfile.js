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
                        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                        'node_modules/angular-resource/angular-resource.min.js',
                        'node_modules/lodash/lodash.min.js'
                    ]
                }
            }
        },
        watch: {
            less: {
                files: ['frontend/styles/**/*.less'],
                tasks: ['less']
            }
        },
        injector: {
            options: {
                template: 'frontend/index.template.html',
                ignorePath: ['frontend']
            },
            dependencies: {
                files: {
                    'frontend/index.html': ['frontend/config/**/*.js', 'frontend/components/**/*.js']
                }
            }
        }
    });

    grunt.registerTask('build', ['clean', 'includeSource', 'concat:dependencies_js', 'less', 'injector']);
};
