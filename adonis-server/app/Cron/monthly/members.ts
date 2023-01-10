const cron = require('node-cron')
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import MemberModel from 'App/Models/MemberModel'
import Logger from '@ioc:Adonis/Core/Logger'

const monthlyEvaluation = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })

  const sendEmails = async (
    to: string,
    subject: string,
    month: string,
    userId: number,
    name: string
  ) => {
    await Mail.send((message) => {
      message
        .from('jalyn12@ethereal.email')
        .to(to)
        .subject(subject)
        .htmlView('emails/member_assessment', {
          user: { fullName: name },
          url: `${Env.get(
            'CLIENT_URL'
          )}/members-form/?userId=${userId}&month=${month.toLowerCase()}`,
          month: { month: month },
        })
    })
  }

  // "At 09:00, on day 1 of the month"

  cron.schedule('*/1 * * * *', async () => {
    // 0 9 1 * *
    const members = await MemberModel.all()

    members.map((member) => {
      Logger.info(member)

      sendEmails(
        member.email,
        `${member.firstName}, Monthly Staff Evaluation For Your Managers`,
        currentMonth,
        member.id,
        member.firstName
      )
    })
  })
}

module.exports = monthlyEvaluation
