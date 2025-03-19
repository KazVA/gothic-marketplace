import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { CartItem as CartItemType, Product } from '@/lib/types';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';

// Sample cart items
const initialCartItems: CartItemType[] = [
  {
    product: {
      id: '1',
      name: 'Gothic Cathedral Mousepad',
      price: 24.99,
      description: 'Premium mousepad with a gothic cathedral design.',
      images: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'],
      category: 'mousepads',
      tags: ['gothic', 'cathedral'],
      inStock: true
    },
    quantity: 1
  },
  {
    product: {
      id: '2',
      name: 'Raven\'s Journal',
      price: 29.99,
      description: 'Elegant journal with an embossed raven design.',
      images: ['https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&q=80'],
      category: 'journals',
      tags: ['raven', 'notebook'],
      inStock: true
    },
    quantity: 2
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate fetching cart items
    setTimeout(() => {
      setCartItems(initialCartItems);
      setIsLoading(false);
    }, 500);
  }, []);
  
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const removeItem = (productId: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.product.id !== productId)
    );
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 
      0
    );
  };
  
  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;
  
  return (
    <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
      <Navbar />
      
      <motion.div 
        className="pt-32 pb-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl lg:text-4xl font-medium mb-4">Your Cart</h1>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-gothic-accent/30 border-t-gothic-accent rounded-full animate-spin"></div>
            </div>
          ) : cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-gothic-gray/20 border border-gothic-silver/10 rounded-lg overflow-hidden">
                  <div className="p-6 space-y-0 divide-y divide-gothic-silver/10">
                    {cartItems.map((item) => (
                      <CartItem 
                        key={item.product.id} 
                        item={item} 
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gothic-gray/20 border border-gothic-silver/10 rounded-lg p-6">
                  <h2 className="font-serif text-xl font-medium mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gothic-silver/70">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gothic-silver/70">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-gothic-silver/10 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <button className="button-primary w-full rounded-md flex items-center justify-center">
                      <CreditCard className="mr-2" size={18} /> Checkout with PayPal
                    </button>
                    <Link to="/products" className="button-secondary w-full rounded-md flex items-center justify-center">
                      Continue Shopping <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-gothic-gray/20 border border-gothic-silver/10 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-gothic-silver/10 flex items-center justify-center rounded-full mb-6">
                <ShoppingBag size={28} className="text-gothic-silver/70" />
              </div>
              <h2 className="font-serif text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gothic-silver/70 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/products" className="button-primary rounded-md inline-flex items-center">
                Browse Products <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Cart;
