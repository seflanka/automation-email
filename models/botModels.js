const mongoose = require('../db/conn');
const { Schema } = mongoose;

const botModels =  mongoose.model(
    'botmodes',
    new Schema({
        stringEmail: {
            type: String,
        },
        data: {
            type: String,
        },
        quemEnviou: {
            type: String,
        },
    }) 
)

module.exports = botModels
