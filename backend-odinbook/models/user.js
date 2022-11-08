const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {type: String},
        password: {type: String},
        pendingFriendsRequests: {type: String},
        friends: {type: String},
        facebookId: {type: String}
    }
)


module.exports = mongoose.model('user', UserSchema);