//Express Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//.env
require('dotenv').config({ path: './.env'})
const origins = process.env.origin;
const port = process.env.port;
const host = process.env.host;

//Routers
//const mainRouter = require('./src/routers/main.routes');

//Socket IO
const http = require('http');

//Cors Options
const corsOptions = {
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    credentials: true
};

//Express app
const app = express();
const server = http.createServer(app);

//Set uses of cors and body-parser
app.use(cors(corsOptions));
app.use(bodyParser.json());

//Use router
//app.use(mainRouter);

//App listen
server.listen(port, host, () => {
    console.log(`[INFO] Servicio HW-Backend iniciado correctamente [DATA: port ${port}, host: ${host}].`);
});
