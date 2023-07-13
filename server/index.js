require('dotenv').config()
const express=require('express');
const app=express();
const mongoose=require('mongoose')
const cronJob = require("./schedulers/removeUsers")
const cors=require('cors')
app.use(cors())

//middleWear
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//Routers
const userRouter=require('./routes/user')
app.use("/users",userRouter);



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server started on ",process.env.PORT)
        cronJob.start();
    })
})
.catch((error)=>{
    console.log(error);
})

