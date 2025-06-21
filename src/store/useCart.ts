import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface CartItem {
  id: string
  name: string
  description: string      // <-- agrega esto
  price: number
  imageUrl: string         // <-- y esto
  quantity: number
  stock: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getTotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === item.id)

        if (existingItem) {
          const newQuantity = Math.min(existingItem.quantity + 1, item.stock)
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: newQuantity } : i
            ),
          })
        } else {
          set({ items: [...currentItems, { ...item, quantity: 1 }] })
        }
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.stock) }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
