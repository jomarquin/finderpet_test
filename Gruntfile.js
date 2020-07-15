module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            files: ['css/*.scss'],
            tasks: ['css']
        },

        browserSync: {
            dev: {
                bsFiles: { //borwser filer
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './' //Directorio base para nuestro servidor
                    }
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['images/*.{png,gif,jpg,jpeg}'],
                    dest: 'dist/',
                }]
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist/',
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/open-iconic/font',
                    src: ['fonts/*.*'],
                    dest: 'dist',
                }]
            }
        },

        clean: {
            build: {
                src: ['dist/']
            }
        },

        cssmin: {
            dist: {}
        },

        uglify: {
            dist: {}
        },

        filerev: {
            options: {
                enconding: 'utf8',
                algorithm: 'md5',
                length: 20
            },

            release: {
                files: [{
                //filerev: release hashes(md5) all assets (images, js and css)
                //in dist directory
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },

        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html', 'about.html', 'contact.html', 'prices.html', 'terms.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block){
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },

        usemin: {
            html: ['dist/index.html', 'dist/about.html', 'dist/contact.html', 'dist/prices.html', 'dist/terms.html'],
            options: {
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
        }

    });

    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    //grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);
};