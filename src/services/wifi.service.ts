import { models } from '@/models'
import { IWifi } from '@/interface/wifi'

class attendanceService {
  public wifi = models.Wifi

  public async all() {
    const wifi = await this.wifi.find({})
    return wifi
  }
  public async findByid(_id: string) {
    const wifi = await this.wifi.findById(_id)
    if (!wifi) throw new Error('wifi not found')
    return wifi
  }
  public async update(id: string, data: IWifi) {
    const wifi = await this.wifi.findByIdAndUpdate(id, data)
    if (!wifi) throw new Error('wifi not found')
    return wifi
  }
  public async delete(id: string) {
    const wifi = await this.wifi.findByIdAndDelete(id)
    if (!wifi) throw new Error('wifi not found')
    return wifi
  }
}
export default attendanceService
