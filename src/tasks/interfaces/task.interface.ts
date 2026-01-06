export interface Task {
  id: string;
  title: string;
  optionalDescription: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}
