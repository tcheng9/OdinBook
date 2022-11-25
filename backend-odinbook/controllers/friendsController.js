var User = require('../models/user');
//Need to split between pending friend requests AND actualy 
//accepted friends

exports.get_friends = async(req, res, next) => {
    res.send('placeholder GET');
}

exports.post_friends = async(req, res, next) => {
    res.send('placeholder POST');
}

