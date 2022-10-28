const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors())
app.use(express.json());

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@red-onion.yn1hoez.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try {
        await client.connect();
        const foodCollection = client.db('red-onion').collection('foods');
        const cartCollection = client.db('red-onion').collection('carts');
        // const reviewCollection = client.db('red-onion').collection('reviews');
        // const orderCollection = client.db('red-onion').collection('orders');
        const confirmOrderCollection = client.db('red-onion').collection('confirmOrders');

        // foods api
        app.get('/foods', async(req, res)=>{
            const query = {};
            const cursor  = foodCollection.find(query);
            const foods = await cursor.toArray();
            res.send(foods);
        })

         // catch single foods item
         app.get('/foods/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const food = await foodCollection.findOne(query);
            res.send(food);
        });

        // add to cart || POST API
        app.get('/carts', async(req, res)=>{
            const query = {};
            const cursor  = cartCollection.find(query);
            const foods = await cursor.toArray();
            res.send(foods);
        });

        // catch single item
        app.get('/carts/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const note = await cartCollection.findOne(query);
            res.send(note);
        })

        // post in carts
        app.post('/carts', async(req, res)=>{
            const newOrders = req.body;
            const result = await cartCollection.insertOne(newOrders);
            res.send(result);
        });


        // review api
        // app.get('/reviews', async(req, res)=>{
        //     const query = {};
        //     const cursor  = reviewCollection.find(query);
        //     const reviews = await cursor.toArray();
        //     res.send(reviews);
        // })

        

        app.get('/confirmOrders', async(req, res)=>{
            const query = {};
            const cursor  = confirmOrderCollection.find(query);
            const foods = await cursor.toArray();
            res.send(foods);
        });
        // catch single item
         app.get('/confirmOrders/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const note = await confirmOrderCollection.findOne(query);
            res.send(note);
        })


        // post in confirm=order
        app.post('/confirmOrders', async(req, res)=>{
            const newOrders = req.body;
            const result = await confirmOrderCollection.insertOne(newOrders);
            res.send(result);
        });


}

    finally {
                }
            }
            run().catch(console.dir);

// root
app.get('/', (req, res)=>{
    res.send('red-onion server is running')
});

// root listen
app.listen(port, ()=>{
    console.log('red-onion Server is running on port', port);
})