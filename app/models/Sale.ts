export interface Sale {
  id: number;
  username: string;
  total_amount: number;
  branch: string;
  sale_date: Date;
}

export interface SaleItem {
  product_name: "";
  quantity: number;
  price: number;
}
