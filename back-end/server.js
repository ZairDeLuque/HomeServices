//Express Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Multer dirs
const fs = require('fs').promises;

//Morgan
const morgan = require('morgan');
const fsNotPromise = require('fs');
const path = require('path');

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

//Configuration Multer
async function verifyDisksPaths() {
    const pathA = './bin/disks/profileData';
    const pathB = './bin/disks/profileImgs';

    try {
        await fs.access(pathA);

        try{
            await fs.access(pathB);
        }
        catch (err2){
            await fs.mkdir(pathB);
            console.log('[INFO-server.js] Disk B created.');
        }

        console.log('[INFO-server.js] Multer Disks path online.');

        run();
    } catch (err){
        await fs.mkdir(pathA);
        console.log('[INFO-server.js] Disk A created, reload the app to create Disk B if is first start.');
    }
}

//Set uses of cors and body-parser
app.use(cors(corsOptions));
app.use(bodyParser.json());

async function verifyMorgan() {
    const logsPath = path.join(__dirname, 'bin', 'logs', 'access.log');

    try {
        // Verifica si el directorio de logs existe
        await fs.access(path.dirname(logsPath));

        // Configura Morgan con el archivo de logs
        const accessLogStream = fsNotPromise.createWriteStream(logsPath, { flags: 'a' });

        app.use(morgan('combined', { stream: accessLogStream }));

        console.log('[INFO-server.js] Morgan path online.');
    } catch (error) {

        if (error.code === 'ENOENT') {
            await fs.mkdir(path.dirname(logsPath), { recursive: true });
            console.log('[INFO-server.js] Morgan path created. Reload the app.');
        } else {
            console.error('[ERROR-server.js] Error while accessing the log directory:', error);
        }
    }
}

//Use router
app.use(mainRouter);

function run(){
    server.listen(port, host, () => {
        console.log(`[INFO] Servicio HW-Backend iniciado correctamente [DATA: port ${port}, host: ${host}].`);
    });
}

verifyMorgan();
verifyDisksPaths();
