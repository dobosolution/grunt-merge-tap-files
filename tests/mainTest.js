
var chai = require("chai")
    , expect = chai.expect
    ;

// Test if the main file is there
describe('main script', function () {
    it('should be loadable.', function (done) {
    	var packagejson = require('../package.json');
    	expect(packagejson).to.be.ok;
    	expect(packagejson).to.have.property('main');
    	var scriptfile = packagejson.main;
    	var module = require('../'+ scriptfile);
    	expect(module).to.be.ok;
    	done();
    });
});
