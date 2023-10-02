const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    'between': [{
        type: mongoose.Types.ObjectId,
    }]
});

module.exports = mongoose.model('passportLocalAuthMatch', matchSchema);