const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const post_detailSchema = new Schema({
    content_type: { type: Schema.Types.ObjectId, ref: 'Content_Type'},
    post: { type: Schema.Types.ObjectId, ref: 'Post'},
    content: String,
    file_path: String,
    sequence: Number
});

module.exports = mongoose.model("Post_Detail", post_detailSchema);