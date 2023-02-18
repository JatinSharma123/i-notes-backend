const mongoose=require('mongoose')
const {Schema}=mongoose;

const NoteSchema=mongoose.Schema({
            user:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"user"
            },
      title:{

        type:String,
        require:true,
       min:3
      },
      description:{
        type:String,
        require:true,
        min:3
      },
      tag:{
        type:String
      
      },
      date:{
        type:Date,
        default:Date.now
      }


})

const Notes=mongoose.model('note',NoteSchema);

module.exports=Notes;