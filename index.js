const express = require('express')
var bodyParser = require('body-parser');

const Container = require('./holochain-nodejs/lib/container');

const server = express();
server.use(bodyParser.json());
const port = 3000;

server.post('/call/', (req, res) => {
	const {happ, zome, capability, func, data} = req.body;

	console.log();
	console.log("Calling: ", {happ, zome, capability, func});
	console.log("With: ", data);

	const result = app.call(zome, capability, func, JSON.stringify(data));
	console.log("Result: ", result);
	res.json(result);
});

// start the holochain app
const app = Container.loadAndInstantiate("./holochain-nodejs/app-spec-rust.hcpkg");
app.start();

// start the web server
server.listen(port, () => console.log(`Holochain HTTP server listening on port ${port}!`));
