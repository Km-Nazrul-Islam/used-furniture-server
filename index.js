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

        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const categoriesItem = await categoriesCollection.findOne(query);
            res.send(categoriesItem);
        })

        app.get('/category', async (req, res) => {
            const query = {};
            const categoryItem = await categoryCollection.find(query).toArray();
            res.send(categoryItem);
        })

        

        app.post('/allUser', async (req, res) => {
            const user = req.body;
            const result = await allUserCollection.insertOne(user);
            res.send(result);
        })

    }

    finally {

    }
}

run().catch(console.log);



app.get('/', async (req, res) => {
    res.send('Used Furniture Server is Running')
})


/*
// ---------------Locall API Start--------------------
const categories = require('./data/categories.json');
const products = require('./data/category.json')

app.get('/product-categories', (req, res) => {
    res.send(categories);
});

app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    const category_products = products.filter(p => p.category_id === id);
    res.send(category_products);
})

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const targetProducts = products.find(p => p._id === id);
    res.send(targetProducts);
})

//-----------------Local API End--------------------------------
*/

app.listen(port, () => {
    console.log(`Used Furniture Running on port ${port}`)
})









