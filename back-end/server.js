//Express Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./bin/api/routers/routes.js');


//.env
require('dotenv').config({ path: './.env'})
const origins = process.env.ORIGIN;
const port = process.env.PORT;
const host = process.env.HOST;

//Routers
const mainRouter = require('./bin/api/routers/init.routes');

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
app.use(mainRouter);

app.use(router);




//App listen
server.listen(port, host, () => {
    console.log(`[INFO] Servicio HW-Backend iniciado correctamente [DATA: port ${port}, host: ${host}].`);
});
