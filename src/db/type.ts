export enum TodoStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

export interface TodoItem {
  id: string;
  title: string;
  status: TodoStatus;
}

export interface TodoItemDetails extends TodoItem {
  id: string,
  _id?: string,
  assignee: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}