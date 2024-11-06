export interface Session {
  active: boolean;
  session_created: string;
  opening_balance: number;
  total_balance: number;
  branch: string;
  session_ended: string | null;
  id: number;
  username: string;
  final_balance: number;
}
export type NewSession = {
  opening_balance: number;
};
