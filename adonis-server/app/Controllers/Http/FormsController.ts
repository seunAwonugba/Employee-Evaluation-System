import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ManagerAnswerModel from 'App/Models/ManagerAnswerModel'

export default class FormsController {
  public async submitManagerForm(ctx: HttpContextContract) {
    const {
      managerName,
      managerId,
      branch,
      memberId,
      workQuality,
      workQualityReason,
      taskCompletion,
      taskCompletionReason,
      overAndAbroad,
      overAndAbroadReason,
      communication,
      communicationReason,
      evaluationForMonth,
    } = ctx.request.all()

    try {
      const saveManagerAnswer = await ManagerAnswerModel.create({
        managerName,
        managerId,
        branch,
        memberId,
        workQuality,
        workQualityReason,
        taskCompletion,
        taskCompletionReason,
        overAndAbroad,
        overAndAbroadReason,
        communication,
        communicationReason,
        evaluationForMonth,
      })

      return ctx.response.status(200).json({
        success: true,
        data: saveManagerAnswer,
      })
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        data: 'Unknown error occurred, please try again',
      })
    }

    // console.log(managerName)
    // console.log(managerId)
    // console.log(branch)
    // console.log(memberId)
    // console.log(workQuality)
    // console.log(workQualityReason)
    // console.log(taskCompletion)
    // console.log(taskCompletionReason)
    // console.log(overAndAbroad)
    // console.log(overAndAbroadReason)
    // console.log(communication)
    // console.log(communicationReason)
    // console.log(evaluationForMonth)
  }
}
