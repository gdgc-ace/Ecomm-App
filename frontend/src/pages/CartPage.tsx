import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart-core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '../services/api';
import { toast } from 'sonner';

import { Trash2, Minus, Plus, ShoppingCart, CreditCard, Lock, CheckCircle, Shield, Sparkles, ArrowRight, User } from 'lucide-react';

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  email: string;
}

export function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart, user } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'cart' | 'payment' | 'processing' | 'success'>('cart');
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
  });
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex' | 'unknown'>('unknown');

  const navigate = useNavigate();

  const detectCardType = (number: string) => {
    const clean = number.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (clean.startsWith('5')) return 'mastercard';
    if (clean.startsWith('3')) return 'amex';
    return 'unknown';
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const cardNumDetect = detectCardType(v);
    setCardType(cardNumDetect);
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }
    setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const validatePayment = () => {
    const cleanCard = paymentData.cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 13 || cleanCard.length > 19) {
      toast.error('Please enter a valid card number');
      return false;
    }
    if (!paymentData.expiryDate || paymentData.expiryDate.length !== 5) {
      toast.error('Please enter a valid expiry date');
      return false;
    }
    const [month, year] = paymentData.expiryDate.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    if (expiry < new Date()) {
      toast.error('Card has expired');
      return false;
    }
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return false;
    }
    if (!paymentData.cardholderName) {
      toast.error('Please enter the cardholder name');
      return false;
    }
    if (!paymentData.email || !paymentData.email.includes('@')) {
      toast.error('Please enter a valid email');
      return false;
    }
    return true;
  };

  const generateTestCard = () => {
    const prefixes = ['4', '5', '37'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const remainingLength = prefix === '37' ? 14 : 15;
    let cardNumber = prefix;
    for (let i = 0; i < remainingLength; i++) {
      cardNumber += Math.floor(Math.random() * 10);
    }
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const year = String(Math.floor(Math.random() * 5) + 26);
    setPaymentData({
      cardNumber: formatCardNumber(cardNumber),
      expiryDate: formatExpiryDate(month + year),
      cvv: String(Math.floor(Math.random() * 900) + 100),
      cardholderName: 'Test User',
      email: 'test@example.com',
    });
    toast.success('Test card generated');
  };

  const processTestPayment = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    const lastFour = paymentData.cardNumber.replace(/\s/g, '').slice(-4);
    toast.success(`Payment of $${total().toFixed(2)} approved •••• ${lastFour}`);
    return true;
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please log in to complete your purchase');
      navigate('/login?redirect=/cart');
      return;
    }
    if (items.length === 0) return;
    setPaymentStep('payment');
    setShowPayment(true);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePayment()) return;

    setPaymentStep('processing');

    try {
      const paymentSuccess = await processTestPayment();
      if (paymentSuccess) {
        const userId = 'demo-user-' + Date.now();
        await api.orders.create({
          userId,
          items: items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        });
        setPaymentStep('success');
        clearCart();
        setTimeout(() => {
          setShowPayment(false);
          setPaymentStep('cart');
          navigate('/');
          toast.success('Order placed successfully!');
        }, 2500);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Payment failed. Please try again.');
      setPaymentStep('payment');
    }
  };

  if (items.length === 0 && !showPayment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center animate-pulse">
            <ShoppingCart size={48} className="text-zinc-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-zinc-700 to-zinc-500 dark:from-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            Your cart is empty
          </h2>
          <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
            Discover our curated collection of premium products and start shopping today.
          </p>
          <Link to="/products">
            <Button size="lg" className="rounded-full px-8 group">
              Browse Products
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {paymentStep === 'success' && (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-[bounce_1s_ease-out]">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
                <p className="text-zinc-400 mb-4">Your order has been placed successfully.</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-zinc-300">Order confirmation sent to {paymentData.email}</span>
                </div>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-zinc-700/50 shadow-2xl">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping" />
                    <div className="relative w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Processing Payment</h2>
                <p className="text-zinc-400 text-sm">Please wait while we process your transaction...</p>
                <div className="mt-6 flex justify-center gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-emerald-500 animate-[bounce_1s_ease-in-out_infinite]"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {paymentStep === 'payment' && (
              <Card className="bg-zinc-900/80 backdrop-blur-xl border-zinc-800/50 shadow-2xl shadow-black/50">
                <CardHeader className="border-b border-zinc-800/50 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        Secure Checkout
                      </CardTitle>
                      <CardDescription className="text-zinc-400">Complete your purchase securely</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50">
                      <Lock className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs text-zinc-400">SSL Encrypted</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/30">
                    <div className="flex justify-between text-sm text-zinc-400 mb-2">
                      <span>Subtotal</span>
                      <span>${total().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-400 mb-3">
                      <span>Items</span>
                      <span>{items.reduce((sum, i) => sum + i.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-white pt-3 border-t border-zinc-700/50">
                      <span>Total</span>
                      <span className="text-emerald-400">${total().toFixed(2)}</span>
                    </div>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <Label className="text-zinc-300 text-sm">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={paymentData.email}
                        onChange={handlePaymentChange}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-zinc-300 text-sm">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        name="cardholderName"
                        placeholder="John Doe"
                        value={paymentData.cardholderName}
                        onChange={handlePaymentChange}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-zinc-300 text-sm">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={handlePaymentChange}
                          maxLength={cardType === 'amex' ? 20 : 19}
                          className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:ring-emerald-500/20 pr-20"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          {cardType === 'visa' && (
                            <span className="text-xs font-bold text-blue-400">VISA</span>
                          )}
                          {cardType === 'mastercard' && (
                            <span className="text-xs font-bold text-orange-400">MC</span>
                          )}
                          {cardType === 'amex' && (
                            <span className="text-xs font-bold text-blue-600">AMEX</span>
                          )}
                          <CreditCard className="w-4 h-4 text-zinc-500" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-zinc-300 text-sm">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          maxLength={5}
                          className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-zinc-300 text-sm flex items-center gap-1">
                          CVV
                          <span className="text-zinc-500 text-xs">(?)</span>
                        </Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          type="password"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          maxLength={4}
                          className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/50"
                        onClick={() => setShowPayment(false)}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-0 shadow-lg shadow-emerald-500/20"
                      >
                        Pay ${total().toFixed(2)}
                      </Button>
                    </div>
                  </form>

                  <div className="mt-6 pt-4 border-t border-zinc-800/50">
                    <button
                      type="button"
                      onClick={generateTestCard}
                      className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center justify-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Generate test card details
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pt-20 md:pb-8 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-zinc-500 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={clearCart}
            className="rounded-lg"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <Card key={product.id} className="group overflow-hidden border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="w-8 h-8 text-zinc-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                      <p className="text-sm text-zinc-500 mb-3 line-clamp-1">{product.category}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-700">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          className="text-zinc-400 hover:text-red-500 transition-colors"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-lg">${(Number(product.price) * quantity).toFixed(2)}</p>
                      <p className="text-xs text-zinc-500">${Number(product.price).toFixed(2)} each</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-24 overflow-hidden border-zinc-200 dark:border-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Subtotal</span>
                    <span>${total().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Shipping</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Free</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Estimated Tax</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                      ${total().toFixed(2)}
                    </span>
                  </div>
                </div>

                {user ? (
                  <Button
                    className="w-full rounded-xl h-12 text-base font-medium bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-0 shadow-lg hover:shadow-xl transition-all"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Button
                      className="w-full rounded-xl h-12 text-base font-medium bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-0 shadow-lg hover:shadow-xl transition-all"
                      onClick={handleCheckout}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Login to Checkout
                    </Button>
                    <p className="text-xs text-center text-zinc-500">
                      Please log in to complete your purchase
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Encrypted
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
