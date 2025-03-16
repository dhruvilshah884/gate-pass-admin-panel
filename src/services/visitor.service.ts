import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IVisitor } from '@/interface/visitor'
import nodemailer from 'nodemailer'

export interface IStatus {
  pending: 'pending'
  approved: 'approved'
  denied: 'denied'
  completed: 'completed'
}

export class VisitorService extends CurdOperation<IVisitor> {
  constructor() {
    super(models.Visitor, [{ path: 'flat' }, { path: 'residance' }, { path: 'security' }])
  }

  private async sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    })
  }

  public async statusUpdate(id: string, status: IStatus) {
    const visitorDetails = await models.Visitor.findById(id)
    if (!visitorDetails) {
      throw new Error('Visitor not found')
    }
    visitorDetails.status = status
    if (visitorDetails.status === 'completed') {
      visitorDetails.exitTime = new Date()
    }
    if (visitorDetails.status === 'approved') {
      visitorDetails.entryTime = new Date()
      const wifiDetails = await models.Wifi.findOne({ flat: visitorDetails.flat })
      if (!wifiDetails) {
        throw new Error('Wifi details not found')
      }
      if (visitorDetails.email) {
        await this.sendEmail(
          visitorDetails.email,
          'Your visit has been approved',
          `Hello ${visitorDetails.name}, your visit has been approved. You may enter the premises now. Now You Can Access The Wifi ${wifiDetails.wifiName} and Password ${wifiDetails.wifiCredentials}`
        )
      }
    }
    if (visitorDetails.status === 'denied') {
      if (visitorDetails.email) {
        await this.sendEmail(
          visitorDetails.email,
          'Your visit has been denied',
          `Hello ${visitorDetails.name}, your visit has been denied. You may not enter the premises now. Now You Can Call The Residance To Know The Reason`
        )
      }
    }
    await visitorDetails.save()
    return visitorDetails
  }
  public async sos(id: string, data: boolean) {
    const visitorDetails = await models.Visitor.findById(id)
    if (!visitorDetails) {
      throw new Error('Visitor not found')
    }
    visitorDetails.sos = data
    if (visitorDetails.sos) {
      const securityDetails = await models.Security.findById(visitorDetails.security)
      if (!securityDetails) {
        throw new Error('Security not found')
      }
      const sos = await models.Sos.create({
        residance: visitorDetails.residance,
        visitor: visitorDetails._id,
        alertMessage: `Visitor ${visitorDetails.residance.name} has pressed SOS`,
        alertTime: new Date(),
        status: true
      })
      await sos.save()

      if (securityDetails.email) {
        await this.sendEmail(
          securityDetails.email,
          'Visitor SOS',
          `Hello ${securityDetails.name}, a visitor has pressed SOS. Please check the premises.`
        )
      }
    }
    await visitorDetails.save()
    return visitorDetails
  }
}
