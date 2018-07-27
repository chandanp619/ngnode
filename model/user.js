var mongoose = require('mongoose');
var Schema = mongoose.schema;

var UserSchema = new mongoose.Schema({
    _id: Object,
    username: String,
    password: String,
    usertype: String,
    email: String,
    meta:Array
});

module.exports = ({'UserSchema':UserSchema});