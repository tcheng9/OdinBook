const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

const UserSchema = new Schema(
    {
        username: {type: String},
        password: {type: String},
        pendingFriendRequests: [{type: Schema.Types.ObjectId, ref: 'pendingFriend'}], //array of reference to userId's
        friends: [{type: Schema.Types.ObjectId, ref: 'acceptedFriends'}], //Array of friends added
        facebookId: {type: String}
    }
)

// authorId: {type: Schema.Types.ObjectId, ref: 'user'},

var User = UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('user', UserSchema);