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

        mergetapfiles: {
            options: {
                cmd: __dirname + '/tmp',
                src: ['tapNode.log', 'tapTestem.log'],
                outputFile: 'tap.log'
            }
        }

    });
    
    require('load-grunt-tasks')(grunt);

    // Default task(s)
    grunt.registerTask('default', [
        'mergetapfiles'
    ]);
};