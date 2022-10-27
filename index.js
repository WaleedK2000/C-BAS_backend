const cors = require('cors');
const express = require('express');
// const connectToMySql = require('./db');

const app = express();
const port = 4000;


app.use(cors());
// const connection = connectToMySql();

// app.use('/api/auth', (req, res, next) => {
//     req.con = connection;
//     //console.log(req.body.connection);
//     //console.log(connection);
//     next();
// }, require('./routes/auth'));


app.use('/api/fetch/docker/', (req, res, next) => {
    // req.con = 'nill';
    //console.log(req.body.connection);
    //console.log(connection);
    next();
}, require('./routes/dockerData'));

app.use('/api/fetch/container/', (req, res, next) => {
    // req.con = 'nill';
    //console.log(req.body.connection);
    //console.log(connection);
    next();
}, require('./routes/containerData'));



app.get('/', async (req, res) => {

    try {

        const fs = require('fs');
        var Docker = require('dockerode');
        var docker = new Docker({ host: '127.0.0.1', port: 2375 });

        let list = await docker.listContainers();
        console.log('Container List')

        if (list.length > 0) {

            let bestest = list[0];

            console.log(bestest);
            console.log(bestest.Mounts)

            var container = docker.getContainer(bestest.Id);
            container.inspect(function (err, data) {
                console.log(data);
            });

            res.send(list).status(200)

        } else {
            res.send('none').status(200)
        }

    } catch (error) {
        console.log(error);
    }

    // res.send('Hello api!').status(200)

})

app.listen(port, () => {
    console.log(`C-BAS app listening on port ${port}`);
})
