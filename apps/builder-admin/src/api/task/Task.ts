export type Task = {
  createdAt: Date;
  deadline: Date | null;
  description: string | null;
  id: string;
  name: string | null;
  status?: "Option1" | null;
  updatedAt: Date;
};
