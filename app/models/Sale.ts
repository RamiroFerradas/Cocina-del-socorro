export interface Sale {
  id: number;
  username: string;
  total_amount: number;
  branch: string;
  sale_date: Date;
  sale_items: SaleItem[];
}

export interface SaleItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}
