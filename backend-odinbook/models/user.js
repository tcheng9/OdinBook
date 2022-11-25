const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

const UserSchema = new Schema(
    {
        username: {type: String},
        password: {type: String},
        pendingFriendsRequests: [{type: String}], //array of reference to userId's
        friends: [{type: String}], //Array of friends added
        facebookId: {type: String}
    }
)

// authorId: {type: Schema.Types.ObjectId, ref: 'user'},

var User = UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('user', UserSchema);