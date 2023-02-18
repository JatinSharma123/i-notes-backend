const mongoose=require('mongoose')
const {Schema}=mongoose;

const UserSchema=mongoose.Schema({

      name:{

        type:String,
        require:true
      },
      email:{
        type:String,
        require:true,
        unique:true
      },
      password:{
        type:String,
        require:true,
        min:5
      },
      timestamp:{
        type:Date,
        default:Date.now
      }


})

const User=mongoose.model('user',UserSchema);

module.exports=User;