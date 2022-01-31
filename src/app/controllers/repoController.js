const express = require("express");
const router = express.Router();

const User = require('../models/users');

router.get('/findAllById/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById({ _id: userId });

        if(!user) {
            return res.status(400).send({
                status: '400',
                message: 'user not found'
            });
        }
        
        const repos = user.repos;

        return res.status(200).send({ 
            repos: repos,
            status: 200,
            message: 'repos fetched'
        });
        
    } catch(err) {
        return res.status(400).send({ 
            status: 400,
            message: 'failed to register',
            err: err.message
        });
    }
});

module.exports = app => app.use('/repo', router);