const Match = require("../../models/Match");

const getMatch = async (req, res) => {
    const matchId = req.params.matchId;
    console.log(matchId);

    if (matchId !== undefined) {
        await Match.findById({'_id': matchId}).then((match) => {
            console.log(match);
            if (match) {
                res.status(200).json({"message": "match retreived", "match": match});
            } else {
                res.status(400).json({"message": "failed to retreive match"})
            }
        }).catch((e) => {
            console.log(e);
            res.status(400).json({"message": "something went wrong", "error": e});
        });
    } else {
        res.status(400).json({"message": "please provide valid match Id"});
    }

}

module.exports = getMatch;