import axios from 'axios'

export interface IFetchVisitorParams {
  pageSize?: number
  page?: number
  q?: string
}
export const fetchVisitors = async (params: IFetchVisitorParams) => {
  try {
    const response = await axios.get('/api/visitor', {
      params
    })
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: (error as any).message
    }
  }
}
