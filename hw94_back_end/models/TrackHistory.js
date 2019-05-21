const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trackId: {
        type: String,
        required: true
    },
    trackTitle: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    datetime: { type : Date, default: Date.now }
});


const History = mongoose.model('History', HistorySchema);

module.exports = History;