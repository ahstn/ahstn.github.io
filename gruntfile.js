module.exports = function (grunt) {

    //require('time-grunt')(grunt); // output up time
    //require('load-grunt-tasks')(grunt); // load all tasks

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserSync: {
            bsFiles: {
                src: [
                    'pages/*.html',
                    'styles/*.css',
                    'styles/less/*.less'
                ],
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        },
        concat: {
            files: {
                src: [
                    'styles/less/variables.less',
                    'styles/less/home.less',
                    'styles/less/content.less',
                    'styles/less/shortcuts.less'
                ],
                dest: "styles/less/main.less",
                nonull: true
            }
        },

        less: {
            development: {
                options: {
                    compress: false, //removes whitespace
                    optimization: 2, // tree node creating
                    strictMath: true // math in parenthesis
                },
                files: {
                    'styles/main.css': 'styles/less/main.less'
                }
            }
        },

        watch: {
            styles: {
                files: ['styles/less/*.less'],
                tasks: ['concat', 'less'],
            },
            scripts: {
                files: ['Scripts/**/*.js'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', ['concat', 'less']);
    grunt.registerTask('default', ['concat', 'less', 'watch']);
};
