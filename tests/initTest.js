
var  chai          = require("chai")
    , expect        = chai.expect
    , grunt         = require(__dirname +"/gruntmock")
    , fs            = require('fs-extra')
    , S             = require('string')
    ;


describe('merge tap log files', function(){

    var opt = function(){
    };

    before(function(done){
        require(__dirname +"/../tasks/grunt-merge-tap-files.js")(grunt, opt);
        fs.mkdirs(__dirname +'/tmp', function (err) {
            fs.copy(__dirname +'/testfiles', __dirname +'/tmp', function (err) {
                done();
            });
        });
    });
    
    after(function(done){
        fs.remove(__dirname +'/tmp', function (err) {
            expect(err).to.be.null;
            done();
        });
    });

    it('should be loadable', function(done){
        expect(grunt.tasks).to.have.property('mergetapfiles');
        expect(grunt.tasks).to.have.property('options');
        done();
    });
    
    it('should merge two files', function(done){
        grunt.set('cmd', __dirname +  '/tmp');
        grunt.set('src',  ['tap1.log', 'tap2.log']);
        grunt.set('outputFile', 'tapmerge.log');
        grunt.tasks.mergetapfiles();

        fs.readFile(__dirname +'/tmp/tapmerge.log', function(err, data){
            expect(err).to.be.null;
            expect(data.toString()).to.contains('# tests 129');
            expect(data.toString()).to.contains('# pass 127');
            expect(data.toString()).to.contains('# fail 2');
            done();
        });
    });
    
});