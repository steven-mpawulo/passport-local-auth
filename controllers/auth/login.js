const login = (req, res) => {
    if (req.user) {
        res.json({ "message": "user successfully logged in", "user": req.user });
    } else {
        res.json({ "message": "failed to login user" });
    }
}

module.exports = login;