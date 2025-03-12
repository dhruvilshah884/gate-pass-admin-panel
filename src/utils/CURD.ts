import { FilterQuery, FlattenMaps, Model, ProjectionType, UpdateQuery, PopulateOptions } from 'mongoose'

interface CurdPopulate extends PopulateOptions {}

interface IPaginatedResult<T> {
  result: FlattenMaps<T>[]
  count: number
}

export class CurdOperation<T> {
  private model: Model<T>
  private defaultPopulate: CurdPopulate[] = []
  private defaultProjection: ProjectionType<T> = {}

  constructor(model: any, populate?: CurdPopulate[], projection?: ProjectionType<T>) {
    this.model = model
    if (populate) {
      this.defaultPopulate = populate
    }
    if (projection) {
      this.defaultProjection = projection
    }
  }

  public create = async (data: T, populate: CurdPopulate[] = this.defaultPopulate): Promise<T> => {
    try {
      const modelInstance = new this.model(data)
      const record = await modelInstance.save()

      let result: any = record.toJSON()

      if (populate.length) {
        let query = this.model.findById(record._id, this.defaultProjection)
        populate.map(p => query.populate(p))
        result = (await query.exec())?.toJSON()
      }

      return modelInstance.toJSON() as T
    } catch (err) {
      console.error('Error:', err)
      throw err
    }
  }
  public fetch = async (
    limit: number = 1000,
    page: number = 1,
    filter?: FilterQuery<T>,
    sort?: any,
    populate: CurdPopulate[] = this.defaultPopulate
  ): Promise<IPaginatedResult<T>> => {
    try {
      const query = this.model
        // @ts-ignore
        .find({ isDeleted: false, isCancel: false, ...filter }, this.defaultProjection)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort(sort || { createdAt: -1 })

      if (populate.length) {
        populate.map(p => query.populate(p))
      }
      // @ts-ignore
      const result: FlattenMaps<T>[] = (await query.exec()).map(item => item.toJSON())

      // @ts-ignore
      const count = await this.model.countDocuments({
        // @ts-ignore
        isDeleted: false,
        // @ts-ignore
        isCancel: false,
        ...filter
      })

      return { result, count }
    } catch (err) {
      console.error('Error:', err)
      throw err
    }
  }

  public findOne = async (filter?: FilterQuery<T>, populate: CurdPopulate[] = this.defaultPopulate): Promise<T> => {
    try {
      const query = this.model.findOne({ ...filter }, this.defaultProjection).sort({ createdAt: -1 })

      if (populate.length) {
        populate.map(p => query.populate(p))
      }

      const result = (await query.exec())?.toJSON()

      return result as T
    } catch (err) {
      throw err
    }
  }

  public get = async (id: string, populate: CurdPopulate[] = this.defaultPopulate): Promise<T> => {
    try {
      const query = this.model.findById(id, this.defaultProjection)

      if (populate.length) {
        populate.map(p => query.populate(p))
      }

      const result = (await query.exec())?.toJSON()
      return result as T
    } catch (err) {
      throw err
    }
  }

  public update = async (
    id: string,
    data: UpdateQuery<T>,
    populate: CurdPopulate[] = this.defaultPopulate
  ): Promise<T> => {
    try {
      const record = await this.model.findByIdAndUpdate(id, data as any, {
        new: true
      })

      if (record) {
        let result: any = record.toJSON()

        if (populate.length) {
          let query = this.model.findById(record._id, this.defaultProjection)
          populate.map(p => query.populate(p))
          result = (await query.exec())?.toJSON()
        }
      }

      return record?.toJSON() as T
    } catch (err) {
      throw err
    }
  }

  public delete = async (_id: string, populate: CurdPopulate[] = this.defaultPopulate): Promise<T> => {
    try {
      const record = await this.model.findByIdAndUpdate(_id, { isDeleted: true }, { new: true })

      if (record) {
        let result: any = record.toJSON()

        if (populate.length) {
          let query = this.model.findById(record._id, this.defaultProjection)
          populate.map(p => query.populate(p.path, p.select, p.model, p.match))
          result = (await query.exec())?.toJSON()
        }
      }

      return record?.toJSON() as T
    } catch (err) {
      throw err
    }
  }
  public search = async (
    q: string,
    queryBy: string,
    filter?: any,
    page: number = 1,
    pageSize: number = 10,
    sortType?: string
  ) => {
    try {
      const searchQuery: any = { isDeleted: false }

      if (q && queryBy) {
        const fields = queryBy.split(',').map(field => field.trim())
        searchQuery['$or'] = fields.map(field => ({
          [field]: { $regex: q, $options: 'i' }
        }))
      }

      if (filter) {
        Object.keys(filter).forEach(key => {
          if (key === 'isFlagged') {
            searchQuery.flagged = filter[key]
          } else {
            searchQuery[key] = filter[key]
          }
        })
      }

      const sortQuery: any = sortType ? { [sortType]: 1 } : { createdAt: -1 }

      const skip = (page - 1) * pageSize

      const query = this.model.find(searchQuery).skip(skip).limit(pageSize).sort(sortQuery)

      if (this.defaultPopulate?.length) {
        this.defaultPopulate.forEach(p => query.populate(p))
      }

      const results = await query.exec()

      const totalCount = await this.model.countDocuments(searchQuery)

      return {
        result: results,
        currentPage: page,
        totalPages: Math.ceil(totalCount / pageSize),
        total: totalCount
      }
    } catch (err) {
      console.error('Error during search:', err)
      throw err
    }
  }

  public cancel = async (_id: string, populate: CurdPopulate[] = this.defaultPopulate): Promise<T> => {
    try {
      const record = await this.model.findByIdAndUpdate(_id, { isCancel: true }, { new: true })

      if (record) {
        let result: any = record.toJSON()

        if (populate.length) {
          let query = this.model.findById(record._id, this.defaultProjection)
          populate.map(p => query.populate(p))
          result = (await query.exec())?.toJSON()
        }
      }

      return record?.toJSON() as T
    } catch (err) {
      throw err
    }
  }
}
