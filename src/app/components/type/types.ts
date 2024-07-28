// types.ts
export interface Description {
  id: string;
  text: string;
}

export interface Task {
  taskNum: number;
  id: string;
  name: string;
  descriptions: Description[];
  description: string;
  taskStartdate?: Date | null;
  taskenddate?: Date | null;
  shortDescription?: string;
  comment?: string;
  priority?: string;
  reminder?: string;
  fromUser?: string;
  assignToUser?: string[];
  attachment?: any[];
}
