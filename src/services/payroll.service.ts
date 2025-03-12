import { models } from '@/models'
import { IPayroll } from '@/interface/payroll'

class attendanceService {
  public Payroll = models.Payroll

  public async all() {
    const payrol = await this.Payroll.find({})
    return payrol
  }
  public async findByid(_id: string) {
    const payroll = await this.Payroll.findById(_id)
    if (!payroll) throw new Error('payroll not found')
    return payroll
  }
  public async update(id: string, data: IPayroll) {
    const payroll = await this.Payroll.findByIdAndUpdate(id, data)
    if (!payroll) throw new Error('payroll not found')
    return payroll
  }
  public async delete(id: string) {
    const payroll = await this.Payroll.findByIdAndDelete(id)
    if (!payroll) throw new Error('payroll not found')
    return payroll
  }
}
export default attendanceService
