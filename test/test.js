'use strict';

const chai = require('chai');
const lzo = require('../index');

const expect = chai.expect;

let string = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
	compressed;

describe('Compression', () => {
	it('Should throw if nothing is passed', () => 
		expect(() => lzo.compress()).to.throw() );

	it('Should properly compress and not throw', () => {
		expect(() => {
			compressed = lzo.compress(string)
		}).to.not.throw();
	});
});

describe('Decompression', () => {
	it('Should throw if nothing is passed', () => 
		expect(() => lzo.decompress()).to.throw() );

	it('Should properly decompress and not throw', () =>
		expect(lzo.decompress(compressed).toString()).to.equal(string) );
});

describe('Properties', () => {
	it('Should have property \'version\'', () => 
		expect(lzo).to.have.ownProperty('version') );

	it('Should have property \'versionDate\'', () => 
		expect(lzo).to.have.ownProperty('versionDate') );

	it('Should have property \'errors\' (lzo error codes)', () =>
		expect(lzo).to.have.ownProperty('errors') );
});