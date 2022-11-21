const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
    {
        userId: {type: String},
        age: {type: Number},
        gender: {type: String},
        worstTravelExp: {type: String}, //What was your worst travel experience?
        designTVShow: {type: String}, //If you could design a reality TV show, what would it be like?
        superpower: {type: String},
        profileImage: {type: String}

    }
)

module.exports = mongoose.model('profile', ProfileSchema);