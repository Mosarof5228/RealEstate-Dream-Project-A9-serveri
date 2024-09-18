const express=require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express()
app.use(cors())
app.use(express.json())
const port=process.env.PORT || 5000;

const users=[
    {
        id:1,name:'Md.Mosarof Hossen',gmail:'mosarofhossen@gmail.com',
       
    },
    {
         id:2,name:'Md.Rakib',gmail:'rakibkahna@gmail.com',
      
    },
    {
          id:3,name:'Poros Ali',gmail:'poroshkhan@gmail.com'
    }
]

// XSXqGIeb5KAGxRFf
// iSgaSi9GIfManlj8 
// mosarofhossen5228



const uri = "mongodb+srv://mosarofhossen5228:iSgaSi9GIfManlj8@cluster0.xjn84.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    await client.connect();
    const userCollection=client.db('usersDB').collection('users');

app.get('/users',async(req,res)=>{
  const cursor=userCollection.find()
  const result=await cursor.toArray();
  res.send(result);
  
})

app.get('/users/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id:new ObjectId(id)};
  const user=await userCollection.findOne(query);
  res.send(user)
})





app.post('/users',async(req,res)=>{
  const newUser=req.body;
  const result=await userCollection.insertOne(newUser);
  res.send(result);

})

app.put('/users/:id',async(req,res)=>{
  const id=req.params.id;
  const user=req.body;
  const filter={_id:new ObjectId(id)}
  const options={upsert:true}
  const updateUser={
    $set:{
      name:user.name,
      email:user.email
    }
  }
  const result=await userCollection.updateOne(filter,updateUser,options);
  res.send(result);



})

app.delete('/users/:id',async(req,res)=>{
  const id=req.params.id;
  console.log(id);
  const query={_id: new ObjectId(id)}
  const result=await userCollection.deleteOne(query);
  res.send(result);
})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('RealEstate  server is running');
})







app.listen(port,()=>{
    console.log(`RealEstate server is running on port ${port}`)
})


