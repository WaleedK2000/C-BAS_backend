const express = require('express');
var Docker = require('dockerode');

const router = express.Router();

router.get('/', async (req, res) => {

    console.log(req.query.id);
    res.send(208)
});

router.post('/containerData', async (req, res) => {

    console.log(req.query.id);

    //new Docker({protocol:'http', host: '127.0.0.1', port: 3000});

    var docker = new Docker({ host: 'localhost', port: 2375 });

    let list = [];

    try {
        var container = docker.getContainer(req.query.id);
        container.inspect(function (err, data) {
            list = data

            console.log(data);

        });

    } catch (error) {
        console.log(error)
    }

    console.log('here');
    res.status(200).json({ running: list.length, error: "none", data: list });






});


module.exports = router;