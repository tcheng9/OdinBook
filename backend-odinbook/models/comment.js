const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        text: {type: String},
        // authorId: {type: Schema.Types.ObjectId, ref: 'user'},
        // postId: {type: Schema.Types.ObjectId, ref: 'post'}
        authorId: {type: String},
        postId: {type: String}
    }
)

// postId: {type: Schema.Types.ObjectId, ref: 'post'},
module.exports = mongoose.model('comment', CommentSchema);