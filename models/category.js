var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var categorySchema = new Schema({
    description: String,
    sequence: Number
});

module.exports = mongoose.model("Category", categorySchema);