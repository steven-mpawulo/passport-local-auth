const User = require('../../models/User');
const bcrypt = require('bcrypt');
const signup = async (req, res) => {
    const { email, password, userName } = req.body;
    if (!email && !password && !userName) {
        res.status(400).json({ "message": "please provide the required data for sign up" });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        "email": email,
        "password": hashedPassword,
        "userName": userName,
    });

    await user.save().then((newUser) => {
        console.log(newUser);
        if (newUser) {
            res.status(201).json({ "message": "user sign up successful", "user": newUser });
        } else {
            res.status(400).json({ "message": "failed to sign up user" });
        }
    }).catch((e) => {
        console.log(e);
        res.status(400).json({ "message": "something went wrong", "error": e });
    });
}

module.exports = signup;