import mongoose from "mongoose";
import {questionSchema} from "./question.js";
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    title: String,
    description: String,
    lastEdit: Date,
		userId: String,
    displayName: String,
    date: Date,
    price:Number,
    location: { type: [Number], index: { type: '2dsphere', sparse: true}},
    state:String,
    country:String,
    imageUrl:[String],
		questions:[questionSchema] 
});

var itemModel = mongoose.model('Item', itemSchema);

module.exports = {itemModel,itemSchema};