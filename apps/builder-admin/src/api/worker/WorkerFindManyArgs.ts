import { WorkerWhereInput } from "./WorkerWhereInput";
import { WorkerOrderByInput } from "./WorkerOrderByInput";

export type WorkerFindManyArgs = {
  where?: WorkerWhereInput;
  orderBy?: Array<WorkerOrderByInput>;
  skip?: number;
  take?: number;
};
