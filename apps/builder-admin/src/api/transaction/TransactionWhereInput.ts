import { FloatNullableFilter } from "../../util/FloatNullableFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type TransactionWhereInput = {
  amount?: FloatNullableFilter;
  associatedProject?: StringNullableFilter;
  date?: DateTimeNullableFilter;
  id?: StringFilter;
  transactionType?: "Option1";
};
