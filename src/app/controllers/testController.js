const express = require("express");
const router = express.Router();

// import test Entity
const Test = require('../models/test');

// http get
router.get('/', (req, res) => {
    console.log("get");

    return res.send({ message: 'api is working fine' });
});

// http get
router.get('/find', async (req, res) => {
    console.log("get");

    const tests = await Test.find();
    return res.send({ tests: tests });
});

// http post
router.post('/register', async (req, res) => {
    console.log("post");

    const test = await Test.create(req.body);
    return res.status(301).send({ test: test });
});

module.exports = app => app.use('/test', router);