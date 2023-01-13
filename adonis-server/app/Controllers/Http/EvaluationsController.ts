import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class EvaluationsController {
  public async getManagerEvaluations(ctx: HttpContextContract) {
    const { id } = ctx.params
    try {
      const getEvaluation = await Database.query()
        .select('*')
        .from('member_answer_models')
        .where('manager_id', id)
        .orderBy('updated_at', 'desc')

      if (getEvaluation) {
        return ctx.response.status(200).json({
          success: true,
          data: getEvaluation,
        })
      } else {
        return ctx.response.status(404).notFound({
          success: false,
          data: 'No evaluation record found',
        })
      }
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        data: `Invalid manager id`,
      })
    }
  }

  public async getMemberEvaluations(ctx: HttpContextContract) {
    const { id } = ctx.params
    try {
      const getEvaluation = await Database.query()
        .select('*')
        .from('manager_answer_models')
        .where('member_id', id)
        .orderBy('updated_at', 'desc')

      if (getEvaluation) {
        return ctx.response.status(200).json({
          success: true,
          data: getEvaluation,
        })
      } else {
        return ctx.response.status(404).notFound({
          success: false,
          data: 'No evaluation record found',
        })
      }
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        data: `Invalid member id`,
      })
    }
  }
}
