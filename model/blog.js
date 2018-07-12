var mongoose = require('mongoose');
var Schema = mongoose.schema;

var BlogSchema = new mongoose.Schema({
    title: String,
    content:String,
    date:Date
});

module.exports = ({'BlogSchema':BlogSchema});