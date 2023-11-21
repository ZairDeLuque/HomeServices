//Express Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//.env
require('dotenv').config({ path: './.env'})
const origins = ['http://localhost:4200'];
const port = process.env.PORT || 3001;
const host = process.env.HOST;

//Routers
const mainRouter = require('./bin/api/routers/init.routes');
const usersRouter = require('./bin/api/routers/users.routes');
const verifyRouter = require('./bin/api/routers/verification.routes');
const locationsRouter  = require('./bin/api/routers/locations.routes');
const categoryRouter = require('./bin/api/routers/categorys.routes');
const servicesRouter = require('./bin/api/routers/services.routes');
const paymentsRouter = require('./bin/api/routers/payments.routes');
const messageRouter = require('./bin/api/routers/messages.routes')
const commentaryRouter = require('./bin/api/routers/comentary.routes')

//Express app
const app = express();
const http = require('http');
const server = http.createServer(app);

//Socket IO
const socketIO = require('socket.io');
const io = socketIO(server)

io.on('connection', (socket) => {
    console.log('SOCKET / New connection created.');
  
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`[INFO] User joined room: ${roomId}`);
    });

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`[INFO] User left room: ${roomId}`);
    });

    socket.on('sendMessage', (data) => {
        console.log('[INFO] New message sent');
        socket.broadcast.emit('receiveMessage', data);
    });
});

//Cors Options
const corsOptions = {
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    credentials: true
};

//Set uses of cors and body-parser
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

//Set Morgan Dev for development
app.use(morgan('dev'));

//Use router
app.use(mainRouter);
app.use(usersRouter);
app.use(verifyRouter);
app.use(locationsRouter);
app.use(categoryRouter);
app.use(servicesRouter);
app.use(paymentsRouter);
app.use(messageRouter);
app.use(commentaryRouter);

server.listen(port, host, () => {
    console.log(`[INFO] Servicio HS-Backend iniciado correctamente [DATA: port ${port}].`);
});
