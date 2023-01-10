import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ManagerModel from 'App/Models/ManagerModel'
import MemberModel from 'App/Models/MemberModel'
import Logger from '@ioc:Adonis/Core/Logger'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async getManagers(ctx: HttpContextContract) {
    try {
      const managers = await Database.query().select('*').from('manager_models')
      return ctx.response.status(200).json({
        success: true,
        data: managers,
      })
    } catch (error) {
      return ctx.response.status(404).json({
        success: false,
        data: error,
      })
    }
  }

  public async getMembers(ctx: HttpContextContract) {
    try {
      const members = await Database.query().select('*').from('member_models')
      return ctx.response.status(200).json({
        success: true,
        data: members,
      })
    } catch (error) {
      return ctx.response.status(404).json({
        success: false,
        data: error,
      })
    }
  }

  public async getManager(ctx: HttpContextContract) {
    const { id } = ctx.params
    try {
      const manager = await ManagerModel.find(id)
      // const managerDb = await Database.from('manager_models').where('id', id)
      // const managerModel = await ManagerModel.query().where('id', id).select('*')
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
  public async getMember(ctx: HttpContextContract) {
    const { id } = ctx.params
    try {
      const member = await MemberModel.find(id)
      // const managerDb = await Database.from('manager_models').where('id', id)
      // const managerModel = await ManagerModel.query().where('id', id).select('*')
      if (member) {
        return ctx.response.status(200).json({
          success: true,
          data: member,
        })
      } else {
        return ctx.response.status(404).json({
          success: false,
          data: `member not found`,
        })
      }
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        data: `unknown error occurred in /member/:${id}`,
      })
    }
  }

  public async getMembersByBranch(ctx: HttpContextContract) {
    const branch = ctx.request.qs().branch
    // console.log(branch)

    if (branch) {
      try {
        // const membersByBranch = await MemberModel.findBy('branch', branch)
        const memberModel = await MemberModel.query().where('branch', branch).select('*')

        return ctx.response.status(200).json({
          success: true,
          data: memberModel,
        })
      } catch (error) {
        return ctx.response.status(404).json({
          success: true,
          data: 'member not found',
        })
      }
    } else {
      try {
        const members = await MemberModel.all()
        Logger.info(`${members}`)

        return ctx.response.status(200).json({
          success: true,
          data: members,
        })
      } catch (error) {
        return ctx.response.status(404).json({
          success: true,
          data: 'members not found',
        })
      }
    }
  }

  public async getManagersByBranch(ctx: HttpContextContract) {
    const branch = ctx.request.qs().branch
    // console.log(branch)

    if (branch) {
      try {
        // const membersByBranch = await MemberModel.findBy('branch', branch)
        const managerModel = await ManagerModel.query().where('branch', branch).select('*')

        return ctx.response.status(200).json({
          success: true,
          data: managerModel,
        })
      } catch (error) {
        return ctx.response.status(404).json({
          success: true,
          data: 'member not found',
        })
      }
    } else {
      try {
        const manager = await ManagerModel.all()
        Logger.info(`${manager}`)

        return ctx.response.status(200).json({
          success: true,
          data: manager,
        })
      } catch (error) {
        return ctx.response.status(404).json({
          success: true,
          data: 'members not found',
        })
      }
    }
  }
}
