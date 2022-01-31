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
            message: 'failed to fetch repos',
            err: err.message
        });
    }
});

router.get('/findRepoByName/:name/byUserId/:id', async (req, res) => {
    const id = req.params.id;
    const repoName = req.params.name;

    try {
        const user = await User.findById(id);
        if(user) {
            const namedRepo = user.repos.filter((repo) => repo.name === repoName);
            if(namedRepo.length === 0){
                        return res.status(400).send({
                        status: 400,
                        message: 'repo not found in this users repo'
                });
            } else {
                return res.status(200).send({
                    status: 200,
                    message: 'repo found',
                    repo: namedRepo
                })
            }
        }
    } catch(err) {
        return res.status(400).send({ 
            status: 400,
            message: 'failed to fetch repo',
            err: err.message
        });
    }
});

module.exports = app => app.use('/repo', router);