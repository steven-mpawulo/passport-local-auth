const User = require('../../models/User');
const getUsers = async (req, res) => {
    await User.find({}).then((users) => {
        console.log(users);
        if (users) {
            res.status(200).json({"message": "users fetched", "users": users});
        } else {
            res.status(400).json({"message": "no users found"});
        }
    }).catch((e) => {
        console.log(e);
        res.status(400).json({"message": "something went wrong", "error": e});
    });
}

module.exports = getUsers;