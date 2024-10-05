export interface Sale {
  id: number;
  username: string;
  total_amount: number;
  branch: string;
  sale_date: Date;
}

export interface SaleItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}
