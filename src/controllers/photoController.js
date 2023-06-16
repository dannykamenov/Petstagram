const mongoose = require('mongoose');
const router = require('express').Router();
const Photo = require('../models/Photo');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {

    const {name, age, desc, location, imageUrl} = req.body;

    try {
        await Photo.create({name, age, desc, location, imageUrl, owner: req.user._id})
    } catch (err) {
        return res.render('create', {error: err});
    }

    res.redirect('/');

});

router.get('/catalog', async (req, res) => {
    
    try {
        const photos = await Photo.find().populate('owner').lean();
        res.render('catalog', {photos});
    } catch (err) {
        return res.render('catalog', {error: err});
    }
    
});

router.get('/:id/details', async (req, res) => {
    const id = req.params.id;

    try {
        let isOwner = false;
        const photo = await Photo.findById(id).populate('owner').lean();
        if(!req.user) {
            return res.render('details', {photo, isOwner});
        }
        isOwner = photo.owner._id.toString() === req.user._id.toString();
        res.render('details', {photo, isOwner});
    } catch (err) {
        console.log(err);
        return res.render('details', {error: err});
    }
});

router.post('/:id/details', async (req, res) => {
    const id = req.params.id;
    const {comment} = req.body;
    const userId = req.user._id;
    const photo = await Photo.findById(id);

    if(!photo) {
        return res.render('details', {error: 'No such photo in database!'});

    }

    if(!comment) {
        return res.render('details', {error: 'Comment cannot be empty!'});
    }

    photo.commentList.push({userId, comment});
    await photo.save();
    res.redirect(`/photo/${id}/details`);

});



module.exports = router;