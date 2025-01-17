// const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

//all contacts show
const getusers = async(req,res)=>{
    const users = await User.find();
    res.status(200).json(users)
}
//all contacts show by id
const getuser = async(req,res)=>{
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
}
//create contacts
const createuser = async(req,res)=>{
    // console.log("The request body is :",req.body)
    const {name,email,phone} = req.body;
    if(!name||!email||!phone){
        res.status(400).json({message:"All fields are mandatory !"})
    }
    const user = await User.create({
        name,
        email,
        phone,
    })
    res.status(201).json(user)
}
//update contacts
const updateuser = async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json({message:"Contact not found"});
    }
    const updateuser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.json(updateuser)
}
//delete contacts
const deleteuser = async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json({message:"Contact not found"});
    }
    await User.deleteOne(user);
    res.status(200).json(user)
}
module.exports = {getuser,createuser,updateuser,deleteuser,getusers}