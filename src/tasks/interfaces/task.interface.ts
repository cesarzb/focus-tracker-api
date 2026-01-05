export interface Task {
  id: number;
  title: string;
  optionalDescription: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}
