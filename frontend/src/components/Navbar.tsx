import { ShoppingCart, Package, Home, User as UserIcon, LogOut } from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useCart } from '../context/cart-core';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

export function Navbar() {
  const location = useLocation();
  const { count, user, logout } = useCart();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: count() },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t md:top-0 md:bottom-auto z-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-primary">
              ShopEase
            </Link>
            <div className="flex items-center gap-1 md:gap-4">
              {navItems.map(({ path, icon: Icon, label, badge }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                    'hover:bg-accent',
                    location.pathname === path && 'bg-accent text-accent-foreground'
                  )}
                >
                  <Icon size={20} />
                  <span className="hidden md:inline">{label}</span>
                  {badge !== undefined && badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </Link>
              ))}
              {user ? (
                <div className="flex items-center gap-2 ml-2">
                  <Link
                    to="/admin"
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-accent',
                      location.pathname.startsWith('/admin') && 'bg-accent text-accent-foreground'
                    )}
                  >
                    <UserIcon size={20} />
                    <span className="hidden md:inline text-sm">{user.name || user.email}</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut size={18} />
                  </Button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-accent',
                    location.pathname === '/login' && 'bg-accent text-accent-foreground'
                  )}
                >
                  <UserIcon size={20} />
                  <span className="hidden md:inline">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="md:pt-16 md:pb-0 pb-16 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
