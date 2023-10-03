const Match = require("../../models/Match");
const User = require("../../models/User");

const deleteMatch = async (req, res) => {
    const matchId = req.params.matchId;
    console.log(matchId);
    await Match.findByIdAndDelete({ '_id': matchId }).then(async (deletedMatch) => {
        console.log(deletedMatch);
        if (deletedMatch) {
            await User.findByIdAndUpdate({ '_id': deletedMatch.between[0] }, { $pull: { "matchedTo": deletedMatch.between[1] } }, { new: true }).then(async (firstUser) => {
                console.log(firstUser);
                await User.findByIdAndUpdate({ '_id': deletedMatch.between[1] }, { $pull: { "matchedTo": deletedMatch.between[0] } }, { new: true }).then((secondUser) => {
                    console.log(secondUser);
                    res.status(200).json({ "message": "match successfully deleted", "match": deletedMatch, "first user": firstUser, "second user": secondUser })
                }).catch((e) => {
                    console.log(e);
                    res.status(400).json({ "message": "something went wrong" });
                });
            }).catch((e) => {
                console.log(e);
                res.status(400).json({ "message": "something went wrong" });
            });
        } else {
            res.status(400).json({ "message": "match already deleted" });
        }
    }).catch((e) => {
        console.log(e);
        res.status(400).json({ "message": "something went wrong", "error": e });
    });

}

module.exports = deleteMatch;