import { models } from '@/models'
import jwt from 'jsonwebtoken'
import { TokenData } from '@/interface/auth'
import { hash, compare } from 'bcrypt'
import nodemailer from 'nodemailer'
import { SecurityService } from './security.service'
import { ISecurity } from '@/interface/security'
export class AuthService {
  public user = new SecurityService()

  public async Signup(user: ISecurity) {
    console.log(user, "user")
    try {
      const findUser = await models.Security.findOne({ email: user.email })
      if (findUser) {
        throw { success: false, message: 'User already exists', code: 409 }
      }
      const hashedPassword = await hash(user.password, 10)
      user.password = hashedPassword
      const newUser = await models.Security.create(user)
      return { success: true, message: 'User created successfully', data: newUser }
    } catch (err: any) {
      throw { success: false, message: err.message, code: err.code || 500 }
    }
  }
  public async signIn(email: string, password: string) {
    try {
      const findUser = await models.Security.findOne({ email: email })
      if (!findUser) {
        throw { success: false, message: 'User not found', code: 404 }
      }
      const isPasswordMatching = await compare(password, findUser.password)
      if (!isPasswordMatching) {
        throw { success: false, message: 'Password is not matching', code: 401 }
      }

      const tokenData = this.createToken({
        _id: findUser._id,
        name: findUser.name,
        addressLine1: findUser.addressLine1,
        email: findUser.email,
        flat: findUser.flat as string,
        password: '',
        phone: findUser.phone,
        phoneNumber1: findUser.phoneNumber1,
        proof: findUser.proof,
        salary: findUser.salary,
        shiftEndTime: findUser.shiftEndTime,
        shiftTime: findUser.shiftTime
      })
      return {
        _id: findUser._id,
        name: findUser.name,
        addressLine1: findUser.addressLine1,
        email: findUser.email,
        flat: findUser.flat as string,
        password: '',
        phone: findUser.phone,
        phoneNumber1: findUser.phoneNumber1,
        proof: findUser.proof,
        salary: findUser.salary,
        shiftEndTime: findUser.shiftEndTime,
        shiftTime: findUser.shiftTime,
        token:tokenData
      }
    } catch (err: any) {
      throw { success: false, message: err.message, code: err.code || 500 }
    }
  }

  public async resetPasswordLink(email: string) {
    try {
      const user = await models.Security.findOne({ email: email })
      if (!user) {
        throw { success: false, message: 'User not found', code: 404 }
      }
      const resetToken = jwt.sign({ email: user.email }, process.env.SECRET_KEY!, { expiresIn: '15m' })

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

      await this.sendResetEmail(email, resetLink)
      return { success: true, message: 'Reset link sent to email' }
    } catch (error) {
      throw { success: false, message: 'Something went wrong', code: 500 }
    }
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
    try {
      if (newPassword !== confirmPassword) {
        throw { success: false, message: 'Password and confirm password does not match', code: 400 }
      }
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY!)
      const user = await models.Security.findOne({ email: decoded.email })

      if (!user) {
        throw { success: false, message: 'Invalid token or user not found', code: 400 }
      }

      user.password = await hash(newPassword, 10)
      await user.save()
      return { success: true, message: 'Password reset successful' }
    } catch (err: any) {
      throw { success: false, message: err.message, code: err.code || 500 }
    }
  }
  public createToken(user: ISecurity): TokenData {
    const dataStoredInToken: any = { ...user, password: undefined }
    const secretKey: any = process.env.SECRET_KEY

    return { token: jwt.sign(dataStoredInToken, secretKey) }
  }
  public async updatePassword(data:any){
    try {
      const user = await models.Security.findOne({ email: data.email })
      if (!user) {
        throw { success: false, message: 'User not found', code: 404 }
      }
      const isPasswordMatching = await compare(data.oldPassword, user.password)
      if (!isPasswordMatching) {
        throw { success: false, message: 'Old Password is not matching', code: 401 }
      }
      if (data.newPassword !== data.confirmPassword) {
        throw { success: false, message: 'Password and confirm password does not match', code: 400 }
      }
      user.password = await hash(data.newPassword, 10)
      await user.save()
      return { success: true, message: 'Password updated successfully' }
    } catch (err: any) {
      throw { success: false, message: err.message, code: err.code || 500 }
    }
  }
}
