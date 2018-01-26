const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      moment = require('moment');

const postSchema = new Schema({
      title: String,
      summary: String,
      author: { type: Schema.Types.ObjectId, ref: 'Author'},
      category: { type: Schema.Types.ObjectId, ref: 'Category'},
      date_posted: { type: Date, default: Date.now }
});

postSchema
    .virtual('date_posted_formatted')
    .get(function () {
        return moment(this.date_posted).format('MMMM Do, YYYY');
    });



module.exports = mongoose.model("Post", postSchema);
