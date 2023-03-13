import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import CompanyModel from 'App/Models/CompanyModel'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import Logger from '@ioc:Adonis/Core/Logger'

export default class AuthController {
  public async signUp(ctx: HttpContextContract) {
    // console.log(ctx)

    const createCompanySchema = schema.create({
      companyName: schema.string({ trim: true }, [
        rules.unique({ table: 'company_models', column: 'company_name', caseInsensitive: true }),
      ]),
      companyWebpage: schema.string({ trim: true }, [rules.url()]),
      ceoName: schema.string({ trim: true }),
      companyEmail: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'company_models', column: 'company_email', caseInsensitive: true }),
      ]),
      password: schema.string([
        rules.regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
        rules.confirmed(),
      ]),
    })

    // console.log(createCompanySchema)

    try {
      // Logger.error(ctx.request)
      // console.log(ctx.request)

      const payload = await ctx.request.validate({
        schema: createCompanySchema,
        messages: {
          '*': (field, rule, arrayExpressionPointer, options) => {
            return `${rule} validation error on ${field}`
          },
          'companyName.required': 'Company name is required',
          'companyName.unique': 'Company name already exist',
          'companyWebpage.url': 'Company webpage must be a valid url',
          'companyWebpage.required': 'Company webpage is required',
          'ceoName.required': 'CEO name is required',
          'companyEmail.required': 'Company email is required',
          'companyEmail.email': 'Please provide a valid company email address',
          'companyEmail.unique': 'Company email already exist',
          'password.required': 'Password is required',
          'password_confirmation.confirmed': 'Password and confirm password does not match',
          'password.regex':
            'Passwords must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        },
      })

      const registerCompany = await CompanyModel.create(payload)
      // console.log(registerCompany)

      return ctx.response.status(StatusCodes.CREATED).json({
        success: true,
        data: registerCompany,
      })
    } catch (error) {
      return ctx.response.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        data: error.messages.errors[0].message,
      })
    }
  }
}
