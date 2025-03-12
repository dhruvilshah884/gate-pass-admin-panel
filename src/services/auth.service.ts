import { models } from '@/models'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { DataStoredInToken, TokenData } from '@/interface/auth'
import { IResidance } from '@/interface/residance'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

class AuthService {
  public residance = models.Residance
  public async signup(data: IResidance) {
    const findResidance = await this.residance.findOne({ phoneNumber1: data.phoneNumber1 })
    if (findResidance) {
      throw new Error(`This email ${findResidance.phoneNumber1} already exists`)
    }
    const hashedPassword = await hash(data.password, 10)
    const createResidance: IResidance = await this.residance.create({ ...data, password: hashedPassword })
    return createResidance
  }

  public async login(data: IResidance) {
    const findUser = await this.residance.findOne({ phoneNumber1: data.phoneNumber1 })
    if (!findUser) {
      throw new Error(`User ${data.phoneNumber1} not found`)
    }
    const isPasswordMatching = await compare(data.password, findUser.password)
    if (!isPasswordMatching) {
      throw new Error('Password is not matching')
    }
    const tokenData = this.createToken(findUser)

    const cookie = this.createCookie(tokenData)

    return { cookie, findUser, token: tokenData.token }
  }
  public async updatePassword(data: IResidance) {
    const fidUser = await this.residance.findOne({ phoneNumber1: data.phoneNumber1 })

    const isPasswordMatching = await compare(data.password, fidUser.password)
    if (!isPasswordMatching) {
      throw new Error('Password is not matching')
    }
    const hashedPassword = await hash(data.password, 10)
    const updateUser = await this.residance.findByIdAndUpdate(fidUser._id, { password: hashedPassword }, { new: true })
    return updateUser
  }
  public async forgotPassword(data: IResidance) {
    const findUser = await this.residance.findOne({ phoneNumber1: data.phoneNumber1 })
    if (!findUser) {
      throw new Error(`User ${data.phoneNumber1} not found`)
    }
    const dataStoredInToken = findUser.findOne({ phoneNumber1: data.password })
    const secretKey = process.env.SECRET_KEY as string
    const expiresIn = (60 * 60 * 24 * 365) as number
    const resetToken = sign(dataStoredInToken, secretKey, { expiresIn })

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    await this.sendResetEmail(findUser.email, resetLink)
    return true
  }
  private async sendResetEmail(email: string, resetLink: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: ${resetLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center; background-color: #f9f9f9;">
          <h2 style="color: #333;">Forgot Your Password?</h2>
          <p style="font-size: 16px; color: #555;">No worries! Click the button below to reset your password.</p>
          <a href="${resetLink}" style="display: inline-block; padding: 12px 20px; margin-top: 15px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p style="margin-top: 20px; font-size: 14px; color: #777;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
  }

  public async resetPassword(token: string, newPassword: string, confirmPassword: string) {
    if (newPassword !== confirmPassword) {
      throw { success: false, message: 'Password and confirm password does not match', code: 400 }
    }
    const dataStoredInToken: any = jwt.verify(token, process.env.SECRET_KEY as string)
    const user = await models.Residance.findOne({ email: dataStoredInToken.email })
    if (!user) {
      throw { success: false, message: 'User not found', code: 400 }
    }
    user.password = await hash(newPassword, 10)
    await user.save()
    return { success: true, message: 'Password has been reset successfully', code: 200 }
  }
  public async adminLogin(data: IResidance) {
    const findUser = await this.residance.findOne({ phoneNumber1: data.phoneNumber1, role: 'ADMIN' })
    if (!findUser) {
      throw new Error(`User ${data.phoneNumber1} not found`)
    }
    const isPasswordMatching = await compare(data.password, findUser.password)
    if (!isPasswordMatching) {
      throw new Error('Password is not matching')
    }
    const tokenData = this.createToken(findUser)

    const cookie = this.createCookie(tokenData)

    return { cookie, findUser, token: tokenData.token }
  }

  public createToken(user: IResidance): TokenData {
    const dataStoredInToken = { _id: user._id }
    const secretKey = process.env.SECRET_KEY as string
    const expiresIn = (60 * 60 * 24 * 365) as number
    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) }
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
  }
}
export default AuthService
