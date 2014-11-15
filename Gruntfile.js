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
                    rbush: true,
                    CensusTract: true,
                    GentrificationModel: true,
                    _: false,
                    d3: false,

                    // Mocha

                    describe: false,
                    it: false,
                    beforeEach: false,
                    afterEach: false,
                    chai: false,
                    expect: true,
                    sinon: false
                }
            },
            source: {
                src: [ 'src/*.js', 'Gruntfile.js', 'package.json' ]
            },
            test: {
                src: [ 'spec/SpecHelper.js', 'spec/src/*Spec.js' ],
            },
            grunt: {
                src: [ 'Gruntfile.js' ]
            }
        },

        karma: {
            development: {
                configFile: 'spec/karma.conf.js',
                background: true
            },
            unit: {
                configFile: 'spec/karma.conf.js',
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
                    'spec/**',
                    'Gruntfile.js'
                ],
                tasks: [ 'build:js' ]
            }

        }
    });

    /* Run tests once. */
    grunt.registerTask('test', [ 'jshint', 'karma:test' ]);

    /* Default (development): Watch files and lint, test, and build on change. */
    grunt.registerTask('default', ['karma:development:start', 'watch']);

    grunt.registerTask('build:js', [
        'jshint',
        'karma:development:run'
    ]);
};
