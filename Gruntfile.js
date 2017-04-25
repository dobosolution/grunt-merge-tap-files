var path    = require('path')
    , fs    = require('fs')
    ;

module.exports = function(grunt) {

    var conf =  {
        buildDir: 'build',
        targetDir: 'target',
        outDir: 'out',
        docsDir: 'docs'
    };
    PROJECT_NAME = __dirname.split(path.sep).pop();
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // cleanup previous builds
        clean: {
            all: {
                src: [conf.buildDir, conf.targetDir, conf.outDir, conf.docsDir]
            }
        },

        // make build directories
        mkdir: {
            all: {
                options: {
                    create: [
                        , conf.outDir
                    ]
                }
            }
        },
        
        // generate docs
        jsdoc : {
            dist : {
                src: ['tasks/**/*.js'],
                options: {
                    destination: conf.docsDir,
                    template: 'node_modules/minami'
                }
            }
        },
        
        // linter
        eslint: {
            src: ['tasks/**/*.js'],
            options: {
                outputFile: conf.outDir +'/checkstyle.xml',
                format: 'checkstyle'
            }       
        },
        
        // testing and coverage
        exec: {
            npm: {
                cmd: 'NODE_ENV=production npm install'
            }
            , test: {
                 cmd: 'npm test > '+ conf.outDir +'/tap.log'
            }
            , cvover: {
                cmd: 'find ./tests/ -name "*Test.js" | xargs node_modules/.bin/istanbul cover --report cobertura --dir '+ conf.outDir +' node_modules/.bin/_mocha'
            }
        }

    });
    
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("gruntify-eslint");
    
    // Default task(s)
    grunt.registerTask('default', [
        'clean',
        'mkdir',
        'exec',
        'jsdoc',
        'eslint'        
    ]);
};