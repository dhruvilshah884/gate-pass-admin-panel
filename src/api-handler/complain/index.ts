import axios from 'axios'

export interface IComplain {
  pageSize?: number
  page?: number
  q?: string
}

export const fetchComplains = async (params: IComplain) => {
  try {
    const response = await axios.get('/api/complaint', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
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
