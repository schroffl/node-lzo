# node-lzo [![npm version](https://badge.fury.io/js/lzo.svg)](https://badge.fury.io/js/lzo)
Node.js Bindings for [LZO](http://www.oberhumer.com/opensource/lzo/)

## Example
```javascript
const lzo = require('lzo');

console.log('Current version:', lzo.version, '-', lzo.versionDate);

let str = 'I am a test string, an awesome test string. Wohooo!',
    compressed = lzo.compress(str);

console.log('Original Length:', str.length, '-- Compressed length:', compressed.length);

let decompressed = lzo.decompress(compressed);

console.log('Decompressed Length:', decompressed.length);
console.log(decompressed.toString());
```

## Properties
#### version
The version of [LZO](http://www.oberhumer.com/opensource/lzo/) being used.

#### versionDate
The date on which the version was released.

#### errors
An object containing the lzo error codes as seen below.


## Methods
#### compress(data)
*data* can be anything, as long as it can be converted to a String. Buffers however, are passed directly.  
Returns the compressed data in form of a Buffer. The compressed length can just be read via its `length` property.

#### decompress(data)
*data* can be anything, as long as it can be converted to a String. Buffers however, are passed directly.  
Returns the decompressed data in form of a Buffer.

## Errors
Code | Description
-------------: | :------------- 
`-1` | LZO\_E\_ERROR
`-2` | LZO\_E\_OUT\_OF\_MEMORY
`-3` | LZO\_E\_NOT\_COMPRESSIBLE
`-4` | LZO\_E\_INPUT\_OVERRUN
`-5` | LZO\_E\_OUTPUT\_OVERRUN
`-6` | LZO\_E\_LOOKBEHIND_OVERRUN
`-7` | LZO\_E\_EOF\_NOT\_FOUND
`-8` | LZO\_E\_INPUT\_NOT\_CONSUMED
`-9` | LZO\_E\_NOT\_YET\_IMPLEMENTED
`-10` | LZO\_E\_INVALID\_ARGUMENT
`-11` | LZO\_E\_INVALID\_ALIGNMENT
`-12` | LZO\_E\_OUTPUT\_NOT\_CONSUMED
`-99` | LZO\_E\_INTERNAL\_ERROR
`-128` | ERR\_LZO\_INIT\_FAILED
