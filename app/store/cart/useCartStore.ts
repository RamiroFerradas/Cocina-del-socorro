import { create } from "zustand";
import { SaleItem } from "@/app/models/Sale";

interface CartStore {
  cartItems: SaleItem[];
  addToCart: (product: SaleItem) => void;
  removeFromCart: (product: SaleItem) => void;
  updateQuantity: (product: SaleItem, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.product_id === product.product_id
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product_id === product.product_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cartItems: [
          ...state.cartItems,
          {
            product_id: product.product_id,
            product_name: product.product_name,
            quantity: 1,
            price: product.price,
          },
        ],
      };
    }),

  removeFromCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.product_id === product.product_id
      );
      if (existingItem && existingItem.quantity > 1) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product_id === product.product_id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
      return {
        cartItems: state.cartItems.filter(
          (item) => item.product_id !== product.product_id
        ),
      };
    }),

  updateQuantity: (product, quantity) =>
    set((state) => {
      if (quantity > 0) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product_id === product.product_id
              ? { ...item, quantity }
              : item
          ),
        };
      }
      return state;
    }),

  clearCart: () => set({ cartItems: [] }),

  calculateTotal: (): number => {
    return parseFloat(
      get()
        .cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
        .toFixed(2)
    );
  },
}));
