export enum TodoStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

// export interface TodoItem {
//   id: string;
//   title: string;
//   status: TodoStatus;
// }

// export interface TodoItemDetails extends TodoItem {
//   id: string,
//   _id?: string,
//   assignee: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

export enum IssueStatus {
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  TODO = "TODO"
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  HIGHEST = 'HIGHEST',
}
export interface InputToDoItem {
  project: string,
  name: string,
  label: string,
  tag?: string,
  status?: IssueStatus,
  description: string,
  priority: Priority,
  title: string,
  assignee?: string[],
}

export interface TodoItemDetails extends InputToDoItem {
  id: string,
}