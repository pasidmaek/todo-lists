export type TaskType = {
  id?: number;
  title: string;
  description: string;
  due: Date | null;
  isComplete: boolean;
}