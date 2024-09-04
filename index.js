const express=require('express')
const cors=require('cors')
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

app.get('/',(req,res)=>{
    res.send('RealEstate  server is running');
})

app.get('/users',(req,res)=>{
    res.send(users);
})
app.post('/users',(req,res)=>{
    const newUser=req.body;
    newUser.id=users.length+1;
    users.push(newUser);
    res.send(newUser);
 



})



app.listen(port,()=>{
    console.log(`RealEstate server is running on port ${port}`)
})


