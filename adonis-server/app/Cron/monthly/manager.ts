const cron = require('node-cron')
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Logger from '@ioc:Adonis/Core/Logger'
import ManagerModel from 'App/Models/ManagerModel'
import MemberModel from 'App/Models/MemberModel'

const monthlyEvaluation = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const sendEmails = async (
    to: string,
    subject: string,
    name: string,
    userId: number,
    month: string
  ) => {
    await Mail.send((message) => {
      message
        .from('jalyn12@ethereal.email')
        .to(to)
        .subject(subject)
        .htmlView('emails/assessment', {
          user: { fullName: name },
          url: `${Env.get(
            'CLIENT_URL'
          )}/managers-form/?userId=${userId}&month=${month.toLowerCase()}`,
          month: { month: month },
        })
    })
  }

  // "At 09:00, on day 1 of the month"

  const mail = cron.schedule('0 9 1 * *', async () => {
    const managers = await ManagerModel.all()

    managers.map((manager) => {
      // Logger.info(manager)

      sendEmails(
        manager.email,
        `${manager.firstName}, Monthly Staff Evaluation For Your Staffs`,
        manager.firstName,
        manager.id,
        currentMonth
      )
    })
  })

  mail.start()
}

module.exports = monthlyEvaluation
