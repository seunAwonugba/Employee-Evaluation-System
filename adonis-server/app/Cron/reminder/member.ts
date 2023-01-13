import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Database from '@ioc:Adonis/Lucid/Database'
const cron = require('node-cron')

const reminderEvaluation = async () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })

  const sendMails = async (
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
        .htmlView('emails/member_reminder', {
          user: { fullName: name },
          url: `${Env.get(
            'CLIENT_URL'
          )}/members-form/?userId=${userId}&month=${month.toLowerCase()}`,
          month: { month: month },
        })
    })
  }

  const mail = cron.schedule('0 9 3-31 * *', async () => {
    const allMembers = await Database.query().select('*').from('member_models')
    const evaluatedMembersPerMonth = await Database.query()
      .select('*')
      .from('member_answer_models')
      .where({
        evaluation_for_month: currentMonth.toLowerCase(),
      })

    const allMembersId = allMembers.map((item) => {
      return item.id
    })

    const evaluatedMembersPerMonthId = evaluatedMembersPerMonth.map((item) => {
      return item.member_id
    })

    const defaultMembersId = allMembersId.filter(
      (item) => !evaluatedMembersPerMonthId.includes(item)
    )

    const defaultMembers = await Database.query()
      .select('*')
      .from('member_models')
      .whereIn('id', defaultMembersId)

    defaultMembers.map((member) => {
      console.log(member)
      sendMails(
        member.email,
        `${member.first_name}, Evaluation Reminder`,
        member.first_name,
        member.id,
        currentMonth
      )
    })

    mail.start()
  })
}

module.exports = reminderEvaluation
