var mongoose = require("mongoose");
var config = require("../config");

var ManagerSchema = new mongoose.Schema({
    name: {type: String},
    dateOfBirth: {type: Date},
    email: {type: String},
    mobile: {type: String},
    designation: {type: String},
    managerId: {type: String},
});

var diffHistory = require("mongoose-diff-history/diffHistory");
ManagerSchema.plugin(diffHistory.plugin, {diffModelName: 'ManagerHistory'});

var Manager = mongoose.model("Manager", ManagerSchema);
module.exports = Manager;