const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')


const PendingFriendsSchema = new Schema(
    {
        "senderCheck" : {type: Boolean},  //Checks if the user is the sender or sendee -> used for friends management page
        "senderId": {type: String} //Id of the person who sent the request
    }
)

const UserSchema = new Schema(
    {
        username: {type: String},
        password: {type: String},
        pendingFriendRequests: [PendingFriendsSchema], //array of reference to userId's
        friends: [{type: String}], //Array of friends added
        facebookId: {type: String}
    }
)

// authorId: {type: Schema.Types.ObjectId, ref: 'user'},

var User = UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('user', UserSchema);