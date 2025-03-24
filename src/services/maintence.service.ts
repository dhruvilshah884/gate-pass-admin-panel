import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IMaintenance } from '@/interface/maintenance'
import nodemailer from 'nodemailer'
import Razorpay from 'razorpay'
import { IFlat } from '@/interface/flat'
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

  public async sendMailForMaintance(id: string) {
    try {
      const residences = await models.Residance.find({ flat: id, isDeleted: false }).populate('flat')

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!
      })

      const maintenancePromises = residences.map(async residence => {
        const maintenanceRecord = await models.Maintenance.create({
          residance: residence._id,
          flat: residence.flat,
          amount: (residence.flat as IFlat).maintenance,
          status: false,
          paymentMode: null,
          paymentDate: null,
          paymentProof: null,
          paymentMonth: new Date().toISOString().slice(0, 7)
        })

        await models.Residance.findByIdAndUpdate(
          residence._id,
          { $push: { pastMaintenance: maintenanceRecord._id } },
          { new: true }
        )

        // ✅ Generate Razorpay Payment Link
        const paymentLink = await razorpay.orders.create({
          amount: maintenanceRecord.amount * 100, // Razorpay expects amount in paisa
          currency: 'INR',
          receipt: `receipt_${maintenanceRecord._id}`,
          payment_capture: 1 as any
        })

        if (residence.email) {
          await this.sendEmail(
            residence.email,
            'Monthly Maintenance Due',
            `Dear ${residence.name},\n\nYour maintenance fee of ₹${maintenanceRecord.amount} is due for ${maintenanceRecord.paymentMonth}.\n\nPlease make the payment using the link below:\n\n[Pay Now](https://rzp.io/i/${paymentLink.id})\n\nThank you!`
          )
        }
      })

      await Promise.all(maintenancePromises)
      return residences
    } catch (err) {
      console.error('Error sending maintenance emails:', err)
    }
  }
  public async updateMaintenanceStatus(id: string, paymentData: any) {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!
      })
      const maintenance = await models.Maintenance.findById(id)
      if (!maintenance) {
        throw new Error('Maintenance not found')
      }

      const order = await razorpay.orders.create({
        amount: maintenance.amount * 100,
        currency: 'INR',
        receipt: `receipt_${maintenance._id}`,
        payment_capture: 1 as any
      })

      if (!paymentData.razorpay_payment_id) {
        throw new Error('Payment ID is required.')
      }

      const payment = await razorpay.payments.fetch(paymentData.razorpay_payment_id)

      if (payment.status === 'captured') {
        maintenance.status = true
        maintenance.paymentMode = 'Razorpay'
        maintenance.paymentDate = new Date()
        maintenance.paymentProof = paymentData.razorpay_payment_id
        await maintenance.save()

        return {
          success: true,
          message: 'Payment successful, maintenance updated',
          maintenance
        }
      } else {
        throw new Error('Payment failed or not captured')
      }
    } catch (err: any) {
      console.error('Error updating maintenance status:', err)
      return { success: false, message: err.message }
    }
  }
}
