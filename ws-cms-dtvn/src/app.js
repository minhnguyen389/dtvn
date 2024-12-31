'use strict'

const dotenv = require('dotenv');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const fs = require('fs');

const StationStatusJobs = require ('./jobs/station.status.jobs.js')


dotenv.config();
app.use(cors());

//=====init middleware
// app.use(morgan('dev'));
// app.use(morgan('combined'));
app.use(morgan('common'));
// app.use(morgan('short'));
// app.use(morgan('tiny'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Init DB
require('./dbs/init.mongodb');

//Init Auth
require('./auth/auth.jwt').initAuth(app);

//Init Routes
app.use('/', require('./routes/routes'));

//Handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

//default error with 500 code
app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

//Init redis
require('./cache/init.redis');

// //Init MQTT
require('./mqtt/mqx.client');

//File Server
global.__basedir = __dirname;
let dir = `${__dirname}/public/files`;

try {
    if (!fs.existsSync(dir)) {
        fs.mkdir(dir, { recursive: true }, err => {
            if (err) {
                throw Error("Lỗi tạo thư mục lưu file!");
            } else {
                app.use('/files', express.static(dir));
            }
        })
    } else {
        app.use('/files', express.static(dir));
    }
} catch (err) {
    console.error(err);
}

StationStatusJobs.startCheckStatus();

module.exports = app;
