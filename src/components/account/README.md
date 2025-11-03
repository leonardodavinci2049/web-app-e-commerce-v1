# Account Dashboard Components

Components for the customer account area (`/account` route).

## 📁 Structure

```
src/components/account/
├── account-header.tsx         # Header for account area
├── account-info.tsx           # Customer account information card
├── account-sidebar.tsx        # Desktop sidebar navigation
├── account-mobile-menu.tsx    # Mobile drawer menu
├── dashboard-stats.tsx        # Key metrics cards (orders, items, totals)
├── quick-actions.tsx          # Quick action buttons grid
├── recent-orders.tsx          # Recent orders list
├── sales-consultant-card.tsx  # Sales consultant contact card
└── README.md                  # This file
```

## 🎯 Components Overview

### AccountHeader
Header component with navigation, cart, and theme toggle.
- **Type**: Client Component (uses state for mobile menu)
- **Features**:
  - Customer name display
  - Navigation menu (responsive)
  - Cart with total
  - Theme toggle
  - Mobile menu button
  - Integrated mobile drawer

### AccountSidebar
Desktop sidebar navigation menu.
- **Type**: Client Component (uses usePathname)
- **Features**:
  - Fixed sidebar for desktop (hidden on mobile)
  - Active route highlighting
  - Icon-based navigation
  - Sticky positioning
  - 6 menu items

### AccountMobileMenu
Mobile drawer navigation menu.
- **Type**: Client Component
- **Props**: `isOpen: boolean`, `onClose: () => void`
- **Features**:
  - Slide-in drawer from left
  - Backdrop overlay
  - Active route highlighting
  - Icon-based navigation
  - Close button
  - Auto-close on navigation

### AccountInfo
Displays customer account information and status.
- **Type**: Server Component
- **Props**: `customer: Customer`
- **Features**:
  - Customer avatar (placeholder)
  - Account status badge
  - Contact information
  - Member since date

### DashboardStats
Grid of key metrics cards.
- **Type**: Server Component
- **Props**: `stats: DashboardStat[]`
- **Features**:
  - Responsive grid (1-4 columns)
  - Icon with color coding
  - Value and description
  - Hover effects

### RecentOrders
List of recent customer orders.
- **Type**: Server Component
- **Props**: `orders: Order[]`
- **Features**:
  - Order status badges
  - Date and item count
  - Total amount
  - View order button
  - Delivery date (when available)

### QuickActions
Grid of quick action buttons.
- **Type**: Server Component
- **Props**: `actions: QuickAction[]`
- **Features**:
  - Responsive grid
  - Icon with color coding
  - Link to action pages
  - Hover effects

### SalesConsultantCard
Sales consultant contact information and actions.
- **Type**: Client Component
- **Props**: `consultant: SalesConsultant`
- **Features**:
  - Consultant availability status
  - Contact information
  - WhatsApp button
  - Email button
  - Interactive actions

## 📊 Mock Data

Mock data is available in `src/lib/account-data.ts`:
- `mockCustomer` - Customer information
- `mockDashboardStats` - Dashboard statistics
- `mockRecentOrders` - Recent orders list
- `mockQuickActions` - Quick action buttons
- `mockSalesConsultant` - Sales consultant info

## 🎨 Design Patterns

### Layout
- Mobile-first responsive design
- Sidebar layout for desktop (left sidebar + main content)
- Drawer menu for mobile (hamburger button)
- 3-column content grid on desktop (2/3 + 1/3)
- Full-width on mobile
- Consistent spacing and padding

### Colors
- Primary: Main brand color
- Success: Green for completed/approved
- Warning: Orange for pending
- Info: Blue for information banners

### Typography
- Headings: Bold, clear hierarchy
- Body: Readable, consistent sizing
- Labels: Muted foreground color

### Components
- Cards with border and rounded corners
- Hover effects for interactive elements
- Status badges with color coding
- Icons from Lucide React

## 🌐 Theme Support

All components support light and dark themes via Tailwind CSS classes:
- `dark:` prefix for dark theme styles
- Color variables from `globals.css`
- Automatic theme switching via `next-themes`

## 📱 Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Horizontal scroll for navigation (removed)
- Hamburger menu opens drawer
- Stacked cards
- Full-width buttons
- Hidden sidebar

### Tablet (640px - 1024px)
- 2-column grid for stats
- 2-column grid for actions
- Side-by-side layout for some sections
- Hidden sidebar
- Hamburger menu

### Desktop (> 1024px)
- Fixed left sidebar (256px width)
- 4-column grid for stats
- 3-column grid for actions
- Main content with sidebar layout
- No hamburger menu

## 🔄 Future Enhancements

Potential improvements for production:
1. Real authentication with BetterAuth
2. Database integration with Prisma
3. Real-time order updates
4. Order filtering and search
5. Export orders functionality
6. Notification system
7. Customer preferences
8. Wishlist integration
9. Loyalty program display
10. Invoice downloads

## 📝 Usage Example

```tsx
import AccountHeader from "@/components/account/account-header";
import DashboardStats from "@/components/account/dashboard-stats";
import { mockDashboardStats } from "@/lib/account-data";

export default function AccountPage() {
  return (
    <>
      <AccountHeader />
      <main className="container mx-auto px-4 py-6">
        <DashboardStats stats={mockDashboardStats} />
      </main>
    </>
  );
}
```

## 🎯 Key Features

- ✅ Mobile-first responsive design
- ✅ Dark/Light theme support
- ✅ Server Components by default
- ✅ Client Components only when needed
- ✅ TypeScript with strict types
- ✅ Mock data for demonstration
- ✅ Consistent styling patterns
- ✅ Accessible components
- ✅ SEO-friendly structure
- ✅ Performance optimized
