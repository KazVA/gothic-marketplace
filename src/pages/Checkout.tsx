
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import PayPalCheckoutButton from '@/components/PayPalCheckoutButton';
import { CartItem as CartItemType } from '@/lib/types';

const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutProps {
  cartItems: CartItemType[];
  subtotal: number;
  shipping: number;
  total: number;
  clearCart: () => void;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(4.99);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage
  React.useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadCart = () => {
      try {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
          const items = JSON.parse(savedCartItems) as CartItemType[];
          setCartItems(items);
          
          // Calculate totals
          const calculatedSubtotal = items.reduce(
            (sum, item) => sum + item.product.price * item.quantity, 
            0
          );
          setSubtotal(calculatedSubtotal);
          
          const calculatedShipping = calculatedSubtotal > 0 ? 4.99 : 0;
          setShipping(calculatedShipping);
          
          setTotal(calculatedSubtotal + calculatedShipping);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load your cart. Please try again.",
        });
      }
    };
    
    loadCart();
  }, [toast]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const handlePaymentSuccess = (details: any) => {
    console.log("Payment completed successfully", details);
    
    // Clear cart from localStorage
    localStorage.removeItem('cartItems');
    
    // Show success message
    toast({
      title: "Order Placed Successfully",
      description: "Thank you for your purchase!",
    });
    
    // Redirect to a thank you page
    setTimeout(() => {
      navigate('/thank-you');
    }, 2000);
  };

  const isFormValid = form.formState.isValid;

  return (
    <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
      <Navbar />
      <Toaster />
      
      <motion.div 
        className="pt-32 pb-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl lg:text-4xl font-medium mb-4">Checkout</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-gothic-gray/20 border border-gothic-silver/10 rounded-lg">
              <h2 className="font-serif text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gothic-silver/70 mb-8">
                You need to add items to your cart before checkout.
              </p>
              <Button
                onClick={() => navigate('/products')}
                className="bg-gothic-accent text-gothic-black hover:bg-gothic-accent/80"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Checkout Form */}
              <div className="bg-gothic-gray/20 border border-gothic-silver/10 rounded-lg p-6">
                <h2 className="font-serif text-xl font-medium mb-6">Shipping Information</h2>
                
                <Form {...form}>
                  <form className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} className="bg-gothic-black/50 border-gothic-silver/20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} className="bg-gothic-black/50 border-gothic-silver/20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Your street address" {...field} className="bg-gothic-black/50 border-gothic-silver/20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} className="bg-gothic-black/50 border-gothic-silver/20" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} className="bg-gothic-black/50 border-gothic-silver/20" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Zip Code" {...field} className="bg-gothic-black/50 border-gothic-silver/20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-gothic-gray/20 border border-gothic-silver/10 rounded-lg p-6 mb-6">
                  <h2 className="font-serif text-xl font-medium mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 divide-y divide-gothic-silver/10">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between py-3">
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gothic-silver/70">Quantity: {item.quantity}</p>
                        </div>
                        <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    
                    <div className="pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gothic-silver/70">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gothic-silver/70">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gothic-gray/20 border border-gothic-silver/10 rounded-lg p-6">
                  <h2 className="font-serif text-xl font-medium mb-6">Payment</h2>
                  <div className="relative">
                    <PayPalCheckoutButton 
                      amount={total} 
                      onSuccess={handlePaymentSuccess}
                      disabled={!isFormValid}
                    />
                  </div>
                  <p className="text-sm text-gothic-silver/50 mt-4 text-center">
                    You'll be redirected to PayPal to complete your purchase securely.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
