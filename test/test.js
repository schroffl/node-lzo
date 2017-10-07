'use strict';

const chai = require('chai');
const crypto = require('crypto');
const lzo = require('../index');

const expect = chai.expect;

let data = crypto.randomBytes(100),
    compressed;

describe('Compression', () => {
  it('Should throw if nothing is passed', () => 
    expect(() => lzo.compress()).to.throw() );

  it('Should properly compress and not throw', () => {
    expect(() => {
      compressed = lzo.compress(data)
    }).to.not.throw();
  });
});

describe('Decompression', () => {
  it('Should throw if nothing is passed', () => 
    expect(() => lzo.decompress()).to.throw() );

  it('Should properly decompress and not throw', () =>
    expect( data.compare(lzo.decompress(compressed)) ).to.equal(0) );
});

describe('Properties', () => {
  it('Should have property \'version\'', () => 
    expect(lzo).to.have.ownProperty('version') );

  it('Should have property \'versionDate\'', () => 
    expect(lzo).to.have.ownProperty('versionDate') );

  it('Should have property \'errors\' (lzo error codes)', () =>
    expect(lzo).to.have.ownProperty('errors') );
});