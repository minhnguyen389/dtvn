'use strict'
const mongoose = require('mongoose')

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const dbUser = process.env.DB_USER;
const dbUserPassword = process.env.DB_PASSWORD;

let dbUri;

class Database {
    constructor() {
        if (!dbUser && !dbUserPassword) {
            dbUri = `mongodb://${dbHost}:${dbPort}/${dbName}`
        } else {
            dbUri = `mongodb://${dbUser}:${dbUserPassword}@${dbHost}:${dbPort}/${dbName}`
        }

        this.connect()
    }

    connect() {
        //debug
        // mongoose.set('debug', true)
        // mongoose.set('debug', { color: true })
        this.connectWithRetry()    }

    connectWithRetry() {
        mongoose.connect(dbUri, {
            maxPoolSize: 10,
            minPoolSize: 0
        }).then(() => {
            console.log(`*****MongoDB connected: ${dbUri}`);
        }).catch(err => {
            console.log(`*****DB connect ERROR!`, err);
            setTimeout(() => {
                console.log(`*****Retry connect Mongodb......`);
                this.connectWithRetry()
            }, 5000)
        })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceDatabase = Database.getInstance();
module.exports = instanceDatabase;