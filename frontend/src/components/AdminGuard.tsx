import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useCart } from '../context/cart-core';
import { Loader2 } from 'lucide-react';

export function AdminGuard() {
  const { user } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <Outlet />;
}
