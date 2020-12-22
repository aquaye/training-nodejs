const config = require("platformsh-config").config();

// comment

// new comment

// new comment

let creds;
if (config.hasRelationship('mongodatabase')) {
	creds = config.credentials('mongodatabase');
}

let MongoClient;
let dbName;
let client;
let db;
let collection;
let doc;
let result;

const doDb = async () => {
	if (creds) {
		MongoClient = require('mongodb').MongoClient;

		// Database Name
		dbName = creds.path;

		// Create a new MongoClient
		client = await MongoClient.connect(config.formattedCredentials('mongodatabase', 'mongodb'));

		db = client.db(dbName);

		collection = db.collection('test');

		doc = {'test': true};

		collection.insert(doc, {w:1});

		result = await collection.find({}).toArray();

		collection.remove();
	}
}

const port = config.port || 4000

const http = require('http')

const hostname = 'localhost'

const server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.end('Hello World\n')
})

// add another change

// yet another change

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
	// doDb().then(() => {
	// 	if (result) { Object.keys(result).forEach(key => console.log(`Database returned ${key}:${result[key].test}`)) };
	// });
});
