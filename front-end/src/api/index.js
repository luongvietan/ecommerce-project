const API_BASE_URL = "http://localhost:5000"; // Địa chỉ của back-end

export const fetchData = async () => {
  const response = await fetch(`${API_BASE_URL}/api/data`);
  return response.json();
};

// Các hàm API khác...
