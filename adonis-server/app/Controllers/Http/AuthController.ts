import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import CompanyModel from 'App/Models/CompanyModel'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import Database from '@ioc:Adonis/Lucid/Database'

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

    try {
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

      const token = jwt.sign(
        {
          companyName: payload.companyName,
          companyEmail: payload.companyEmail,
        },
        Env.get('JWT_SECRET_KEY'),
        {}
      )

      const registerCompany = await CompanyModel.create({
        ...payload,
        confirmToken: token,
      })

      const sendConfirmationMail = async (
        to: string,
        subject: string,
        companyName: string,
        token: string
      ) => {
        await Mail.send((message) => {
          message
            .from('fiona14@ethereal.email')
            .to(to)
            .subject(subject)
            .htmlView('emails/confirmation_email', {
              user: { companyName },
              url: `${Env.get('CLIENT_URL')}/email-confirmation/?token=${token}`,
            })
        })
      }

      sendConfirmationMail(
        registerCompany.companyEmail,
        'Confirm Email!!!',
        registerCompany.companyName,
        token
      )

      return ctx.response.status(StatusCodes.CREATED).json({
        success: true,
        data: `Registration email address sent to ${registerCompany.companyEmail}`,
        token,
      })
    } catch (error) {
      return ctx.response.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        data: error.messages.errors[0].message,
      })
    }
  }

  public async confirmEmail(ctx: HttpContextContract) {
    const token = ctx.request.qs().token

    try {
      // const company = await Database.query().from('company_models').where('confirm_token', token)
      const company = await CompanyModel.findBy('confirm_token', token)
      console.log(company)

      if (!company) {
        return ctx.response.status(StatusCodes.NOT_FOUND).json({
          success: false,
          data: 'Company does not exist',
        })
      }

      company.isActive = true
      company.confirmToken = ''

      await company.save()

      return ctx.response.status(StatusCodes.OK).json({
        success: true,
        data: 'Email confirmation is successful, kindly proceed to login',
      })
    } catch (error) {
      console.log(error)

      return ctx.response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: 'Invalid token',
      })
    }
  }

  public async login(ctx: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({ trim: true }, [rules.required(), rules.email()]),
      password: schema.string([
        rules.regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
      ]),
    })

    try {
      const payload = await ctx.request.validate({
        schema: loginSchema,
        messages: {
          '*': (field, rule, arrayExpressionPointer, options) => {
            return `${rule} validation error on ${field}`
          },
          'companyEmail.required': 'Company email is required',
          'companyEmail.email': 'Please provide a valid company email address',
          'password.required': 'Password is required',
          'password.regex':
            'Passwords must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        },
      })

      // const login = await ctx.auth.use("api").attempt()
    } catch (error) {
      return ctx.response.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        data: error.messages.errors[0].message,
      })
    }
  }
}