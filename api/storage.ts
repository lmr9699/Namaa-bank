import * as SecureStore from "expo-secure-store";

const setToken = async (token: string) => {
  await SecureStore.setItemAsync("token", token);
};

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  console.log("Token:", token);
  return token;
};

const deleteToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

export { deleteToken, getToken, setToken };
