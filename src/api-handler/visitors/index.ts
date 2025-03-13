import axios from "axios";

export const fetchVisitors = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/visitors`
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: (error as any).message,
    };
  }
};
