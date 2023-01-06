import { BaseTask } from 'adonis5-scheduler/build'
import Logger from '@ioc:Adonis/Core/Logger'
import ManagerModel from 'App/Models/ManagerModel'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

export default class SendMail extends BaseTask {
  public static get schedule() {
    return '*/1 * * * * *'
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return true
  }

  public async handle() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' })

    const sendEmails = async (
      to: string,
      subject: string,
      name: string,
      userId: number,
      month: string
    ) => {
      console.log(currentMonth)

      await Mail.send((message) => {
        message
          .from('seunawonugba@gmail.com')
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
    // this.logger.info('Handled')
    // Logger.info('Cron job works')
    const managers = await ManagerModel.all()
    for (let i in managers) {
      Logger.info(managers[i])
      sendEmails(
        managers[i].email,
        `${managers[i].firstName}, Monthly Staff Evaluation For Your Staffs`,
        managers[i].firstName,
        managers[i].id,
        currentMonth.toUpperCase()
      )
    }
  }
}
