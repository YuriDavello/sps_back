const express = require("express");
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const User = require('../models/users');

router.use(authMiddleware);

router.post('/addRepo/toId/:id', async (req, res) => {
    try {
        const { repos } = req.body;
        const id = req.params.id;

        const user = await User.findById(id);
        repos.map( async (repo) => {
            user.repos.push(repo);
            const updatedUser = await User.findByIdAndUpdate(user.id, user);
    
            res.send({status: 200,
                    message: 'succesfully updated',
                    updated: updatedUser,
                    repo: repo});
        });

    } catch (e) {
        return res.status(400).send({status: 400,
                                    message: 'failed to update',
                                    error: e.message});
    }
});

router.get('/findAllById/:id', async (req, res) => {
    const userId = req.params.id;
    
    try {
        const user = await User.findById(userId);

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
        
    } catch(e) {
        return res.status(400).send({ 
            status: 400,
            message: 'failed to fetch repos',
            error: e.message
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
                        message: "repo not found in this user's repos"
                });
            } else {
                return res.status(200).send({
                    status: 200,
                    message: 'repo found',
                    repo: namedRepo
                });
            }
        }
    } catch(e) {
        return res.status(400).send({ 
            status: 400,
            message: 'failed to load repo',
            error: e.message
        });
    }
});

router.delete('/deleteRepoByName/:name/byUserId/:id', async (req, res) => {
    try {
        const repoName = req.params.name;
        const id = req.params.id;

        const user = await User.findById(id);
        await user.repos.map( async (repo) => {
            if (repo.name === repoName) {
                user.repos = user.repos.filter((repo) => repo.name !== repoName);
                const updatedUser = await User.findByIdAndUpdate(user.id, user);
                res.send({status: 200,
                        message: 'succesfully deleted',
                        updated: updatedUser,
                        repo: repo});
            }
        });
    } catch (e) {
        return res.status(400).send({status: 400,
                                     message: "failed to delete",
                                    error: e.message});
    }
});

module.exports = app => app.use('/repo', router);