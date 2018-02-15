var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var authorSchema = new Schema({
    first_name: String,
    last_name: String,
    bio: String
});

module.exports = mongoose.model("Author", authorSchema);