'use strict';

const lzo = require('bindings')('node_lzo');
const errCodes = { 
	'-1': 'LZO_E_ERROR',
	'-2': 'LZO_E_OUT_OF_MEMORY',
	'-3': 'LZO_E_NOT_COMPRESSIBLE',
	'-4': 'LZO_E_INPUT_OVERRUN',
	'-5': 'LZO_E_OUTPUT_OVERRUN',
	'-6': 'LZO_E_LOOKBEHIND_OVERRUN',
	'-7': 'LZO_E_EOF_NOT_FOUND',
	'-8': 'LZO_E_INPUT_NOT_CONSUMED',
	'-9': 'LZO_E_NOT_YET_IMPLEMENTED',
	'-10': 'LZO_E_INVALID_ARGUMENT',
	'-11': 'LZO_E_INVALID_ALIGNMENT',
	'-12': 'LZO_E_OUTPUT_NOT_CONSUMED',
	'-99': 'LZO_E_INTERNAL_ERROR',
	'-128': 'ERR_INIT_FAILED - lzo_init() failed'
};

module.exports = {
	'compress': input => {
		if(!(input instanceof Buffer))
			input = new Buffer(input.toString());

		let output = new Buffer(input.length + (input.length / 16) + 64 + 3),
			result = lzo.compress(input, output);

		if(result.err !== 0)
			throw new Error('Compression failed with code: ' + errCodes[result.err]);
		else
			return output.slice(0, result.len);
	},
	'decompress': input => {
		if(!(input instanceof Buffer))
			input = new Buffer(input.toString());

		let output = new Buffer(input.length * 3),
			result = lzo.decompress(input, output);

		if(result.err !== 0)
			throw new Error('Decompression failed with code: ' + errCodes[result.err]);
		else
			return output.slice(0, result.len);
	},
	'version': lzo.version,
	'versionDate': lzo.versionDate
};