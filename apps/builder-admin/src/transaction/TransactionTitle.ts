import { Transaction as TTransaction } from "../api/transaction/Transaction";

export const TRANSACTION_TITLE_FIELD = "associatedProject";

export const TransactionTitle = (record: TTransaction): string => {
  return record.associatedProject?.toString() || String(record.id);
};
