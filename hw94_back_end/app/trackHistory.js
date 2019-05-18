const express = require('express');
const History = require('../models/TrackHistory');
const router = express.Router();
const auth = require('../middleware/auth');
const Track = require('../models/Track');
const Album = require('../models/Album');
const Artist = require('../models/Artist');

router.get('/', auth, async (req, res) => {
    await History.find().sort({datetime: -1})
        .then(history => res.send(history))
        .catch(() => res.sendStatus(500));

});

router.post('/', auth, async (req, res) => {
    try {
        const track = await Track.find({_id: req.body.trackId});
        const album = await Album.find({_id: track[0].album});
        const artist = await Artist.find({_id: album[0].artist});
        const history = new History(req.body);
        history.date();
        history.artistName = artist[0].name;
        history.trackTitle = track[0].title;

        await history.save();
        res.status(200).send(history);

    } catch (error) {
        return res.status(400).send(error)
    }

});

module.exports = router;