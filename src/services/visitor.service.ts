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

  private async sendEmail(to: string, subject: string, html: string) {
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
      html
    })
  }
  public async createVisitor(data: any) {
    const visitor = await models.Visitor.create(data)
    const residence = await models.Residance.findById(data.residance)

    if (!residence) {
      throw new Error('Residence not found')
    }

    if (residence.email) {
      // Approval & Rejection API Links
      const acceptUrl = `https://dhruvil-gate-pass.vercel.app/visitors/status?id=${visitor._id}&status=approved`
      const rejectUrl = `https://dhruvil-gate-pass.vercel.app/visitor/status?id=${visitor._id}&status=denied`

      const emailHtml = `
        <body style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; background: #ffffff; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); text-align: center;">
            <h2 style="color: #333;">🚪 New Visitor Alert</h2>
            <p style="color: #666;">A visitor is waiting for your approval.</p>
  
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; text-align: left;">
              <p><strong>Name:</strong> ${visitor.name}</p>
              <p><strong>Phone:</strong> <a href="tel:${
                visitor.phone
              }" style="color: #007bff; text-decoration: none;">${visitor.phone}</a></p>
              <p><strong>Vehicle Number:</strong> ${visitor.vehicleNumber}</p>
              <p><strong>Entry Time:</strong> ${new Date(visitor.entryTime).toLocaleString()}</p>
            </div>
  
            <p style="margin-top: 20px; color: #444;">Please approve or reject the visitor.</p>
  
            <div style="margin-top: 20px;">
              <a href="${acceptUrl}" style="background: #28a745; color: white; padding: 12px 25px; text-decoration: none; font-size: 16px; border-radius: 5px; font-weight: bold; margin-right: 10px; display: inline-block;">✅ Accept</a>
              <a href="${rejectUrl}" style="background: #dc3545; color: white; padding: 12px 25px; text-decoration: none; font-size: 16px; border-radius: 5px; font-weight: bold; display: inline-block;">❌ Reject</a>
            </div>
  
            <p style="margin-top: 20px; font-size: 12px; color: #888;">If you did not request this, please ignore this email.</p>
          </div>
        </body>
      `

      await this.sendEmail(residence.email, 'New Visitor Notification', emailHtml)
    }

    return visitor
  }

  public async statusUpdate(id: string, status: any) {
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
      if (visitorDetails.email) {
        await this.sendEmail(
          visitorDetails.email,
          'Your visit has been approved',
          `Hello ${visitorDetails.name}, your visit has been approved. You may enter the premises now.`
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
