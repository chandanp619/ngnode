var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MenusitemsSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    slug: String,
    parent:Schema.Types.ObjectId,
    target:String,
    component:String
});
var MenusitemsModel =  mongoose.model('ngnode_menuitems',MenusitemsSchema,'ngnode_menuitems');


module.exports = MenusitemsModel;
