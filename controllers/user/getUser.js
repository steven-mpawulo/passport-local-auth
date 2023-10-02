const User = require('../../models/User');
const getUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);

    if (userId !== undefined) {
        await User.findById({'_id': userId}).then((user) => {
            console.log(user);
            if (user) {
                res.status(200).json({"message": "user found", "user": user});
            } else {
                res.status(400).json({"message": "user not found"});
            }
        }).catch((e) => {
            console.log(e);
            res.status(400).json({"message": "something went wrong", "error": e});
        });
    } else {
        res.status(400).json({"message": "please provide valid user id"});
    }
}

module.exports = getUser;
