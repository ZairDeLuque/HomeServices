//Express Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//.env
// require('dotenv').config({ path: './.env'})
const origins = ['http://localhost:4200'];
const port = process.env.PORT;
const host = process.env.HOST || 3001;

//Routers
const mainRouter = require('./bin/api/routers/init.routes');
const usersRouter = require('./bin/api/routers/users.routes');
const verifyRouter = require('./bin/api/routers/verification.routes');

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
app.use(usersRouter);
app.use(verifyRouter)

server.listen(port, () => {
    console.log(`[INFO] Servicio HW-Backend iniciado correctamente [DATA: port ${port}, host: ${host}].`);
});
