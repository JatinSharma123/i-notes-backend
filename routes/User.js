const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewares/auth.js");
const JWT_SECRET = "JATINSHARMA";
//Route 1: Signup a user using post method : createUser
router.use("/createUser", async (req, resp) => {
  try {
    let success = false;
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      success = false;
      return resp
        .status(400)
        .send({ success, message: "Email,password,Name can't be empty" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return resp
        .status(404)
        .json({ success, message: "User already exist!!!" });
    }
    //using bcrypt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    //assing value to request user
    let reqUser = { name, email, password: hashpassword };
    //making the user from user  modal 
    reqUser = new User(reqUser);
    //saving the user in database

    const savedUser = await reqUser.save();
    //generating jwt token
    const data = {
      user: {
        id: savedUser._id
      }
    }
    const token = jwt.sign(data, JWT_SECRET);
    //sending jwt token with response
    return resp.status(200).json({ "success": "true", token });
  }
  catch (error) {
    console.log("Error while saving new user" + error);
    resp.status(500).json({
      success: "false",
      message: "User not saved!!Error in server",
      error: error.message,
    });
  }


});


//Route 2 : LOGIN THE USER WITH POST METHOD and request: loginUser

router.post("/loginUser", async (req, resp) => {
  try {
    const success = false;
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(400).json({ success, "message": "email and password can't be blank" });
    }

    console.log("Email"+email);

    let user = await User.findOne({ email });
    if (!user) {
      return resp
        .status(404)
        .json({ success, message: "User  not  present!!!" });
    }

    const match =await bcrypt.compare(password, user.password);
    //password not match
    if (!match) {
      return resp
        .status(404)
        .json({ success, message: "User  not  present!!!" });

    }


    //generating jwt token
    const data = {
      user: {
        id: user._id
      }
    }
    const token = jwt.sign(data, JWT_SECRET);
    //sending jwt token with response
    return resp.status(200).json({ "success": "true", token });

  } catch (error) {
    console.log("Error while login  user" + error);
    resp.status(500).json({
      success: "false",
      message: "User not found!!Error in server",
      error: error.message,
    });

  }

})


//Route 3:: Get the user who login using token by token and middleware

router.post("/getUser",fetchUser,async(req,resp)=>{

  try {
   let userId=req.user.id;
 const user=await User.findById(userId).select("-password");
     resp.send(user);
  } catch (error) {
    console.error(error.message);
     resp.status(500).send("Internal server error")
  }


});


module.exports = router;
