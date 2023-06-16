const router = require('express').Router();
const User = require('../models/User');
const Photo = require('../models/Photo');

router.get('/profile', async(req, res) => {

    const photoList = await Photo.find({owner: req.user._id}).lean();
    const user = await User.findById(req.user._id).lean();
    res.render('profile', {photoList, user});
});

module.exports = router;