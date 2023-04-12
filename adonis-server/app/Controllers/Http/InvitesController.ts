import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { StatusCodes } from 'http-status-codes'
import sendMail from '../../../util/mailService'
import Env from '@ioc:Adonis/Core/Env'
import CompanyModel from 'App/Models/CompanyModel'

export default class InvitesController {
  public async invite(ctx: HttpContextContract) {
    const email = ctx.request.qs().companyEmail
    const type = ctx.request.qs().type

    const inviteSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email(), rules.required()]),
    })

    try {
      const payload = await ctx.request.validate({
        schema: inviteSchema,
        messages: {
          '*': (field, rule, _arrayExpressionPointer, _options) => {
            return `${rule} validation error on ${field}`
          },
          'required': 'Email is required',
          'email': 'Please provide a valid email address',
        },
      })
      if (!email) {
        return ctx.response.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          data: 'Invalid or expired token',
        })
      }

      const companyEmail = await CompanyModel.findBy('companyEmail', email)

      if (!companyEmail) {
        return ctx.response.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          data: 'Company with this email address not found',
        })
      }

      switch (type) {
        case 'manager':
          sendMail(
            payload.email,
            `Invitation Request from ${companyEmail.companyName}`,
            'emails/invitation_request',
            `${Env.get('CLIENT_URL')}/accept-invite/?id=${companyEmail.id}&type=${type}`
          )

          break

        case 'member':
          sendMail(
            payload.email,
            `Invitation Request from ${companyEmail.companyName}`,
            'emails/invitation_request',
            `${Env.get('CLIENT_URL')}/accept-invite/?id=${companyEmail.id}&type=${type}`
          )
          break

        default:
          break
      }

      return ctx.response.status(StatusCodes.OK).json({
        success: true,
        data: 'Invitation email sent',
      })
    } catch (error) {
      return ctx.response.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        data: error.messages.errors[0].message,
      })
    }
  }
}
