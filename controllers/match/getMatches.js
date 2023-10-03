const Match = require("../../models/Match")

const getMatches = (req, res) => {
    Match.find({}).then((matches) => {
        console.log(matches);
        res.status(200).json({"message": "matches fetched", "matches": matches});
    }).catch((e) => {
        console.log(e);
        res.status(400).json({"message": "something went wrong", "error": e});
    });
}

module.exports = getMatches;
