const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => { res.send(208) });

router.post('/running_containers', async (req, res) => {
    let eStatus = 500;
    var Docker = require('dockerode');
    var docker = new Docker({ host: '127.0.0.1', port: 2375 });

    let list = [];

    try {

        list = await docker.listContainers().catch(() => {
            console.log('first')
        });
    }
    catch (error) {
        console.log(error);
        eStatus = 500;
    }

    console.log('Container List')

    if (list.length > 0) {

        let bestest = list[0];


        var container = docker.getContainer(bestest.Id);
        container.inspect(function (err, data) {
            // console.log(data);
        });
        eStatus = 200;
        console.log('here');
        res.status(200).json({ running: list.length, error: "none", data: { list } });


    } else {
        eStatus = 200;
        console.log('here444444444444444');

        res.json({ running: list.length, error: "none" });
        res.sendStatus(201);
    }







    console.log('wow');



});


module.exports = router;