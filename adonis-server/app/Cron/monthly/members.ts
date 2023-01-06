const cron = require('node-cron')
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import MemberModel from 'App/Models/MemberModel'
import Logger from '@ioc:Adonis/Core/Logger'

const membersMonthlyEvaluation = () => {
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
        .from('seun.a@autochek.africa')
        .to(to)
        .subject(subject)
        .htmlView('emails/member_assessment', {
          user: { fullName: name },
          url: `${Env.get(
            'CLIENT_URL'
          )}/managers-form/?userId=${userId}&month=${month.toLowerCase()}`,
          month: { month: month },
        })
    })
  }

  cron.schedule('*/1 * * * *', async () => {
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

module.exports = membersMonthlyEvaluation
