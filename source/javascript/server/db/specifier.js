import mongoose from "mongoose";

var Schema = mongoose.Schema;

var specifierSchema = new Schema({
	type: { type: String, required: true, enum: ['polygon','selection'], default: 'selection'},
	points:[{x:Number,y:Number}],
	selection:{start:Number,end:Number}
});

var specifierModel = mongoose.model('Specifier', specifierSchema);

module.exports = {specifierModel,specifierSchema};