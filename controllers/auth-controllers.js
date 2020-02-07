const user_model = require('../models/user-model');
const auth_views = require('../views/auth-views');

const handle_user = (req,res,next) => {
    if(!req.session.user){
        return next();
    }
    user_model.findById(req.session.user._id).then((user) => {
        req.user = user;
        console.log('user:',req.session.user);
        next();
    });
};

const get_main = (req,res,next) => {
    if(!req.session.user){
        return get_login(req, res, next);
    }
    next();
};

const get_login = (req,res,next) => {
    res.send(auth_views.login_view());
};

const post_logout = (req,res,next) => {
    req.session.destroy();
    res.redirect('/');
};

const post_login = (req,res,next) => {
    const user_name = req.body.user_name;
    
    user_model.findOne({
        name: user_name
    }).then((user) => {
        if(user){
            req.session.user = user;;
            return res.redirect('/'); 
        }
    
    console.log('User name not registered', user_name);
    res.redirect('/');
    });
};

const post_register = (req,res,next) => {
    const user_name = req.body.user_name;
    if(!user_name){
        return res.redirect('/');
    }
    user_model.findOne({
        name: user_name
    }).then((user) => {
        if(user){
            console.log('User name already registered');
           return res.redirect('/'); 
        }

        let new_user = new user_model({
            name: user_name,
            notes: []
        });

        new_user.save().then(()=>{
            return res.redirect('/'); 
        });
    });
};

module.exports.handle_user = handle_user;
module.exports.get_main = get_main;
module.exports.get_login = get_login;
module.exports.post_logout = post_logout;
module.exports.post_login = post_login;
module.exports.post_register = post_register;