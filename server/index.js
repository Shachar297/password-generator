const
    // Load packages
    cors = require('cors'),
    fs = require('fs-extra'),
    express = require('express'),
    // init server.
    server = express(),
    port = process.env.PORT || 8755,
    routersManager = require('./routes/routes-manager');

server.use(express.static('public'));
server.use(cors({ origin: '*' }));
server.use(express.json());
server.use('/api', routersManager);

server.listen(port, () => console.log('Server is running at port ' + port));