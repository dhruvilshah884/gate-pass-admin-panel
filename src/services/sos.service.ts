import { models } from '@/models'
import { Isos } from '@/interface/sos'

class attendanceService {
  public Sos = models.Sos

  public async all() {
    const sos = await this.Sos.find({})
    return sos
  }
  public async findByid(_id: string) {
    const sos = await this.Sos.findById(_id)
    if (!sos) throw new Error('sos not found')
    return sos
  }
  public async update(id: string, data: Isos) {
    const sos = await this.Sos.findByIdAndUpdate(id, data)
    if (!sos) throw new Error('sos not found')
    return sos
  }
  public async delete(id: string) {
    const sos = await this.Sos.findByIdAndDelete(id)
    if (!sos) throw new Error('sos not found')
    return sos
  }
}
export default attendanceService
