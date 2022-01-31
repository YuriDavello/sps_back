const express = require("express");
const router = express.Router();

const User = require('../models/users');

router.post('/register', async (req, res) => {

    const {email} = req.body;

    try {
        // verify if email already exists   
        if(await User.findOne( {email} ))
            return res.status(400).send({
                status: 400,
                message: "email already exists",
            });

        const user = await User.create(req.body);

        // user.password = undefined;

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

// router.post('/authenticate', async (req, res) => {

//     try {
//         const test = await Test.create(req.body);
//         return res.status(301).send({ test: test });
//     } catch() {

//     }
// });


module.exports = app => app.use('/user', router);