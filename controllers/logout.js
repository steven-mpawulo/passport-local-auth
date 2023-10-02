const login = (req, res, next) => {
    req.logOut(function (err) {
        if (err) {next(err);}
        res.json({"message": "user logged out", "user": req.user});
    });
}

module.exports = login;