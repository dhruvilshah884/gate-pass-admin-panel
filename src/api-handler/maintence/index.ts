import axios from 'axios'
import { IMaintenance } from '@/interface/maintenance'

export interface IFetchMaintenceParams {
  pageSize?: number
  page?: number
  q?: string
}

export const fetchMaintenance = async (params: IFetchMaintenceParams) => {
  try {
    const response = await axios.get(`api/maintence`, {
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
export const updateMaintenace = async (id: string, data: IMaintenance) => {
  try {
    const response = await axios.put(`api/maintence/${id}`, data, {
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

export const fetchMaintenaceById = async (id: string) => {
  try {
    const response = await axios.get(`api/maintence/${id}`, {
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
export const postMaintenance = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No authentication token found')

    const response = await axios.post(
      `/api/maintence`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('Error in postMaintenance:', error)
    return { success: false, data: null, message: error.response?.data?.message || error.message }
  }
}
