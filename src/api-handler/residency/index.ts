import axios from 'axios'

export const fetchResidencies = async () => {
  try {
    const response = await axios.get(`api/residance`)
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
