const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const post_detailSchema = new Schema({
    content_type: { type: Schema.Types.ObjectId, ref: 'Content_Type'},
    post: { type: Schema.Types.ObjectId, ref: 'Post'},
    post_title: String,
    content: String,
    file_name: String,
    sequence: Number
});

post_detailSchema.pre('remove', function (next) {
    this.model('Post').remove(({post_details: this._id}))

});

module.exports = mongoose.model("Post_Detail", post_detailSchema);