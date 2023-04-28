import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import ManagerModel from 'App/Models/ManagerModel'
import MemberModel from 'App/Models/MemberModel'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

export default class TeamAuthsController {
  public async signUp(ctx: HttpContextContract) {
    const companyId = ctx.request.qs().id
    const type = ctx.request.qs().type

    const signUpSchema = schema.create({
      firstName: schema.string({ trim: true }),
      lastName: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'manager_models', column: 'email', caseInsensitive: true }),
      ]),
      password: schema.string([
        rules.regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
        rules.confirmed(),
      ]),
    })

    try {
      const payload = await ctx.request.validate({
        schema: signUpSchema,
        messages: {
          '*': (field, rule, _arrayExpressionPointer, _options) => {
            return `${rule} validation error on ${field}`
          },
          'firstName.required': 'First name is required',
          'lastName.required': 'Last name is required',
          'unique': '{{field}} already exist',
          'email': 'Please provide a valid email address',
          'password_confirmation.confirmed': 'Password and confirm password does not match',
          'password.regex':
            'Passwords must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        },
      })

      const data = await ManagerModel.create({ ...payload, companyId })
      console.log(data)

      const token = jwt.sign({
        id: data.id,
        email: data.email,
      })
      console.log(token)

      return ctx.response.status(StatusCodes.CREATED).json({
        success: true,
        data: payload,
        // token,
      })
      //   switch (type) {
      //     case 'manager':
      //       data = await ManagerModel.create({ ...payload, companyId })
      //       console.log(data)

      //       token = jwt.sign({
      //         id: data.id,
      //         email: data.email,
      //       })
      //       console.log(token)

      //       //   return ctx.response.status(StatusCodes.CREATED).json({
      //       //     success: true,
      //       //     data: createManager,
      //       //     token: managerToken,
      //       //   })
      //       break
      //     case 'member':
      //       data = await MemberModel.create({ ...payload, companyId })
      //       console.log(data)

      //       token = jwt.sign({
      //         id: data.id,
      //         email: data.email,
      //       })

      //       //   return ctx.response.status(StatusCodes.CREATED).json({
      //       //     success: true,
      //       //     data: createMember,
      //       //     token: memberToken,
      //       //   })
      //       break
      //     default:
      //       console.log(type)
      //   }

      return ctx.response.status(StatusCodes.CREATED).json({
        success: true,
        data,
        token,
      })
    } catch (error) {
      console.log()

      //   return ctx.response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      //     success: false,
      //     data: error.messages.errors[0].message,
      //   })
    }
  }
}
