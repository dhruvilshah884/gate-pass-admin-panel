import axios from 'axios'

export const fetchVisitors = async () => {
  try {
    const response = await axios.get('/api/visitor')
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
