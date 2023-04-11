import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

export default async function sendMail(
  to: string,
  subject: string,
  htmlView: string,
  url: string,
  user?: string
) {
  await Mail.send((message) => {
    message.from(Env.get('SMTP_USERNAME')).to(to).subject(subject).htmlView(htmlView, { user, url })
  })
}
