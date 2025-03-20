import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IMaintenance } from '@/interface/maintenance'
import nodemailer from 'nodemailer'
import cron from 'node-cron'
export class MaintenceService extends CurdOperation<IMaintenance> {
  constructor() {
    super(models.Maintenance, [{ path: 'residance' }])
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

  public async sendMailForMaintance(id:string) {
    try {
      const residences = await models.Residance.find({flat:id , isDeleted: false})
      console.log(residences)
      const maintenancePromises = residences.map(async residence => {
        const maintenanceRecord = await models.Maintenance.create({
          residance: residence._id,
          flat: residence.flat,
          amount: 0,
          status: false,
          paymentMode: null,
          paymentDate: null,
          paymentProof: null,
          paymentMonth: new Date().toISOString().slice(0, 7)
        })
        if (residence.email) {
          await this.sendEmail(
            residence.email,
            'Monthly Maintenance Due',
            `Dear ${residence.name},\n\nYour maintenance fee of ₹${residence.maintanance} is due for ${maintenanceRecord.paymentMonth}. Please make the payment at your earliest convenience.\n\nThank you!`
          )
        }
      })
      await Promise.all(maintenancePromises)
      console.log('Maintenance records created and emails sent successfully!')
    } catch (err) {
      console.error('Error sending maintenance emails:', err)
    }
  }
}
