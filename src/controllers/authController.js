const router = require('express').Router();
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token, {httpOnly: true});
    } catch (error) {
        return res.render('auth/login', {error});
    }

    res.redirect('/');

});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const {username, email, password, rePassword} = req.body;
    try {
        await authService.register(username, email, password, rePassword);
        const token = await authService.login(email, password);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        return res.render('auth/register', {error});
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;