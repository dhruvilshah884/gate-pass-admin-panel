import axios from "axios";

export interface IWifi {
    pageSize?: number
    page?: number
    q?: string
}

export const fetchWifi = async (params: IWifi) => {
    try {
        const response = await axios.get('/api/wifi', {
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