export interface Auth {
  message:      string;
  user:         User;
  access_token: string;
}

export interface User {
  id:                number;
  name:              string;
  email:             string;
  email_verified_at: string | null;
  created_at:        Date;
  updated_at:        Date;
}
