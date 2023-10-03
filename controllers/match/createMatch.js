const Match = require('../../models/Match');
const User = require('../../models/User');
const createMatch = async (req, res) => {
    const firstUserId = req.params.firstUserId;
    console.log(firstUserId);
    const secondUserId = req.params.secondUserId;
    console.log(secondUserId);

    await Match.findOne({ 'between': { $all: [firstUserId, secondUserId] } }).then((match) => {
        if (match) {
            res.status(400).json({ "message": "match already exists" });
        } else {
            const match = new Match({
                "between": [firstUserId, secondUserId]
            });
            match.save().then(async (newMatch) => {
                console.log(newMatch);
                if (newMatch) {

                    await User.findByIdAndUpdate({ '_id': firstUserId }, { $addToSet: { "matchedTo": secondUserId } }, { new: true }).then(async (firstUser) => {
                        console.log(firstUser);
                        await User.findByIdAndUpdate({ '_id': secondUserId }, { $addToSet: { "matchedTo": firstUserId } }, { new: true }).then((secondUser) => {
                            console.log(secondUser);
                            res.status(200).json({ "message": "match created", "match": newMatch, "firstUser": firstUser, "secondUser": secondUser });
                        }).catch((e) => {
                            console.log(e);
                            res.status(400).json({ "message": "something went wrong", "error": e });
                        });
                    }).catch((e) => {
                        console.log(e);
                        res.status(400).json({ "message": "something went wrong", "error": e });
                    });
                } else {
                    res.status(400).json({ "message": "failed to save match" });
                }
            }).catch((e) => {
                console.log(e);
                res.status(400).json({ "message": "something went wrong", "error": e });
            });
        }
    }).catch((e) => {
        console.log(e);
        res.status(400).json({ "message": "something went wrong" });
    });
}

module.exports = createMatch;