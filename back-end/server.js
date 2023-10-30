//Express Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//.env
// require('dotenv').config({ path: './.env'})
const origins = ['http://localhost:4200'];
const port = process.env.PORT || 3001;
// const host = process.env.HOST;

//Routers
const mainRouter = require('./bin/api/routers/init.routes');
const usersRouter = require('./bin/api/routers/users.routes');
const verifyRouter = require('./bin/api/routers/verification.routes');
const locationsRouter  = require('./bin/api/routers/locations.routes');

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
app.use(express.urlencoded({extended: false}))

//Use router
app.use(mainRouter);
app.use(usersRouter);
app.use(verifyRouter);
app.use(locationsRouter)

server.listen(port, () => {
    console.log(`[INFO] Servicio HS-Backend iniciado correctamente [DATA: port ${port}].`);
});
