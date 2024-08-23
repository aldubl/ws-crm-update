const core = require('@actions/core');
const github = require('@actions/github');
const WebSocket = require('ws');

try {

	const url = core.getInput('url');
	const comand = core.getInput('comand');

	console.log(url);
	console.log(comand);
	
	const ws = new WebSocket('ws://' + url);
	
	ws.on('open', function open() {
		console.log('Подключение удалось');
		ws.send(comand);
	});

	ws.on('message', function incoming(data) {
		var res = data.toString('utf8');

		switch (res) {
		    case 'error':
		        core.setFailed('Выполнение завершилось с ошибкой.');
		        ws.close();
		        break;
		    case 'bad':
		        core.setFailed('Сервер не смог разобрать команду');
		        ws.close();
		        break;
		    case 'close':
		        console.log('Завершение');
		        ws.close();
		        break;
		    default:
		        console.log(res);
		        break;
		}

	});

	ws.on('close', function close() {
		console.log('Готово');
	});


} catch (error) {
	const url = core.getInput('url');
	const comand = core.getInput('comand');

	core.setFailed("Ошибка при выполнении: " + error.message);
}