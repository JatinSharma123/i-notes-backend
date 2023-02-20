const mongoose=require('mongoose');
const url = 'mongodb+srv://js223675:<password>@cluster0.0erfj6d.mongodb.net/?retryWrites=true&w=majority';

const connectToDb=async()=>{

  const connect= await  mongoose.connect(url,()=>{
        console.log("Connected To Db Sucesfully!!!!");
    })


}


module.exports=connectToDb;