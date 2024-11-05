export interface Payment {
  branch: string;
  id: number;
  amount: number;
  session_id: number;
  payment_date: Date;
  username: string;
  description: string;
}
