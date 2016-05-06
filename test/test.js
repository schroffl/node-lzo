'use strict';

const chai = require('chai');
const lzo = require('../index');

const expect = chai.expect;

let compressed;

describe('Compression', () => {
	it('Should throw if nothing is passed', () => 
		expect(() => lzo.compress()).to.throw(TypeError)  );

	it('Should properly compress and not throw', () => 
		expect(() => (compressed = lzo.compress('Please don\'t throw!')) ).to.not.throw() );
});

describe('Decompression', () => {
	it('Should throw if nothing is passed', () => 
		expect(() => lzo.decompress()).to.throw(TypeError)  );

	it('Should properly decompress and not throw', () => 
		expect(() => lzo.decompress(compressed)).to.not.throw() );
});

describe('Version Stuff', () => {
	it('Should have property \'version\'', () => 
		expect(lzo).to.have.ownProperty('version') );

	it('Should have property \'versionDate\'', () => 
		expect(lzo).to.have.ownProperty('versionDate') );
});