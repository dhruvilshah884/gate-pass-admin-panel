import { IFlat } from '@/interface/flat'
import axios from 'axios'

export const fetchFlats = async () => {
  try {
    const response = await axios.get(`api/flat`, {
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

export const deleteFlat = async (id: string) => {
  try {
    const response = await axios.delete(`api/flat/${id}`)
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

export const postFlat = async (data: IFlat) => {
  try {
    const response = await axios.post(`api/flat`, data)
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

export const updateFlat = async (id: string, data: IFlat) => {
  try {
    const response = await axios.put(`api/flat/${id}`, data)
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

export const fetchFlatById = async (id: string) => {
  try {
    const response = await axios.get(`api/flat/${id}`)
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
