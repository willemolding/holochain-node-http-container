# Holochain-node-HTTP-container

An early version of a HTTP interface for holochain-rust.

## Configuration

This project combines holochain-nodejs and express to allow holochain hApp functions to be called over HTTP POST.

All configuration is done via a config.json file. The HTTP container must be started with the path to a config as the argument. The config file has the following structure:

```javascript
{
	"port": "3000", // use whatever port you like
	"happs": {
		"happ-Name": "path/to/hApp/hcpkg" // happ names map to the path to the hcpkg file
		...
	}
}
```

This allows for multiple hApps to be included and functions in each of them can be called by their name.

## Usage

All happ/zome function are exposed at a single HTTP POST endpoint `/call/`

The post request expects a JSON body with the following format:

```javascript
{
	"happ": "happ-name",
	"zome": "zome-name",
	"capability": "capability-name",
	"func": "function-name",
	"data": // any valid JSON object to be passed to the function call
}
```

