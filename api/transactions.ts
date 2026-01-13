import instance from ".";

const getAllAmount = async () => {
  const { data } = await instance.get("api/transactions");
  return data;
};

const getAmount = async (amount: string) => {
  const { data } = await instance.get(`api/transactions/my${amount}`);
  return data;
};

const sendAmount = async (amount: string, toUserId: string) => {
  const { data } = await instance.post("api/transactions/transfer", {
    amount: amount,
    toUserId: toUserId,
  });
  return data;
};

const withdrawAmount = async (amountInfo: any) => {
  const { data } = await instance.post(
    `api/transactins/withdraw${amountInfo._id}`,
    amountInfo
  );
  return data;
};

const updateAmount = async (amountInfo: any) => {
  const { data } = await instance.put(
    `api/transactions/my${amountInfo._id}`,
    amountInfo
  );
  return data;
};

export { getAllAmount, getAmount, sendAmount, updateAmount, withdrawAmount };
