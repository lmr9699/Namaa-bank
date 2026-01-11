interface AmountType {
  _id?: string;
  title: string;
  topic: string[];
  body: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export { AmountType };
