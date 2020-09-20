const { User }          = require('../models');
const authService       = require('../services/auth.service');
const { to, ReE, ReS }  = require('../services/util.service');


const addUser = async function(req, res){


    let err, user;
    let userData = req.body.user;

    [err, user] = await to(
        User.create(
            userData
        ));

    if (err) return ReE(res, err, 422);


    return ReS(res, {user:user.toWeb()});
}
module.exports.addUser = addUser;


const getUserById = async function(req, res){


    let err, user;
    let user_id = req.body.user_id;

    [err, user] = await to(
        User.findByPk(
            user_id
        ));

    if (err) return ReE(res, err, 422);

    if (user==undefined) return ReE(res, "user_id not found: "+user_id, 422);


    return ReS(res, {user:user.toWeb()});
}
module.exports.getUserById = getUserById;

const authenticate = async function(req, res){


    let err, user;
    let username = req.body.username;
    let password = req.body.password;

    [err, user] = await to(
        User.findOne({ where: { username: username} })

    );

    if (err) return ReE(res, err, 422);

    if (user==undefined) return ReE(res, "user not found: "+username, 422);

    if(password.toLowerCase() !== user.password.toLowerCase())
    {
        return ReE(res, "Authentication Failure", 401)
    }

    user.password = undefined;


    return ReS(res, {user:user.toWeb()});
}
module.exports.authenticate = authenticate;

