const express = require('express')
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin: [
    // 'http://localhost:5173', 'http://localhost:5174',
    'https://pet-shop-36df6.web.app',
    
  ],
  credentials: true
}));
app.use(express.json())

// petShopDB
// NZxaJp1YIXaUbnty


// console.log(process.env.DB_NAME);
// console.log(process.env.DB_PASS);

// const uri = "mongodb+srv://<username>:<password>@cluster0.i3hf6sp.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.i3hf6sp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbConnect = async () => {
  try {
    client.connect()
    console.log('DB Connected Successfully✅')
  } catch (error) {
    console.log(error.name, error.message)
  }
}
dbConnect();

const petCollection = client.db('petDB').collection('pets');
// const borrowBooksCollection = client.db('bookLibrary').collection('borrowBooks');


app.get('/', (req, res) => {
  res.send('Server is running')
})



 app.get('/pets', async (req, res) => {
  try {
    const cursor = petCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  }
  catch (error) {
    console.log(error)
  }

})




app.post('/pets', async (req, res) => {
  try {
    const newPet = req.body;
    console.log(newPet);
    const result = await petCollection.insertOne(newPet);
    res.send(result);
  }
  catch (error) {
    console.log(error)
  }
})


app.get('/pets/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await petCollection.findOne(query);
    res.send(result)
  }
  catch (error) {
    console.log(error)
  }
})


app.listen(port, () => {
  console.log(`pet shop listening on port ${port}`)
})