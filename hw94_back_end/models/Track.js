const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  youtube: {
    type: String
  },
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;
