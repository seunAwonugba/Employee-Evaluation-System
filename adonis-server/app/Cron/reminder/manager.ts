import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'
const cron = require('node-cron')
import Env from '@ioc:Adonis/Core/Env'

const reminderEvaluation = async () => {
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
        .htmlView('emails/manager_thirdday', {
          user: { fullName: name },
          url: `${Env.get(
            'CLIENT_URL'
          )}/managers-form/?userId=${userId}&month=${month.toLowerCase()}`,
          month: { month: month },
        })
    })
  }

  // "At 09:00, between day 3 and 31 of the month"

  const mail = cron.schedule('0 9 3-31 * *', async () => {
    const allManagers = await Database.query().select('*').from('manager_models')

    const evaluatedManagersPerMonth = await Database.query()
      .select('*')
      .from('manager_answer_models')
      .where({ evaluation_for_month: currentMonth.toLowerCase() })

    const allManagersId = allManagers.map((item) => {
      return item.id
    })

    const evaluatedManagersPerMonthId = evaluatedManagersPerMonth.map((item) => {
      return item.manager_id
    })

    const defaultManagersId = allManagersId.filter(
      (item) => !evaluatedManagersPerMonthId.includes(item)
    )

    const defaultManagers = await Database.query()
      .select('*')
      .from('manager_models')
      .whereIn('id', defaultManagersId)

    defaultManagers.map((manager) => {
      console.log(manager)

      sendEmails(
        manager.email,
        `${manager.first_name}, Evaluation Reminder`,
        manager.first_name,
        manager.id,
        currentMonth
      )
    })

    mail.start()
  })
}

module.exports = reminderEvaluation
