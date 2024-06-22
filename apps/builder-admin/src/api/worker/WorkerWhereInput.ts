import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type WorkerWhereInput = {
  assignedTasks?: StringNullableFilter;
  contactInformation?: StringNullableFilter;
  id?: StringFilter;
  name?: StringNullableFilter;
  role?: StringNullableFilter;
};
