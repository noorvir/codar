// Exports all functions from files with .func.js ending

const glob = require("glob");

const files = glob.sync('./**/*.func.js', { cwd: __dirname, ignore: './node_modules/**' });
for (let f = 0, fl = files.length; f < fl; f++) {
	const file = files[f];
	const functionPath = file.slice(0, -('.func.js'.length)).split('/');
	const functionName = functionPath[functionPath.length - 1];
	if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
		exports[functionName] = require(file);
	}
}