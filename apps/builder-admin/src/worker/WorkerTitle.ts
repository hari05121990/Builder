import { Worker as TWorker } from "../api/worker/Worker";

export const WORKER_TITLE_FIELD = "name";

export const WorkerTitle = (record: TWorker): string => {
  return record.name?.toString() || String(record.id);
};
