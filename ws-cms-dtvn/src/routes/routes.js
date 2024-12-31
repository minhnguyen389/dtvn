'use strict'

const express = require('express')
const router = express.Router()

router.use('/api/v1/', require('./routes.user'))
router.use('/api/v1/project', require('./routes.project'))
router.use('/api/v1/station', require('./routes.station'))
router.use('/api/v1/station_record', require('./routes.station_record'))
router.use('/api/v1/parameter', require('./routes.parameter'))
router.use('/api/v1/log', require('./routes.log'))

module.exports = router