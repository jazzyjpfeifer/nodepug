const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      moment = require('moment');

const postSchema = new Schema({
      title: String,
      summary: String,
      author: { type: Schema.Types.ObjectId, ref: 'Author'},
      category: { type: Schema.Types.ObjectId, ref: 'Category'},
      post_details: [{type: Schema.Types.ObjectId, ref: "Post_Detail"}],
      date_posted: { type: Date, default: Date.now }
});

postSchema
    .virtual('date_posted_formatted')
    .get(function () {
        return moment(this.date_posted).format('MMMM Do, YYYY');
    });

postSchema.index({title: 'text', summary: 'text'});



module.exports = mongoose.model("Post", postSchema);
