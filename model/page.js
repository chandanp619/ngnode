var mongoose = require('mongoose');
var Schema = mongoose.schema;


var PageSchema = new mongoose.Schema({
    _id: Object,
    title: String,
    slug: String,
    content: String,
    date: Date,
    meta:Array,
    user:{ type:mongoose.Schema.Types.ObjectId, ref: 'ngnode_users' }
});

module.exports = ({'PageSchema':PageSchema});