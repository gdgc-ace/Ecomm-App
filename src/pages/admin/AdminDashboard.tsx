import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  ArrowRight,
  Clock
} from 'lucide-react';
import { api } from '@/services/api';
import type { Product, Order } from '@/types';
import { cn } from '@/lib/utils';

interface Stats {
  products: number;
  orders: number;
  users: number;
  revenue: number;
}

interface RecentOrderData {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  user?: { name: string | null; email: string };
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState<RecentOrderData[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [products, orders, users] = await Promise.all([
          api.products.getAll(),
          api.orders.getAll(),
          api.users.getAll(),
        ]);

        const revenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);

        setStats({
          products: products.length,
          orders: orders.length,
          users: users.length,
          revenue,
        });

        const sortedOrders = [...orders].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ).slice(0, 5);

        setRecentOrders(sortedOrders.map((order: Order) => ({
          id: order.id,
          userId: order.userId,
          status: order.status,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          user: users.find(u => u.id === order.userId) || undefined,
        })));

        const lowStock = products.filter(p => p.stock < 10).slice(0, 5);
        setLowStockProducts(lowStock);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted/30 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Total Users', value: stats.users, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Total Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your store performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className={cn('absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-transform group-hover:scale-110', bg)}>
              <Icon className={cn('w-12 h-12 -mt-2 -mr-2', color)} />
            </div>
            <div className="relative">
              <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4', bg)}>
                <Icon className={cn('w-6 h-6', color)} />
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{label}</p>
              <p className="text-3xl font-bold mt-1 tabular-nums">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              Recent Orders
            </h2>
            <Link 
              to="/admin/orders" 
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No orders yet</p>
            ) : (
              recentOrders.map(order => (
                <div 
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">#{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.user?.name || order.user?.email || 'Guest'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold tabular-nums">${Number(order.totalAmount).toFixed(2)}</p>
                    <span className={cn(
                      'text-xs px-2 py-0.5 rounded-full',
                      order.status === 'DELIVERED' && 'bg-green-500/10 text-green-600 dark:text-green-400',
                      order.status === 'SHIPPED' && 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                      order.status === 'PROCESSING' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                      order.status === 'PENDING' && 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
                      order.status === 'CANCELLED' && 'bg-red-500/10 text-red-600 dark:text-red-400'
                    )}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              Low Stock Alert
            </h2>
            <Link 
              to="/admin/products" 
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Manage <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {lowStockProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-muted-foreground">All products are well stocked</p>
              </div>
            ) : (
              lowStockProducts.map(product => (
                <div 
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20 hover:bg-destructive/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm truncate max-w-[200px]">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category || 'Uncategorized'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      'font-bold tabular-nums',
                      product.stock === 0 ? 'text-red-500' : product.stock < 5 ? 'text-amber-500' : 'text-muted-foreground'
                    )}>
                      {product.stock} left
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}