import axiosInstance from "../components/common/AxiosInstance"; // ✅ now using the variable

export const registerUser = (data) => axiosInstance.post("/users/register", data);
export const loginUser = (data) => axiosInstance.post("/users/login", data);
