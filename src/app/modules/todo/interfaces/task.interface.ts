export interface Task {
  id:          number;
  title:       string;
  description: string;
  completed:   boolean;
  date:        Date | null;
  user_id:     number;
  created_at:  Date;
  updated_at:  Date;
}
