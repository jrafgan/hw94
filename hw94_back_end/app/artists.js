const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Artist = require('../models/Artist');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const tryAuth = require('../middleware/tryAuth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', tryAuth, async (req, res) => {

    try {
        let criteria = {published: true};

        if (req.user) {
            criteria = {
                $or: [
                    {published: true},
                    {user: req.user._id}
                ]
            }
        }
        if (req.query.id) {
            Artist.findOne({_id: req.query.id}).then(artist => {
                if (artist) res.send(artist);
                else res.sendStatus(404);
            }).catch(() => res.sendStatus(500));
        } else {
            Artist.find()
                .then(artists => res.send(artists))
                .catch(() => res.sendStatus(500));
        }
    } catch (e) {
        return res.status(500).send(e);
    }
});


router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const artistData = req.body;

    if (req.file) {
        artistData.image = req.file.filename;
    }
    artistData.user = req.user;
    const artist = new Artist(artistData);

    await artist.save();
        return res.send({message: 'Ok'});
    } catch (e) {
        return res.status(500).send(e);
    }

});

router.post('/:id/toggle_published', [auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.sendStatus(404);
        }
        artist.published = !artist.published;
        await artist.save();
        const artists = await Artist.find();
        return res.send(artists);
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Artist.findById(req.query.id);

        if (artist) {
            await artist.remove();
            const artists = await Artist.find();
            return res.status(200).send(artists);
        } else {
            return res.status(400).send('Not found !');
        }

    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;