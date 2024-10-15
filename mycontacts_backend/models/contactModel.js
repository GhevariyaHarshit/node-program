const mongoose = require("mongoose")

const connectSchema = mongoose.Schema(
	{
		user_id:{
			type:mongoose.Schema.Types.ObjectId,
			require:true,
			ref:"User",
		},
		name:{
			type:String,
			required:[true,"please add the contact name"],
		},
		email:{
			type:String,
			required:[true,"please add the contact email address"],
		},
		phone:{
			type:String,
			required:[true,"please add the contact phone number"],
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Contact",connectSchema)