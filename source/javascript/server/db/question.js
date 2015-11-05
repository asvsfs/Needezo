import mongoose from "mongoose";
var Schema = mongoose.Schema;

var questionSchema = new Schema({
	text:String,
	replies:[{body:String,date:Date}],
	date:Date
});

var questionModel = mongoose.model('Question', questionSchema);

module.exports = {questionModel,questionSchema};