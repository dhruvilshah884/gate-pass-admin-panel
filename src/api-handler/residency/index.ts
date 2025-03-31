import axios from 'axios'

export interface IFetchResidanceParams {
  pageSize?: number
  page?: number
  q?: string
}

export const fetchResidencies = async (params: IFetchResidanceParams) => {
  try {
    const response = await axios.get(`api/residance`, {
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

export const deleteResidency = async (id: string) => {
  try {
    const response = await axios.delete(`api/residance/${id}`)
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
export const fetchResidencyById = async (id: string) => {
  try {
    const response = await axios.get(`api/residance/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
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

export const updateResidency = async (id: string, data: any) => {
  try {
    const response = await axios.put(`/api/residance/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
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
