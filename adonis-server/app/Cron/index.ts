const cron = require('node-cron')
import Logger from '@ioc:Adonis/Core/Logger'
const manager = require('./monthly/manager')
const members = require('./monthly/members')

manager()
members()

Logger.info('In-process Cron Jobs Registered!!!')
