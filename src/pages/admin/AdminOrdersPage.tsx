import { useEffect, useState } from 'react';
import {
  Search,
  Loader2,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ShoppingCart
} from 'lucide-react';
import { api } from '@/services/api';
import type { Order, OrderStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const statusOptions: { value: OrderStatus; label: string; icon: typeof Clock; color: string }[] = [
  { value: 'PENDING', label: 'Pending', icon: Clock, color: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20' },
  { value: 'PROCESSING', label: 'Processing', icon: Package, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  { value: 'SHIPPED', label: 'Shipped', icon: Truck, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  { value: 'DELIVERED', label: 'Delivered', icon: CheckCircle, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  { value: 'CANCELLED', label: 'Cancelled', icon: XCircle, color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
];

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<Map<string, { name: string | null; email: string }>>(new Map());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const [ordersData, usersData] = await Promise.all([
        api.orders.getAll(),
        api.users.getAll(),
      ]);

      const userMap = new Map();
      usersData.forEach(user => {
        userMap.set(user.id, { name: user.name, email: user.email });
      });
      setUsers(userMap);

      const sortedOrders = [...ordersData].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    try {
      await api.orders.updateStatus(orderId, newStatus);
      toast.success(`Order status updated to ${statusOptions.find(s => s.value === newStatus)?.label}`);
      loadOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setOpenDropdown(null);
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
      users.get(order.userId)?.email.toLowerCase().includes(search.toLowerCase()) ||
      users.get(order.userId)?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1">Manage and track customer orders</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={statusFilter === 'ALL' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('ALL')}
          >
            All
          </Button>
          {statusOptions.map(({ value, label }) => (
            <Button
              key={value}
              variant={statusFilter === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mb-3 opacity-50" />
              <p>No orders found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map(order => {
                const user = users.get(order.userId);
                const statusInfo = statusOptions.find(s => s.value === order.status);
                const StatusIcon = statusInfo?.icon || Clock;

                return (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/20 transition-colors"
                  >
                    <div className="flex-1 grid gap-2 sm:grid-cols-2 md:grid-cols-4 flex-1">
                      <div>
                        <p className="text-xs text-muted-foreground">Order ID</p>
                        <p className="font-mono text-sm font-medium">#{order.id.slice(-8).toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Customer</p>
                        <p className="font-medium text-sm">{user?.name || 'Guest'}</p>
                        <p className="text-xs text-muted-foreground">{user?.email || 'No email'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Items</p>
                        <Badge variant="secondary">{order.items?.length || 0} items</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="font-mono font-bold">${Number(order.totalAmount).toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                      <div className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border',
                        statusInfo?.color
                      )}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusInfo?.label || order.status}
                      </div>

                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground hidden sm:block">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>

                        <Select
                          value={order.status}
                          onValueChange={(value: OrderStatus) => updateOrderStatus(order.id, value)}
                          open={openDropdown === order.id}
                          onOpenChange={(open: boolean) => setOpenDropdown(open ? order.id : null)}
                        >
                          <SelectTrigger className="w-[140px] h-8 text-xs">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map(({ value, label, icon: StatusIconOption }) => (
                              <SelectItem
                                key={value}
                                value={value}
                                disabled={order.status === value}
                                className="cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <StatusIconOption className="w-4 h-4" />
                                  {label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
