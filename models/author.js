var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: String,
    bio: String
});

module.exports = mongoose.model("Author", authorSchema);