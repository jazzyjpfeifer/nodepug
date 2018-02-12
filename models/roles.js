var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var roleSchema = new Schema({
    description: String
});

module.exports = mongoose.model("Role", roleSchema);