var mongoose = require('mongoose');
var Schema = mongoose.schema;

var MediaSchema = new mongoose.Schema({
    _id: Object,
    filename: String,
    filetype: String,
    value: String,
    date: Date,
    user:{type:mongoose.Schema.Types.ObjectId, ref:'ngnode_users'}
});


module.exports = ({'MediaSchema':MediaSchema});