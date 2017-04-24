'use strict';

var _       = require('underscore')
    , S     = require("string")
    , fs    = require("fs")
    , async = require("async")
;

module.exports = function (grunt) {

    var mergedFile = '';
    var mergedArray = [];
    var count = 1;
    var notOk = 0;

    var lineByLine = function (file, callback) {

        var fileArray = fs.readFileSync(file, {encoding: 'utf8'}).toString().split('\n');

        async.each(fileArray, function (row, next) {
            if(S(row).left(2).contains('ok') || S(row).left(3).contains('not')) {
                var newRow = '';
                var rowArray = row.split(' ');
                newRow += rowArray.shift();
                if(newRow == 'not') {
                    notOk++;
                    newRow += ' ' + rowArray.shift();
                }
                delete rowArray[0];
                newRow += ' ' + count;
                count++;
                newRow += ' ' + rowArray.join(' ');
                mergedArray.push(newRow);
            }
            return next(null);
        },
        function (err) {
            return callback(null);
        });
    };

    grunt.registerTask('mergetapfiles', 'Merge tap files into one tap file.', function () {
        var options = this.options({
            outputFile : ''
        });

        var confparam = _.compact(
            _.map(process.argv, function(elm){
                if(S(elm).startsWith("--conf:")){
                    return elm;
                }
            })
        );

        var conffiles = _.flatten(_.compact(
            _.map(process.argv, function(elm){
                if(S(elm).startsWith("--conffiles=")){
                    return elm.replace("--conffiles=", "").split(',');
                }
            })
        ));

        if(!_.isString(options.cmd) || _.isEmpty(options.cmd)) {
            return grunt.error('cmd is not set or no string');
        }
        if(!_.isArray(options.src) || _.isEmpty(options.src)) {
            return grunt.error('src is not set or no array');
        }
        if(!_.isString(options.outputFile) || _.isEmpty(options.outputFile)) {
            return grunt.error('outputFile is not set or no string');
        }

        var _slash = '/';
        if(S(options.cmd).right(1).s == '/') {
            _slash = '';
        }
        var fileSave = options.cmd + _slash + options.outputFile;

        async.each(options.src, function (item, next) {

            var file = options.cmd + _slash + item;
            //check if file exists
            if (fs.existsSync(file)) {
                lineByLine(file, function (err) {
                    return next(err);
                });

            } else {
                return grunt.error('Tap file ' + item + ' no exists.');
            }
        },
        function (err) {
            mergedArray.unshift('1..' + count);
            mergedArray.push('# tests ' + count);
            mergedArray.push('# pass ' + (count - notOk));
            mergedArray.push('# fail ' + notOk);

            mergedFile = mergedArray.join('\n');

            var err = fs.writeFileSync(
                fileSave
                , mergedFile
                , {encoding: 'utf8'}
                );
            if(err) {
                grunt.error(err);
            }

        });
    });
};