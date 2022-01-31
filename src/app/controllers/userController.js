const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');
const router = express.Router();

const User = require('../models/users');

const generateToken = (params = {}) => {
    return jwt.sign(params, secret.key, {
        expiresIn: 86400
    });
};

router.post('/register', async (req, res) => {

    const {email} = req.body;

    try {
        if(await User.findOne( {email} ))
            return res.status(400).send({
                status: 400,
                message: "email already exists",
            });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.status(301).send({ 
            user: user,
            status: 301,
            message: 'user created!'
        });
        
    } catch(err) {
        return res.status(400).send({ 
            status: 400,
            message: 'failed to register',
            err: err.message
        });
    }
});

router.post('/authenticate', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).send({
                status: 400,
                message: 'user not found'
            });
        }

        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            return res.status(400).send({
                status: 400,
                message: 'invalid password'
            });
        }

        user.password = undefined;

        const token = generateToken({  id: user.id });
        return res.status(200).send({ 
            user: user,
            token: token,
            status: 200,
            message: 'user authenticated'
        });

    } catch(err) {
        return res.status(400).send({ 
            status: 400,
            message: 'failed to register',
            err: err.message
        });
    }
});


module.exports = app => app.use('/user', router);