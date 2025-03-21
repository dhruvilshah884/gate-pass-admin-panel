import axios from "axios";

export const fetchWifi = async () => {
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