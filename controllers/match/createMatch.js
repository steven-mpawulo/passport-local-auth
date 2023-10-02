const createMatch = async (req, res) => {
    const firstUserId = req.params.firstUserId;
    console.log(firstUserId);
    const secondUserId = req.params.secondUserId;
    console.log(secondUserId);

    await Match.findOne({'between': {$all: [firstUserId, secondUserId]}}).then((match) => {
        if (match) {
            res.status(400).json({"message": "match already exists"});
        } else {
            const match = new Match({
                "between": [firstUserId, secondUserId]
            });
            match.save().then((newMatch) => {
                console.log(newMatch);
                if (newMatch) {
                    res.status(200).json({"message": "match created"});
                } else {
                    res.status(400).json({"message": "failed to save match"});
                }
            }).catch((e) => {
                console.log(e);
                res.status(400).json({"message": "something went wrong", "error": e});
            });
        }
    }).catch((e) => {
        console.log(e);
        res.status(400).json({"message": "something went wrong"});
    });
}

module.exports = createMatch;