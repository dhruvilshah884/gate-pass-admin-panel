import { models } from '@/models'
import { CurdOperation } from '@/utils/CURD'
import { IAttendace } from '@/interface/attendance'
import mongoose from 'mongoose'

export class AttendanceService extends CurdOperation<IAttendace> {
  constructor() {
    super(models.Attendance, [{ path: 'security' }])
  }
  public async createAttendaceWithPayroll(data: any) {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const attendance = await this.create(data)
      const month = new Date(data.shiftStartTime).setDate(1)

      let payroll = await models.Payroll.findOne({ security: data.security, month }).session(session)

      if (!payroll) {
        payroll = new models.Payroll({
          security: data.security,
          month,
          salary: 0,
          deductions: 0,
          netSalary: 0,
          status: 'pending'
        })
        await payroll.save({ session })
      }
      await session.commitTransaction()
      session.endSession()
      return attendance
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      throw err
    }
  }

  public async updateAttendanceWithPayroll(id: string, qrScanTime: string) {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const attendance = await models.Attendance.findById(id).session(session)
      if (!attendance) {
        throw new Error('Attendance not found')
      }
      attendance.qrScanLogs.push(qrScanTime)
      await attendance.save({ session })

      if (attendance.qrScanLogs.length % 2 === 0) {
        const [loginTime, logoutTime] = attendance.qrScanLogs.slice(-2)
        const workedHours = (new Date(logoutTime).getTime() - new Date(loginTime).getTime()) / (1000 * 60 * 60)

        let shiftCount = 0
        if (workedHours >= 8) shiftCount = 1
        else if (workedHours >= 4) shiftCount = 0.5

        const month = new Date(attendance.shiftStartTime).setDate(1)
        const payRoll = await models.Payroll.findOne({ security: attendance.security, month }).session(session)
        if (!payRoll) {
          throw new Error('Payroll not found')
        }
        payRoll.totalShifts += shiftCount
        payRoll.salary = payRoll.totalShifts * (15000 / 30)
        await payRoll.save({ session })
      }

      await session.commitTransaction()
      session.endSession()
      return attendance
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      throw err
    }
  }
}
