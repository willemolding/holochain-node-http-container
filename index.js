const express = require('express')
var bodyParser = require('body-parser');

const Container = require('./holochain-nodejs/lib/container');

const server = express();
server.use(bodyParser.json());

let installedHapps = {};

/*======================================
=            HTTP Callbacks            =
======================================*/

server.post('/call/', (req, res) => {
	const {happ, zome, capability, func, data} = req.body;

	console.log();
	console.log("Calling: ", {happ, zome, capability, func});
	console.log("With: ", data);

	try {
		const result = installedHapps[happ].call(zome, capability, func, JSON.stringify(data));
		console.log("Result: ", result);
		res.json(result);		
	} catch (err) {
		console.error(err);
		res.status(400).send("Could not call holochain function");
	}

});

/*=====  End of HTTP Callbacks  ======*/




const configPath = process.argv[2];
let config;

if(configPath) {
	try {
		config = require(configPath);
	} catch (err) {
		console.error("Error:", configPath, "does not exist");
		process.exit()
	}
} else {
	console.error("Error: Script requires a single argument which is the path to a config json file");
	process.exit();
}


const {port, happs} = config;

// load and start all the apps
Object.keys(happs).forEach((appName) => {
	try {
		installedHapps[appName] = Container.loadAndInstantiate(happs[appName]);
		installedHapps[appName].start();
		
	} catch (err) {
		console.error(err);
	}
});

// start the web server
server.listen(port, () => console.log(`Holochain HTTP server listening on port ${port}!`));



