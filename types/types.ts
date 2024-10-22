export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: 'GENERAL' | 'WORK' | 'PERSONAL';
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}
