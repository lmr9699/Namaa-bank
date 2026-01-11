import instance from ".";

const getAllAmount = async () => {
  const { data } = await instance.get("api/transactions");
  return data;
};

const getAmount = async (amountId: string) => {
  const { data } = await instance.get(`api/transactions/${amountId}`);
  return data;
};

const createAmount = async (amountInfo: string) => {
  const { data } = await instance.post("api/transactions", amountInfo);
  return data;
};

const updateAmount = async (amountInfo: any) => {
  const { data } = await instance.put(
    `api/transactions/${amountInfo._id}`,
    amountInfo
  );
  return data;
};

export { createAmount, getAllAmount, getAmount, updateAmount };
