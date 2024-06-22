export type TransactionCreateInput = {
  amount?: number | null;
  associatedProject?: string | null;
  date?: Date | null;
  transactionType?: "Option1" | null;
};
