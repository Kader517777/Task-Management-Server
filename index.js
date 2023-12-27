const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://rajbarishibir:IV7KqcOO0R3qktbb@cluster0.8imixau.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });

        const taskCollection = client.db("Task-Management").collection("taskCollection");
        app.get('/', (req, res) => {
            res.send('get data')
        })
        app.get('/createTask', async (req, res) => {
            const result = await taskCollection.find().toArray();
            res.send(result)
        })
        app.post('/createTask', async (req, res) => {
            const data = req.body;
            console.log(data);
            const result = await taskCollection.insertOne(data);
            res.send(result)
        })



        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => { console.log('port is:', port) });
