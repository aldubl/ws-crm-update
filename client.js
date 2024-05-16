const core = require('@actions/core');
const github = require('@actions/github');
const WebSocket = require('ws');

try {

	const url = core.getInput('url');
	const comand = core.getInput('comand');
	
	const ws = new WebSocket('ws://' + url);
	
	core.setOutput("output", "ok1");
	
	ws.on('open', function open() {
		console.log('Connection ok');
		ws.send('comand'); // Замените на ваши аргументы
	});


	ws.on('message', function incoming(data) {
		var res = data.toString('utf8')

		if (res === 'close') {
			core.setOutput("output", "ok2");
			console.log('Closing ok');
			ws.close();
		} else {
			console.log(res);
			core.setOutput("output", res);
		}
	});

	ws.on('close', function close() {
		console.log('Close');
	});


	core.setOutput("output", "ok3");

} catch (error) {
  core.setFailed(error.message);
}