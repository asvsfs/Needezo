import mongoose from "mongoose";
import {questionSchema} from "./question.js";
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: String
});

var categoryModel = mongoose.model('Category', categorySchema);

module.exports = {categoryModel,categorySchema};
