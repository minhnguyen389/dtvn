'use strict'

const { createClient } = require('redis');

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisUserPassword = process.env.REDIS_PASSWORD;

class CacheRedis {
    redisClientPublish;
    redisClientSubscribe;

    constructor() {
        this.initRedis()
    }

    initRedis = async () => {

        this.redisClientPublish = createClient({
            url: `redis://:${redisUserPassword}@${redisHost}:${redisPort}`
        });

        this.redisClientSubscribe = createClient({
            url: `redis://:${redisUserPassword}@${redisHost}:${redisPort}`
        });

        this.redisClientPublish.on('connect', () => console.log('Redis Client Connected!!!'));
        this.redisClientPublish.on('error', err => console.log('Redis Client Error!!!', err));

        this.redisClientPublish.connect();
        this.redisClientSubscribe.connect();
    }

    getRedisClient() {
        return this.redisClientPublish;
    }

    static getInstance() {
        if (!CacheRedis.instance) {
            CacheRedis.instance = new CacheRedis()
        }
        return CacheRedis.instance
    }
}
const instanceCacheRedis = CacheRedis.getInstance();
module.exports = instanceCacheRedis