const express=require('express');
const PORT=5000;
const db=require('./db.js');
const app=express();
const cors=require('cors')
const UserRouter=require('./routes/User.js');
const NotesRouter=require('./routes/Notes.js');
//connect to db 
db();
//using json
app.use(express.json());
app.use(cors());
//user routes
app.use('/api/user',UserRouter);
//notes routes
app.use("/api/notes",NotesRouter);
















app.listen(PORT,()=>{
    console.log('Server is listening on port 5000');
})