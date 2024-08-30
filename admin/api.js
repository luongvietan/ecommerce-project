import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Địa chỉ backend
});
const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error); // In ra thông tin lỗi
    throw error; // Ném lại lỗi để xử lý ở nơi khác nếu cần
  }
};
export default api;
