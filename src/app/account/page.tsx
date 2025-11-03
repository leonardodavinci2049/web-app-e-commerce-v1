/**
 * Account Dashboard Page
 * Main page for customer account area with stats, orders, and quick actions
 */

import AccountHeader from "@/components/account/account-header";
import AccountInfo from "@/components/account/account-info";
import AccountSidebar from "@/components/account/account-sidebar";
import DashboardStats from "@/components/account/dashboard-stats";
import QuickActions from "@/components/account/quick-actions";
import RecentOrders from "@/components/account/recent-orders";
import SalesConsultantCard from "@/components/account/sales-consultant-card";
import Footer from "@/components/home/footer";
import {
  mockCustomer,
  mockDashboardStats,
  mockQuickActions,
  mockRecentOrders,
  mockSalesConsultant,
} from "@/data/account-data";

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <AccountHeader />

      {/* Main Layout with Sidebar */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <AccountSidebar />

        {/* Main Content */}
        <main className="flex-1 container mx-auto max-w-7xl px-4 py-6 md:py-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Olá, {mockCustomer.name}! Acompanhe seus pedidos e estatísticas de
              compras
            </p>
          </div>

          {/* Dashboard Stats */}
          <div className="mb-6">
            <DashboardStats stats={mockDashboardStats} />
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Recent Orders + Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              <RecentOrders orders={mockRecentOrders} />
              <QuickActions actions={mockQuickActions} />
            </div>

            {/* Right Column - Account Info + Sales Consultant */}
            <div className="space-y-6">
              <AccountInfo customer={mockCustomer} />
              <SalesConsultantCard consultant={mockSalesConsultant} />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
