import axios from "axios"

export const fetchDashboard = async () => {
    try {
      const response = await axios.get(`api/dashboard`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
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