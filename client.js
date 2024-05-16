const core = require('@actions/core');
const github = require('@actions/github');
const WebSocket = require('ws');

try {

	const url = core.getInput('url');
	const comand = core.getInput('comand');
	
	const ws = new WebSocket('ws://' + url);
	
	ws.on('open', function open() {
		console.log('Подключение удалось');
		ws.send(comand);
	});

	ws.on('message', function incoming(data) {
		var res = data.toString('utf8')

		if (res = 'bad'){
			core.setFailed('Сервер не смог разобрать команду');
		} else if (res === 'close') {
			console.log('Завершение');
			ws.close();
		} else {
			console.log(res);
		}
	});

	ws.on('close', function close() {
		console.log('Готово');
	});


} catch (error) {
	const url = core.getInput('url');
	const comand = core.getInput('comand');

	core.setFailed(error.message);
}