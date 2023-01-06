import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ManagerAnswerModel from 'App/Models/ManagerAnswerModel'
import MemberAnswerModel from 'App/Models/MemberAnswerModel'

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
  }


  public async submitMemberForm(ctx: HttpContextContract) {
    const {
      memberName,
      memberId,
      branch,
      managerId,
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
      const saveMemberAnswer = await MemberAnswerModel.create({
        memberName,
        memberId,
        branch,
        managerId,
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
        data: saveMemberAnswer,
      })
    } catch (error) {
      return ctx.response.status(500).json({
        success: false,
        data: 'Unknown error occurred, please try again',
      })
    }
  }
}
