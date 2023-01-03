import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ManagerModel from 'App/Models/ManagerModel'

export default class UsersController {
  public async getUsers({ request, response }: HttpContextContract) {
    return [
      {
        id: 1,
        title: 'Hello world',
      },
      {
        id: 2,
        title: 'Hello universe',
      },
    ]
  }

  // public async sendMailToManagerMonthly() {
  //   await Mail.send((message) => {
  //     message
  //       .from('seunawonugba@gmail.com')
  //       .to('temidayodefr@guerrillamail.info')
  //       .subject('Welcome')
  //     // .htmlView('emails/welcome', { name: 'Virk' })
  //   })
  // }
}

// function sendManagersMail(params) {
//   for(let i in ManagerModel){

//   }

// }
