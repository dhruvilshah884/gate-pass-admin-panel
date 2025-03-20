import axios from 'axios'
import { INearestPlace } from '@/interface/nearestPlace'

export interface IFetchPlaceParams {
  pageSize?: number
  page?: number
  q?: string
}

export const fetchPlaces = async (params: IFetchPlaceParams) => {
  try {
    const response = await axios.get(`api/place`, {
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

export const deletePlace = async (id: string) => {
  try {
    const response = await axios.delete(`api/place/${id}`, {
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

export const postPlace = async (data: INearestPlace) => {
  try {
    const response = await axios.post(`api/place`, data, {
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

export const updatePlace = async (id: string, data: INearestPlace) => {
  try {
    const response = await axios.put(`api/place/${id}`, data, {
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

export const fetchPlaceById = async (id: string) => {
  try {
    const response = await axios.get(`api/place/${id}`, {
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
