import Logger from '@ioc:Adonis/Core/Logger'
const monthlyManagers = require('./monthly/manager')
const monthlyMembers = require('./monthly/members')
const managerReminder = require('./reminder/manager')
const memberReminder = require('./reminder/member')

// monthlyManagers()
// monthlyMembers()
// managerReminder()
// memberReminder()
Logger.info('In-process Cron Jobs Registered!!!')
