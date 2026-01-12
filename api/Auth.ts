import UserInfo from "@/types/UserInfo";
import instance from ".";

const login = async (userInfo: UserInfo) => {
  const { data } = await instance.post("/api/auth/login", userInfo);
  return data;
};

const register = async (userInfo: UserInfo) => {
  const formData = new FormData();
  formData.append("username", userInfo.username);
  formData.append("password", userInfo.password);
  formData.append("name", userInfo.name || "");
  if (userInfo.image) {
    formData.append("image", {
      uri: userInfo.image,
      name: "image.jpeg",
      type: "image/jpeg",
    } as any);
  }
  const { data } = await instance.post("/api/auth/register", formData);
  return data;
};

const me = async () => {
  const { data } = await instance.get("/api/auth/me");
  return data;
};

// const getAllUsers = async () => {
//   try {
//     const { data } = await instance.get("/api/users");
//     console.log("getAllUsers success:", data);
//     return data;
//   } catch (error: any) {
//     console.log(
//       "getAllUsers error:",
//       error.response?.status,
//       error.response?.data
//     );
//     throw error;
//   }
// };
const getAllUsers = async () => {
  const { data } = await instance.get("/api/users");
  return data;
};

const transactions = async () => {
  const { data } = await instance.get("/api/transactions/my");
  return data;
};

const getUserById = async () => {
  const { data } = await instance.get("/api/auth/users/:userId");
  return data;
};

export { getAllUsers, getUserById, login, me, register, transactions };
