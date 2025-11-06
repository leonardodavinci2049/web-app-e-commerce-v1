/**
 * Cart Page README
 * Documentation for cart components
 * 
 * ## Components Structure
 * 
 * ### Client Components
 * - `cart-header.tsx` - Simple header with logo and back button
 * - `cart-items-list.tsx` - List wrapper for cart items
 * - `cart-summary.tsx` - Order summary with totals
 * - `cart-info-banner.tsx` - Informational banners
 * - `empty-cart.tsx` - Empty state display
 * - `cart-item-card.tsx` - Individual cart item with quantity controls
 * - `cart-coupon.tsx` - Coupon code input and application
 * - `continue-shopping-button.tsx` - Navigation button
 * - `cart-sidebar.tsx` - Right sidebar with cart summary (opens from mini cart)
 * 
 * ## Cart Sidebar Component
 * 
 * The `cart-sidebar.tsx` is a Sheet component that displays a quick cart summary.
 * 
 * ### Features:
 * - Opens when clicking mini cart icon in headers
 * - Displays all cart items with image, name, SKU
 * - Quantity controls (+/-) with stock validation
 * - Remove item functionality
 * - Shows subtotal, shipping, and total
 * - Installment options
 * - Two action buttons: "Ver Carrinho" and "Finalizar Compra"
 * - Free shipping indicator (R$ 299 threshold)
 * - Empty state with illustration
 * - Responsive: 75% width on mobile, fixed width on desktop
 * 
 * ### Usage:
 * ```tsx
 * import CartSidebar from "@/components/cart/cart-sidebar";
 * 
 * // Default trigger (shopping cart icon with badge)
 * <CartSidebar />
 * 
 * // Custom trigger
 * <CartSidebar trigger={<button>Custom Button</button>} />
 * ```
 * 
 * ### Implementation Locations:
 * - `main-header.tsx` - Desktop header
 * - `mobile-bottom-nav.tsx` - Mobile bottom navigation
 * 
 * ## Features
 * 
 * - ✅ Responsive design (mobile-first)
 * - ✅ Dark/Light theme support
 * - ✅ Quantity controls with stock validation
 * - ✅ Price calculation (subtotal, shipping, discount, total)
 * - ✅ Coupon/discount code system
 * - ✅ Free shipping threshold display
 * - ✅ Installment calculation
 * - ✅ Delivery information
 * - ✅ Empty cart state
 * - ✅ Stock warnings
 * - ✅ Product images with fallback
 * - ✅ Link back to product page
 * - ✅ CartProvider com persistência em `localStorage`
 * 
 * ## Mock Data
 * 
 * Cart data is defined in `/src/lib/cart-data.ts`:
 * - `mockCartItems` - Sample cart items (apenas para prototipação)
 * - `calculateCartSummary()` - Calculate totals
 * - `deliveryInfo` - Delivery estimates
 * - `availableCoupons` - Demo coupons
 * 
 * ## Future Enhancements
 * 
 * - [ ] Integração com backend para sincronizar carrinho autenticado
 * - [ ] Add wishlist functionality
 * - [ ] Implement real coupon validation
 * - [ ] Add shipping calculator by ZIP code
 * - [ ] Product recommendations
 * - [ ] Recently viewed products
 * - [ ] Save cart for later
 * - [ ] Share cart functionality
 */
