import { models } from '@/models'
import { IAttendace } from '@/interface/attendance'

class attendanceService {
  public Attendance = models.Attendance

  public async all() {
    const attendance = await this.Attendance.find({})
    return attendance
  }
  public async findByid(_id: string) {
    const attendance = await this.Attendance.findById(_id)
    if (!attendance) throw new Error('attendance not found')
    return attendance
  }
  public async update(id: string, data: IAttendace) {
    const attendance = await this.Attendance.findByIdAndUpdate(id, data)
    if (!attendance) throw new Error('attendance not found')
    return attendance
  }
  public async delete(id: string) {
    const attendance = await this.Attendance.findByIdAndDelete(id)
    if (!attendance) throw new Error('attendance not found')
    return attendance
  }
}
export default attendanceService
