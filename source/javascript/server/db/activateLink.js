import mongoose from "mongoose";
import {questionSchema} from "./question.js";
var Schema = mongoose.Schema;

var activateLinkSchema = new Schema({
    userId: String,
    linkId: String
});

var activateLinkModel = mongoose.model('ActivateLink', activateLinkSchema);

module.exports = {activateLinkModel,activateLinkSchema};