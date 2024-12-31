'use strict'
const nodeSchedule = require('node-schedule');
const stationController = require('../controllers/station.controller')


class StationStatusJobs {

    static startCheckStatus = async () => {
        nodeSchedule.scheduleJob(`*/10 * * * * *`, async () => {
            StationStatusJobs.findAndUpdateStatus();
        });
    }

    static findAndUpdateStatus = async () => {
        //tìm các redis key còn tồn tại => là các nozzle đang online
        const instanceCacheRedis = require('../cache/init.redis');
        let keys = await instanceCacheRedis.getRedisClient().keys('station_lasttime:*');

        //check lan luot tung key
        const currentTime = new Date().getTime();
        for (let i = 0; i < keys.length; i++) {
            let r = await instanceCacheRedis.getRedisClient().get(keys[i]);
            if (r) {
                const stationTimeOn = parseInt(r, 10);
                const stationId = keys[i].split(':')[1];
                const diff = (currentTime - stationTimeOn) / 1000;
                if (diff >= 30) {//30 seconds
                    stationController.setOffline(stationId);
                }
            }
        }
    }

}

module.exports = StationStatusJobs;