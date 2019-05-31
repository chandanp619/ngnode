var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MenusitemsModel =  require('./menuitems');

var MenusSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    items: [{type:Object, ref: MenusitemsModel}]
});

var MenuModel = mongoose.model('ngnode_menus',MenusSchema,'ngnode_menus');

module.exports = MenuModel;
