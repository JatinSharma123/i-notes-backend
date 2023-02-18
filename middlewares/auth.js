const jwt = require("jsonwebtoken");
const JWT_SECRET = "JATINSHARMA";

const fetchUser=(req,resp,next)=>{
    //Get the user from the jwt token and id to the object
    const token=req.header('auth-token');
    if(!token){

      return resp.status(401).send({error:"Please authenticate using a valid token"})
    
    }
   try {
    const data=jwt.verify(token,JWT_SECRET);

    req.user=data.user;
    next();
   } catch (error) {

    return resp.status(401).send({error:"Please authenticate the user"});
    
    
   }
    
        

}

module.exports=fetchUser;