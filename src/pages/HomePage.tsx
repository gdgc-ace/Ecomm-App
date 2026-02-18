import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Truck, Shield, RefreshCw, Sparkles, ChevronDown, Star } from 'lucide-react';

export function HomePage() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Editorial Luxury */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC41Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYyaDR2MmgtdnptLTQtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Sparkles size={14} />
              Premium Collection 2026
            </span>
          </div>
          
          <h1 className="animate-fade-in-up animation-delay-100 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            <span className="text-foreground">Shop</span>
            <span className="text-primary">Ease</span>
          </h1>
          
          <p className="animate-fade-in-up animation-delay-200 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Curated essentials for the modern lifestyle. 
            Where quality meets convenience in perfect harmony.
          </p>
          
          <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products">
              <Button size="lg" className="h-14 px-8 text-base rounded-full hover:scale-105 transition-transform duration-300">
                Explore Collection
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="h-14 px-8 text-base rounded-full border-primary/30 hover:bg-primary/5">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <span className="text-xs uppercase tracking-widest opacity-60">Discover</span>
          <ChevronDown size={20} className="animate-bounce" />
        </button>
      </section>

      {/* Stats / Trust Bar */}
      <section className="py-12 px-4 border-y bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: '10K+', label: 'Products' },
            { value: '4.9', label: 'Rating' },
            { value: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1" style={{ fontFamily: 'Georgia, serif' }}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Why Choose <span className="text-primary">ShopEase</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We believe in delivering an exceptional shopping experience through attention to detail and commitment to quality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Truck, 
                title: 'Express Delivery', 
                desc: 'Free next-day delivery on orders over $50. Track your package in real-time.',
                gradient: 'from-emerald-500/20 to-teal-500/10'
              },
              { 
                icon: Shield, 
                title: 'Secure Payments', 
                desc: 'Bank-level encryption protects every transaction. Your data stays safe with us.',
                gradient: 'from-blue-500/20 to-indigo-500/10'
              },
              { 
                icon: RefreshCw, 
                title: 'Easy Returns', 
                desc: '30-day hassle-free returns. Not satisfied? We make it right, no questions asked.',
                gradient: 'from-amber-500/20 to-orange-500/10'
              },
            ].map((feature, i) => (
              <div 
                key={i}
                className="group relative p-8 rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="text-primary" size={28} />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/40" />
                  <div className="absolute top-8 right-4 w-2 h-2 rounded-full bg-primary/20" />
                  <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-primary/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-4 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Shop by Category
              </h2>
              <p className="text-muted-foreground">Explore our curated collections</p>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:underline">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Electronics', color: 'bg-gradient-to-br from-slate-800 to-slate-900', count: '240+' },
              { name: 'Fashion', color: 'bg-gradient-to-br from-rose-800 to-rose-900', count: '580+' },
              { name: 'Home & Living', color: 'bg-gradient-to-br from-emerald-800 to-emerald-900', count: '320+' },
              { name: 'Sports', color: 'bg-gradient-to-br from-blue-800 to-blue-900', count: '190+' },
            ].map((category, i) => (
              <Link
                key={i}
                to="/products"
                className={`group relative ${category.color} rounded-2xl p-6 min-h-[180px] flex flex-col justify-end overflow-hidden hover:scale-[1.02] transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-white text-lg font-semibold mb-1">{category.name}</h3>
                  <p className="text-white/60 text-sm">{category.count} Products</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border border-primary/20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[length:24px_24px]" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Ready to Experience Premium Shopping?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join thousands of satisfied customers who have discovered the joy of shopping with ShopEase.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/products">
                  <Button size="lg" className="h-12 px-8 rounded-full">
                    Start Shopping
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="ghost" size="lg" className="h-12 px-8 rounded-full">
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
