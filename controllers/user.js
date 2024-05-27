const { v4: uuidv4 } = require('uuid');
const User =require('../models/user')
const {setUser}=require('../service/auth')

async function handleUserSignUp(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/")
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.render("login", { error: "Invalid username or password" });
      }
      const sessionId = uuidv4();
      setUser(sessionId, user);
      res.cookie("uid", sessionId);
      // Redirect the user to the home page after successful login
      return res.redirect("/");
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

module.exports={
    handleUserSignUp,
    handleUserLogin
}