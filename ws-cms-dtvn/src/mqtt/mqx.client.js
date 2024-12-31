'use strict'

const mqtt = require('mqtt');
// const { calculateCRC } = require('../helper/checksum');
const logController = require('../controllers/log.controller');
const stationController = require('../controllers/station.controller');


class mqx {
    constructor() {
        this.start();
    }

    async start() {
        this.mqttClient = mqtt.connect(
            process.env.MQTT_URL,
            {
                username: process.env.MQTT_USER,
                password: Buffer.from(process.env.MQTT_PWD)
            })
        this.mqttClient.on('connect', () => {
            console.log("MQTT connected!");

            this.mqttClient.subscribe('dtvn/+/data', { qos: 2 }, (err) => {
                console.log(`*****MQTT Subscribe 'dtvn/+/data': ${err ? err : 'OK'}`);
            });

            this.mqttClient.subscribe('dtvn/+/config', { qos: 2 }, (err) => {
                console.log(`*****MQTT Subscribe 'dtvn/+/config': ${err ? err : 'OK'}`);
            });

            this.mqttClient.subscribe('dtvn/+/control', { qos: 2 }, (err) => {
                console.log(`*****MQTT Subscribe 'dtvn/+/control': ${err ? err : 'OK'}`);
            });

            this.mqttClient.subscribe('dtvn/sync_time', { qos: 2 }, (err) => {
                console.log(`*****MQTT Subscribe 'dtvn/sync_time': ${err ? err : 'OK'}`);
            });
        });

        this.mqttClient.on('reconnect', () => {
            console.log("*****MQTT reconnect!")
        });
        this.mqttClient.on('disconnect', () => {
            console.log("*****MQTT disconnect!")
        });
        this.mqttClient.on('close', () => {
            console.log("*****MQTT close!")
        });
        this.mqttClient.on('offline', () => {
            console.log("*****MQTT offline!")
        });
        this.mqttClient.on('error', (err) => {
            console.log("*****MQTT error!", err)
        });

        this.mqttClient.on('message', (topic, message) => {
            let msg = message.toString();

            if (topic.toString().match(/dtvn\/.*\/data/)) this.dataProcess(topic, msg)

            if (topic.toString().match(/dtvn\/.*\/config/)) this.configProcess(topic, msg)

            if (topic.toString().match(/dtvn\/.*\/control/)) this.controlProcess(topic, msg)
        });
    }

    dataProcess(topic, msg) {
        try {
            const payload = JSON.parse(msg);
            const mac = topic.split('/')[1];
            stationController.setOnline(mac);

            if (Array.isArray(payload)) {
                //console.log('dataProcess', payload);
                payload.forEach(buff => {
                    if (buff.type == 'sensor') {
                        logController.createDataLog(mac, buff);
                        logController.createMqttLog(mac, 'sensor', 'N/A', msg);
                    }
                    else if (buff.type == 'control') {
                        logController.createMqttLog(mac, 'res_control', buff.id, msg);
                    }
                    else if (buff.type == 'cfg') {
                        stationController.resConfig(mac, buff);
                        logController.createMqttLog(mac, 'res_config', buff.id, msg);
                    }
                    else if (buff.type == 'sms') {
                        logController.createMqttLog(mac, 'res_sms', buff.id, msg);
                    }
                    else if (buff.type == 'cmd') {
                        logController.createMqttLog(mac, 'res_cmd', buff.id, msg);
                    }
                    else if (buff.type == 'device') {
                        stationController.getPingMsg(mac, buff);
                        logController.createMqttLog(mac, 'ping', 'N/A', msg);
                    }
                })
            }
            else {
                console.log('dataProcess: Lỗi bản tin không phải là mảng!');
            }

        } catch (error) {
            console.error('Lỗi bản tin MQTT topic Data!')
        }
    }

    configProcess(topic, msg) {
        //console.log('configProcess', topic);
        try {
            const mac = topic.split('/')[1];
            const start = msg.indexOf('@');
            const end = msg.indexOf('=', start);
            const msg_id = msg.substring(start + 1, end);

            logController.createMqttLog(mac, 'config', msg_id, msg);

        } catch (error) {
            console.error('Lỗi bản tin MQTT topic Config!')
        }
    }

    controlProcess(topic, msg) {
        //console.log('controlProcess', topic);
        try {
            const mac = topic.split('/')[1];
            const start = msg.indexOf('@');
            const end = msg.indexOf('=', start);
            const msg_id = msg.substring(start + 1, end);

            logController.createMqttLog(mac, 'control', msg_id, msg);

        } catch (error) {
            console.error('Lỗi bản tin MQTT topic Control!')
        }
    }

    pubConfig(mac, data) {
        this.mqttClient.publish(`dtvn/${mac}/config`, data, { qos: 1, retain: true }, (err) => {
            if (err) {
                console.log(`*****MQTT publish 'dtvn/${mac}/config' ERR: ${err}`);
                throw new BadRequestError(`Lỗi server kết nối!`)
            }
        });
    }

    pubCmd() {

    }

    pubControl() {

    }

    static getInstance() {
        if (!mqx.instance) {
            mqx.instance = new mqx();
        }
        return mqx.instance;
    }

}

const instanceMqx = mqx.getInstance();
module.exports = instanceMqx;