import axios from 'axios'

export const adminLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(`/api/admin/login`, { email, password })
      return {
        success: true,
        data: response.data
      }
    } catch (error:any) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message
      }
    }
  }
  
