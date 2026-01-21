const users = require('../models/userModel')
const bcrypt = require('bcrypt')

//register user

exports.registerController = async (req,res)=>{
    console.log("inside registerController");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User already exist!!! Please Login")
        }else{
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser = await users.create({
                username,email,password:encryptedPassword
            })
            res.status(200).json(newUser)
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}
