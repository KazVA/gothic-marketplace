
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
      <Navbar />
      
      <motion.div 
        className="pt-32 pb-20 px-6 flex-grow flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-2xl">
          <div className="bg-gothic-gray/20 border border-gothic-silver/10 rounded-lg p-10 text-center">
            <div className="mx-auto w-20 h-20 bg-gothic-accent/20 flex items-center justify-center rounded-full mb-6">
              <CheckCircle size={40} className="text-gothic-accent" />
            </div>
            
            <h1 className="font-serif text-3xl lg:text-4xl font-medium mb-4">Thank You!</h1>
            
            <p className="text-gothic-silver/80 mb-8">
              Your order has been successfully placed. We've sent a confirmation email with all the details.
            </p>
            
            <div className="space-y-6">
              <p className="text-gothic-silver/70">
                Your gothic treasures will be crafted with care and dispatched to you soon.
              </p>
              
              <div className="pt-6 border-t border-gothic-silver/10">
                <Link to="/products">
                  <Button className="bg-gothic-accent text-gothic-black hover:bg-gothic-accent/80">
                    Continue Shopping <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default ThankYou;
