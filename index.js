const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p3lfnp2.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run () {
    try {
        const categoriesCollection = client.db('imamUsedFurniture').collection('categories');
        const categoryCollection = client.db('imamUsedFurniture').collection('category');
        const allUserCollection = client.db('imamUsedFurniture').collection('allUser');


        app.get('/categories', async (req, res) => {
            const query = {};
            const categoriesItem = await categoriesCollection.find(query).toArray();
            res.send(categoriesItem);

        })

        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = { category_id: id };
            const categoriesItem = await categoryCollection.find(query).toArray();
            res.send(categoriesItem);
        })

        app.get('/users/:user/:email', async (req, res) => {
            const email = req.params.email;
            const query = {email:email}
            const user = await allUserCollection.findOne(query);
            res.send(user);  
        })

        app.post('/allUser', async (req, res) => {
            const user = req.body;
            const result = await allUserCollection.insertOne(user);
            res.send(result);
        })

        app.get('/allUser', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const allUser = await allUserCollection.find(query).toArray();
            res.send(allUser)
        })

    }

    finally {

    }
}

run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('Used Furniture Server is Running')
})

app.listen(port, () => {
    console.log(`Used Furniture Running on port ${port}`)
})









