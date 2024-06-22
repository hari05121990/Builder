export type Transaction = {
  amount: number | null;
  associatedProject: string | null;
  createdAt: Date;
  date: Date | null;
  id: string;
  transactionType?: "Option1" | null;
  updatedAt: Date;
};
