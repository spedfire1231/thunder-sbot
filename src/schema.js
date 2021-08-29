const mongo = require('mongoose')

module.exports = mongo.model(
    'Money',
    new mongo.Schema({
        id: String,
        userId: String,
        User: String,
        VIP: Number,
        coins: Number,
        bankcoins: Number,
        job: String,
    })
)


/*module.exports = mongo.model(
    'Banks',
    new mongo.Schema({
        userId: String,
        bankcoins: Number,
    })
)*/