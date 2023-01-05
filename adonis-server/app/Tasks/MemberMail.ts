import { BaseTask } from 'adonis5-scheduler/build'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import MemberModel from 'App/Models/MemberModel'
import Logger from '@ioc:Adonis/Core/Logger'

export default class MemberMail extends BaseTask {
  public static get schedule() {
    return '* * * * * *'
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmpTaskLock`
   */
  public static get useLock() {
    return false
  }

  public async handle() {
    // this.logger.info('Handled')
    const currentMonth = new Date().toLocaleString('default', { month: 'long' })

    const sendMemberEmails = async (
      to: string,
      subject: string,
      userId: string,
      month: string,
      name: string
    ) => {
      await Mail.send((message) => {
        message
          .from('seunawonugba@gmail.com')
          .to(to)
          .subject(subject)
          .htmlView('emails/member_assessment', {
            user: { fullName: name },
            url: `${Env.get(
              'CLIENT_URL'
            )}/staff-form/?userId=${userId}&month=${month.toLowerCase()}`,
            month: { month: month },
          })
      })
    }

    const members = await MemberModel.all()
    for (let i in members) {
      Logger.info(members[i])

      sendMemberEmails(
        members[i].email,
        `${members[i].firstName}, Monthly Staff Evaluation For Your Manager`,
        members[i].id,
        currentMonth.toUpperCase(),
        members[i].firstName
      )
    }
  }
}
