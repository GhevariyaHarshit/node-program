const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")

const getusers = async(req,res)=>{
    const users = await User.find();
    res.status(200).json(users)
}

const register = async(req,res) =>{
	try{
		const {username,email,password,role} = req.body
		const hashedPassword = await bcrypt.hash(password,10)
		const newUser = new User({username,email,password:hashedPassword,role})
		await newUser.save();
		res.status(201).json({message:`User register with email ${email}`})
	}catch(err){
		res.status(500).json({message:"Something went wrong",err:err})
	}
}

const updateUser = async(req,res)=>{
	const user = await User.findByIdAndUpdate(
		req.params.id,
		req.body,
		{new:true}
	)
	res.json({message:"successfully record update",user})
}

const user = async(req,res)=>{
	const user = await User.findById(req.params.id)
	res.status(200).json(user)
}

const deleteUser = async(req,res)=>{
	const user = await User.findById(req.params.id)
	if(!user){
		res.status(404).json({message:"user not found"})
	}
	await User.deleteOne(user)
	res.status(200).json({message:"successfully record delete",user})
}

const login = async(req,res) =>{
	const {email,password} = req.body
	if(!email||!password){
		res
		.status(400)
		.json("All fields are mandatory!")
	}
	const user = await User.findOne({email})
	if(!user){
		return res.status(404).json({message:`User with email ${email} not found`})
	}
	const isMatch = await bcrypt.compare(password,user.password)
	if(!isMatch){
		return res.status(400).json({message:"Invalid credentails"})
	}
	const token = jwt.sign(
		{id: user._id,role:user.role},
		process.env.JWT_SECRET,
		{expiresIn:"2h"}
	)
	res.status(200).json({token})
	console.log("token token token",user._id)
}

const requestPasswordReset  = async(req,res)=>{
	try {
	const { email } = req.body;

    const user = await User.findOne({email});
    
    const otp = crypto.randomInt(100000,999999);
    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; //5 min expiry
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASS
		}
	});
	
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'OTP to Reset password',
        text: `Your OTP for password reset is: ${user.resetOtp}. 
        Validity 5 Mins`
    };
	console.log("otp",otp)
	await transporter.sendMail(mailOptions);
	return res.status(200).json({message:'OTP email sent to:', email})
    } catch (error) {
        return res.status(500).json({message:"Somthing went wrong",error})
    }
}

const resetPassword = async(req,res)=>{
	const body = req.body;
    const password = body.password;
    const confirmPassword = body.confirmPassword;
	console.log("{}{}{}{}{}",req.body)
}

const forgotPassword = async(req,res)=>{
	const {email, password, confirmPassword} = req.body;
	if(!email || !password || !confirmPassword){
		return res.status(400).json({message:"All fields are required"})
	}
	if(password !== confirmPassword){
		return res.status(400).json({message:"Password do not match"})
	}
	try{
		const user = await User.findOne({ email: user._id });
		// const userid = await User.find({id: user._id})
		console.log("()()()()()()()",user)
		// console.log("metch email",req.body.email)
		// console.log("========================>",User.req.body.email)
		if(!user){
			return res.status(404).json({message:"User not found"})
		}
		const hashedPassword = await bcrypt.hash(password,10)

		user.password = hashedPassword;
		await user.save();
		res.json({message:"password reset successfully"})
	}catch(error){
		console.log(error)
		res.status(500).json({message:"Server error"})
	}
}

module.exports = {register,login,resetPassword,requestPasswordReset,getusers,updateUser,deleteUser,user,forgotPassword}