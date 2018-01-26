const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const content_typesSchema = new Schema({
      description: String,
      sequence: Number
});


module.exports = mongoose.model("Content_Types", content_typesSchema);

