var mongoose = require('mongoose');
var Schema = mongoose.schema;

var MediaSchema = new mongoose.Schema({
    _id: Object,
    filename: String,
    filetype: String,
    value: String,
});

module.exports = ({'MediaSchema':MediaSchema});