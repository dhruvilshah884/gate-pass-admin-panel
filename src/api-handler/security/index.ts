import { ISecurity } from '@/interface/security'
import axios from 'axios'

export const fetchSecurity = async () => {
  try {
    const response = await axios.get(`/api/security`, {
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

export const postSecurity = async (data: ISecurity) => {
  try {
    const response = await axios.post(`/api/security/signup`, data, {
      // Pass data here
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
export const fetchSecurityById = async (id: string) => {
  try {
    const response = await axios.get(`/api/security/${id}`, {
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
export const updateSecurity = async (id: string, data: any) => {
  try {
    const response = await axios.put(`/api/security/${id}`, data, {
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
export const deleteSecurity = async (id: string) => {
  try {
    const response = await axios.delete(`/api/security/${id}`, {
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
