import axios from 'axios'

export const fetchSecurity = async () => {
  try {
    const response = await axios.get(`/api/security`)
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

export const postSecurity = async (id: string) => {
  try {
    const response = await axios.post(`/api/security/signup`)
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
    const response = await axios.delete(`/api/security/${id}`)
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
