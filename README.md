# grunt-merge-tap-files

Merge several tap.log files into one tap.log file.

Sometimes you have more than one test result file in your project. One for the backend, one for the frondend, etc. Buut in Jenkins it is possible to set one tap.log, only. Use this tool to merge all tap.log files info one singe file to see all test results in yur favourite build server Jenkins.


## Installation

```bash
$ npm install grunt-merge-tap-files --save-dev
```

## Usage

`grunt-merge-tap-files` merges several tap.log files together.  

Example in _Gruntfile.js_:

```js
grunt.initConfig({
    [...]
    , mergetapfiles: {
        options: {
            cmd: __dirname + '/out',
            src: ['tap1.log', 'tap2.log'],
            outputFile: 'tapmerged.log'
        }
    }
    [...]
});

grunt.loadNpmTasks('grunt-merge-tap-files');

grunt.registerTask('default', [
    [...]
    , 'mergetapfiles'
    [...]
]);

```

## Discussion

Please see the Issue-Tracker on [GitHub](https://github.com/dobosolution/grunt-merge-tap-files/issues). Merge reuests are welcome. 


