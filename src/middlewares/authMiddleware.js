const jwt = require('../utils/jwt');

const SECRET = 'somesecret'

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if(token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            req.isAuthenticated = true;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
        } catch (error) {
            res.clearCookie('auth');
            return res.redirect('/404');
        }
    }

    next();
};

exports.isAuth = (req, res, next) => {
    if(!req.isAuth){
        return res.redirect('/login');
    }

    next();
};