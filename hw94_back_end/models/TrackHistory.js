const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
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

HistorySchema.methods.date = function() {
    this.datetime = new Date().toLocaleString();
};

const History = mongoose.model('History', HistorySchema);

module.exports = History;