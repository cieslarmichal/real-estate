import { backendUrl } from "../constants/api";

export const getLatestListings = async (page = 1, pageSize = 10, type = "sprzedaż") => {
  try {
    const response = await fetch(`${backendUrl}/api/v1/listings?page=${page}&pageSize=${pageSize}&type=${encodeURIComponent(type)}`);

    if (!response.ok) {
      throw new Error('Error while fetching latest listings');
    }
  
    const jsonResponse = await response.json();
  
    return jsonResponse.data;
  }catch (error) {
    console.error(error);

    return [];
  }
}
