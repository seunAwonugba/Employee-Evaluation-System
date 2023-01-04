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

  public async getManager(ctx: HttpContextContract) {
    const { id } = ctx.params
    try {
      const manager = await ManagerModel.find(id)
      if (manager) {
        return ctx.response.status(200).json({
          success: true,
          data: manager,
        })
      } else {
        return ctx.response.status(404).json({
          success: false,
          data: `manager not found`,
        })
      }
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        data: `unknown error occurred in /manager/:${id}`,
      })
    }
  }
}
