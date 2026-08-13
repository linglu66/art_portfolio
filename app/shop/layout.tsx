import { CartProvider } from "@/components/cart-context"
import CartDrawer from "@/components/cart-drawer"

// Scoped to /shop so the cart state and floating button only exist where they
// are useful, leaving the global layout untouched.
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  )
}
