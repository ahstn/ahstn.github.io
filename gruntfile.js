module.exports = function (grunt) {

    //require('time-grunt')(grunt); // output up time
    //require('load-grunt-tasks')(grunt); // load all tasks

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        copy: {
            main: {
                files: [
                    {
                        expand : true,
                        flatten: true,
                        filter : 'isFile',

                        src: ['node_modules/bootstrap/dist/css/**'],
                        dest: 'styles/bootstrap/'
                    },
                    {
                        expand : true,
                        flatten: true,
                        filter : 'isFile',

                        src: ['node_modules/bootstrap/dist/fonts/**'],
                        dest: 'styles/fonts/'
                    },
                    {
                        expand : true,
                        flatten: true,
                        filter : 'isFile',

                        src: ['node_modules/font-awesome/css/**'],
                        dest: 'styles/font-awesome/'
                    },
                    {
                        expand : true,
                        flatten: true,
                        filter : 'isFile',

                        src: ['node_modules/font-awesome/fonts/**'],
                        dest: 'styles/fonts/'
                    },
                    {
                        expand : true,
                        flatten: true,
                        filter : 'isFile',

                        src: ['node_modules/jquery/dist/**'],
                        dest: 'scripts/jquery/'
                    }
                ],
            },
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

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', ['concat', 'less']);
    grunt.registerTask('default', ['concat', 'less', 'copy', 'watch']);
};
