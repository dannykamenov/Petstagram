const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const photoController = require('./controllers/photoController');
const profileController = require('./controllers/profileController');

router.use(homeController);
router.use(authController);
router.use('/photo', photoController);
router.use(profileController);
router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;