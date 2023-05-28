const { MongoClient, ServerApiVersion } = require('mongodb');
const { SSM, config } = require('aws-sdk');
config.update({region:'us-east-1'});

let uri;
let client;
let connectedClient;
let collection;

exports.handler = async function (event, context) {
    try {
        if (!uri) {
            const ssm = new SSM();
            const result = await ssm
                .getParameter({ Name: 'mongoDbPassword', WithDecryption: true })
                .promise();
            const password = result.Parameter.Value;
            uri = `mongodb+srv://nhunt:${password}@explorelikealocal.zcljk.mongodb.net/?retryWrites=true&w=majority`;
        }
        if (!client) {
            client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        }

        if (!connectedClient) {
            connectedClient = await client.connect();
        }

        if (!collection) {
            collection = connectedClient.db("explore").collection("main");
        }

        const query = { city: "Atlanta" };
        const options = {
            projection: { _id: 0 },
        };
        const city = await collection.findOne(query, options);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(city)
        };
    }
    catch (err) {
        if (connectedClient) {
            connectedClient.close();
        }
        console.error('Caught an error! - ', err);
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: 'Error! ' + err
        };
    }
};
