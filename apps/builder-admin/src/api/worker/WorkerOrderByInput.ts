import { SortOrder } from "../../util/SortOrder";

export type WorkerOrderByInput = {
  assignedTasks?: SortOrder;
  contactInformation?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  name?: SortOrder;
  role?: SortOrder;
  updatedAt?: SortOrder;
};
