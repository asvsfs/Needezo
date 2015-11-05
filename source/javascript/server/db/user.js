import mongoose from "mongoose";

var Schema = mongoose.Schema;

var userSchema = new Schema({
	date: Date, 
	facebookId: String,
	displayName:String,
	email:String,
	password:String,
	active:Boolean,
	items: [Schema.Types.ObjectId]
	//gotits:[Schema.Types.ObjectId]
});

var userModel = mongoose.model('User', userSchema);

module.exports = {userModel,userSchema};