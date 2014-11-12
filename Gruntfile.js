module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                node: true,
                browser: true,
                esnext: true,
                bitwise: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                regexp: true,
                undef: true,
                unused: true,
                trailing: true,
                smarttabs: true,
                globals: {
                    L: false,

                    // Mocha

                    describe: false,
                    it: false,
                    before: false,
                    after: false,
                    beforeEach: false,
                    afterEach: false,
                    chai: false,
                    expect: false,
                    sinon: false
                }
            },
            source: {
                src: [ 'src/*.js', 'Gruntfile.js', 'package.json' ]
            },
            test: {
                src: [ 'test/SpecHelper.js', 'test/src/**' ],
            },
            grunt: {
                src: [ 'Gruntfile.js' ]
            }
        },

        less: {
            source: {
                files: {
                    'dist/Leaflet.Toolbar.css': 'src/Toolbar.less'
                }
            }
        },

        karma: {
            travis: {
                configFile: 'test/karma.conf.js',
                background: false,
                singleRun: true,
                browsers: [ 'PhantomJS' ]
            },
            development: {
                configFile: 'test/karma.conf.js',
                background: true
            },
            unit: {
                configFile: 'test/karma.conf.js',
                background: false,
                singleRun: true
            }
        },

        watch: {
            options : {
                livereload: true
            },
            source: {
                files: [
                    'src/*.js',
                    'test/**',
                    'Gruntfile.js'
                ],
                tasks: [ 'build:js' ]
            },
            css: {
                files: [ 'src/*.less' ],
                tasks: [ 'build:css' ]
            }

        },

        concat: {
            dist: {
                options: {
                    banner: '(function(window, document, undefined) {\n\n"use strict";\n\n',
                    footer: '\n\n}(window, document));'
                },
                src: [
                    'src/ToolbarAction.js',
                    'src/Toolbar.js',
                    'src/ToolbarGroup.js',
                    'src/Toolbar.*.js'
                ],
                dest: 'dist/Leaflet.Toolbar.js',
            }
        }
    });

    /* Run tests once. */
    grunt.registerTask('test', [ 'jshint', 'karma:test' ]);

    /* Default (development): Watch files and lint, test, and build on change. */
    grunt.registerTask('default', ['karma:development:start', 'watch']);

    grunt.registerTask('build:js', [
        'jshint',
        'karma:development:run',
        'concat:dist'
    ]);

    grunt.registerTask('build:css', [ 'less' ]);
};
