const mongoose=require('mongoose');
const url='mongodb://0.0.0.0:27017/iNotes';

const connectToDb=async()=>{

  const connect= await  mongoose.connect(url,()=>{
        console.log("Connected To Db Sucesfully!!!!");
    })


}


module.exports=connectToDb;