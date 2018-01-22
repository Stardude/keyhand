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
        watch: {
            less: {
                files: ['frontend/styles/**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.registerTask('build', ['less']);
};
