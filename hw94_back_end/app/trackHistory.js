const express = require('express');
const History = require('../models/TrackHistory');
const router = express.Router();
const auth = require('../middleware/auth');
const Track = require('../models/Track');
const Album = require('../models/Album');
const Artist = require('../models/Artist');

router.get('/', auth, async (req, res) => {
    try {
        const history  = await History.find({user: req.user._id}).sort({datetime: -1});
        res.send(history);
    } catch (e) {
        res.sendStatus(500);
    }

});

router.post('/', auth, async (req, res) => {
    try {
        const track = await Track.findById(req.body.trackId);
        const album = await Album.findById(track.album);
        const artist = await Artist.findById(album.artist);

        const historyData = req.body;
        historyData.user = req.user._id;
        historyData.artistName = artist.name;
        historyData.trackTitle = track.title;
        const history = new History(historyData);

        await history.save();
        res.status(200).send(history);

    } catch (e) {
        console.log('this is error ', e);
        return res.status(400).send(e)
    }

});

module.exports = router;