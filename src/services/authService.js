const User = require('../models/User');
const jwt = require('../utils/jwt');

const SECRET = 'somesecret'

exports.register = async (username, email, password, repeatPassword) => {
    if(password !== repeatPassword){
        throw new Error('Passwords don\'t match!');
    }
    //const existingUser = await this.findByUsername(username);
    const existingUser = await User.findOne(
        {$or: [
            {username},
            {email}
        ]
    });

    if(existingUser){
        throw new Error('Username is taken!');
    }

    await User.create({username, email, password});
};

exports.login = async (email, password) => {

    const user = await User.findOne({email});
    
    if(!user){
        throw new Error('Wrong email or password!');
    }

    const isMatch = await user.validatePassword(password);

    if(!isMatch){
        throw new Error('Wrong email or password!');
    }

    const payload = {_id: user._id, email, username: user.username};
    const token = await jwt.sign(payload, SECRET);
    
    return token;

};
