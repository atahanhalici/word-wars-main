const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kelimeSchema = new Schema({

    icerik: {
        type: String,
        trim: true,
    },
    sorusu: {
        type: String,
        trim: true
    },



}, { collection: 'kelimeler'});

const Kelime = mongoose.model('kelimeler', kelimeSchema);

module.exports = Kelime;