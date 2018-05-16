/*
Logger class for easy and aesthetically pleasing console logging. Thanks to York, Kashall edited it.
*/
const moment = require('moment');

class Logger {

	static log(content, type = 'log') {
		const timestamp = `\x1b[45m«(${moment().format('MM-DD-YYYY hh:mm:ss A')})»\x1b[0m |`;
		switch (type) {
			case 'api': {
				return console.log(`${timestamp} \x1b[102m${type.toUpperCase()}\x1b[0m | ${content} `);
			}
			case 'log': {
				return console.log(`${timestamp} \x1b[104m${type.toUpperCase()}\x1b[0m | ${content} `);
			}
			case 'warn': {
				return console.log(`${timestamp} \x1b[30m\x1b[43m${type.toUpperCase()}\x1b[0m | ${content} `);
			}
			case 'error': {
				return console.log(`${timestamp} \x1b[101m${type.toUpperCase()}\x1b[0m | ${content}`);
			}
			case 'debug': {
				return console.log(`${timestamp} \x1b[42m${type.toUpperCase()}\x1b[0m | ${content} `);
			}
			case 'cmd': {
				return console.log(`${timestamp} \x1b[30m\x1b[107m${type.toUpperCase()}\x1b[0m | ${content}`);
			}
			case 'ready': {
				return console.log(`${timestamp} \x1b[30m\x1b[102m${type.toUpperCase()}\x1b[0m | ${content}`);
			}
			default: throw new TypeError('Logger type must be either warn, debug, log, ready, cmd or error.');
		}
	}

	static error(content) {
		console.trace(content);
		return this.log(content, 'error');
	}

	static warn(content) {
		return this.log(content, 'warn');
	}

	static debug(content) {
		return this.log(content, 'debug');
	}

	static cmd(content) {
		return this.log(content, 'cmd');
	}

}

module.exports = Logger;
