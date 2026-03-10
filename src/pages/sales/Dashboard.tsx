import { Outlet, useNavigate } from 'react-router-dom';
import SalesSidebar from './Sidebar';
import ThemeToggle from '../../components/ThemeToggle';
import { useSidebar } from '../../context/SidebarContext';

function SalesLayoutContent() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useSidebar();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-black overflow-hidden font-display text-slate-900 dark:text-slate-100 transition-colors relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={closeMobileMenu}
        />
      )}

      <SalesSidebar />

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile Top Header */}
        <header className="lg:hidden h-16 bg-white dark:bg-[#111] border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-4 shrink-0 z-10 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 dark:bg-white p-1 rounded-lg w-8 h-8 flex items-center justify-center shrink-0">
              <img src="/japfa-logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight font-sans">
              <span className="text-slate-900 dark:text-white">TMS </span>
              <span className="text-primary">Japfa</span>
            </span>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto border-t border-slate-200 dark:border-white/5 lg:border-t-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default function SalesDashboardLayout() {
  return <SalesLayoutContent />;
}

// Temporary placeholder for the exact /sales Dashboard
export function SalesHome() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-black transition-colors">
      <header className="h-16 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#111111] flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-colors">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Admin Sales Portal</h2>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">Admin Sales Portal</h1>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto text-sm md:text-base">Selamat datang di portal Admin Sales. Silakan pilih menu di sidebar perpindahan pesanan, melacak pengiriman, atau konfirmasi penagihan.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div
              onClick={() => navigate('/sales/order-entry')}
              className="cursor-pointer bg-white dark:bg-[#111111] p-6 rounded-xl shadow-sm border border-slate-200 dark:border-white/5 text-center w-full sm:w-48 hover:border-primary/50 dark:hover:border-primary/50 transition-colors"
            >
              <span className="material-symbols-outlined text-4xl text-primary mb-2">order_approve</span>
              <p className="font-bold dark:text-white text-sm md:text-base">Kelola Pesanan</p>
            </div>
            <div
              onClick={() => navigate('/sales/visibility')}
              className="cursor-pointer bg-white dark:bg-[#111111] p-6 rounded-xl shadow-sm border border-slate-200 dark:border-white/5 text-center w-full sm:w-48 hover:border-primary/50 dark:hover:border-primary/50 transition-colors"
            >
              <span className="material-symbols-outlined text-4xl text-primary mb-2">visibility</span>
              <p className="font-bold dark:text-white text-sm md:text-base">Lacak Pesanan</p>
            </div>
            <div
              onClick={() => navigate('/sales/billing')}
              className="cursor-pointer bg-white dark:bg-[#111111] p-6 rounded-xl shadow-sm border border-slate-200 dark:border-white/5 text-center w-full sm:w-48 hover:border-primary/50 dark:hover:border-primary/50 transition-colors"
            >
              <span className="material-symbols-outlined text-4xl text-primary mb-2">receipt_long</span>
              <p className="font-bold dark:text-white text-sm md:text-base">Penagihan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
