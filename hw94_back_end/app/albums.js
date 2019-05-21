const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Album = require('../models/Album');
const Track = require('../models/Track');
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
        let criteria = {artist: req.query.artist};

        if (!req.user) {
            criteria = {
                $and: [
                    {published: true},
                    {artist: req.query.artist}
                ]
            }
        }
        if (req.query.artist) {

            let albums = await Album.find(criteria).populate('artist').sort({year: 1});

            if (req.user && req.user.role === 'admin') {
                return res.send(albums);
            }
            const result = [];
            albums.map(album => {
                if (album.published === false && album.user.equals(req.user._id) || album.published === true) result.push(album);
            });

            if (result) return res.send(result);
            else return res.sendStatus(404);
        } else {
            const albums = await Album.find().populate('artist');
            if (albums) return res.send(albums);
            else return res.sendStatus(500);
        }
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.get('/:id', (req, res) => {

    const criteria = {_id: req.params.id};
    Album.findOne(criteria).populate('artist').then(album => {
        if (album) res.send(album);
        else res.sendStatus(404);
    }).catch(() => res.sendStatus(500));
});


router.post('/', [auth, upload.single('image')], (req, res) => {
    const albumData = req.body;

    if (req.file) {
        albumData.image = req.file.filename;
    }
    albumData.user = req.user;
    const album = new Album(albumData);
    album.save()
        .then(() => res.send({message: 'Ok'}))
        .catch(error => res.status(400).send(error));
});

router.post('/:id/toggle_published', [auth, permit('admin')], async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (!album) {
        return res.sendStatus(404);
    }
    album.published = !album.published;
    await album.save();
    const albums = await Album.find();
    return res.send(albums);
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
    try {
        const id = req.query.id;
        const album = await Album.findById(id);

        if (album) {
            await album.remove();
            const albums = await Album.find();
            return res.status(200).send(albums);
        } else {
            return res.status(400).send('Not found !');
        }

    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;