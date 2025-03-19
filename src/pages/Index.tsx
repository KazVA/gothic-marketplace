
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Star, ShieldCheck, TruckFast } from 'lucide-react';

// Sample data for featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Gothic Cathedral Mousepad',
    price: 24.99,
    description: 'Premium mousepad with a gothic cathedral design. Perfect for adding a touch of darkness to your desktop.',
    images: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'],
    category: 'mousepads',
    tags: ['gothic', 'cathedral', 'desk accessories'],
    featured: true,
    inStock: true
  },
  {
    id: '2',
    name: 'Raven\'s Journal',
    price: 29.99,
    description: 'Elegant journal with an embossed raven design. 200 high-quality pages for your darkest thoughts.',
    images: ['https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&q=80'],
    category: 'journals',
    tags: ['raven', 'notebook', 'writing'],
    featured: true,
    inStock: true
  },
  {
    id: '3',
    name: 'Dark Night Sky Mousepad',
    price: 22.99,
    description: 'Extra large mousepad with a starry night sky design. Perfect for gamers and dark aesthetic enthusiasts.',
    images: ['https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80'],
    category: 'mousepads',
    tags: ['night', 'stars', 'gaming'],
    featured: true,
    inStock: true
  },
  {
    id: '4',
    name: 'Victorian Architecture Journal',
    price: 34.99,
    description: 'Hard-bound journal featuring Victorian architecture prints. Includes bookmark ribbon and elastic closure.',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'],
    category: 'journals',
    tags: ['victorian', 'architecture', 'vintage'],
    featured: true,
    inStock: true
  },
];

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1]
    }
  }
};

const Home = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10 z-0"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 bg-gothic-accent/20 text-gothic-silver/90 text-xs uppercase tracking-wider rounded-full mb-6">
                Premium Gothic Collections
              </span>
            </motion.div>
            
            <motion.h1 
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Embrace the Elegance of Darkness
            </motion.h1>
            
            <motion.p 
              className="text-gothic-silver/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Discover our premium collection of gothic-themed products crafted for those who find beauty in the shadows.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <Link 
                to="/products" 
                className="button-primary rounded-md text-center"
              >
                Explore Collection
              </Link>
              <Link 
                to="/about" 
                className="button-secondary rounded-md text-center"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Featured Products */}
      <section className="py-20 px-6 bg-gothic-black">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-gothic-accent uppercase text-sm tracking-wider">Curated Selection</span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium mt-2">Featured Products</h2>
            </div>
            <Link 
              to="/products" 
              className="hidden md:flex items-center text-gothic-silver/80 hover:text-gothic-silver transition-colors duration-300"
            >
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link 
              to="/products" 
              className="button-secondary rounded-md inline-flex items-center"
            >
              View All Products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-20 px-6 bg-gothic-gray/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-gothic-accent uppercase text-sm tracking-wider">Collections</span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mt-2 mb-4">Explore Categories</h2>
            <p className="text-gothic-silver/70 max-w-2xl mx-auto">
              Discover our carefully curated categories, each featuring uniquely designed gothic-themed products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link 
              to="/products?category=mousepads" 
              className="group relative h-80 overflow-hidden rounded-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" 
                alt="Mousepads"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-in-out transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gothic-black/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-serif text-2xl font-medium text-gothic-silver">Mousepads</h3>
                <p className="text-gothic-silver/70 mt-2">
                  Elevate your desktop aesthetic
                </p>
              </div>
            </Link>
            
            <Link 
              to="/products?category=journals" 
              className="group relative h-80 overflow-hidden rounded-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&q=80" 
                alt="Journals"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-in-out transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gothic-black/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-serif text-2xl font-medium text-gothic-silver">Journals</h3>
                <p className="text-gothic-silver/70 mt-2">
                  For your darkest thoughts and dreams
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 px-6 bg-gothic-black">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gothic-gray/20 p-8 rounded-lg border border-gothic-silver/5 text-center">
              <div className="mx-auto w-12 h-12 bg-gothic-accent/20 flex items-center justify-center rounded-full mb-6">
                <ShieldCheck size={24} className="text-gothic-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-4">Premium Quality</h3>
              <p className="text-gothic-silver/70">
                Each product is crafted with attention to detail and made with high-quality materials.
              </p>
            </div>
            
            <div className="bg-gothic-gray/20 p-8 rounded-lg border border-gothic-silver/5 text-center">
              <div className="mx-auto w-12 h-12 bg-gothic-accent/20 flex items-center justify-center rounded-full mb-6">
                <TruckFast size={24} className="text-gothic-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-4">Fast Delivery</h3>
              <p className="text-gothic-silver/70">
                Quick processing and shipping to bring your gothic treasures to you as soon as possible.
              </p>
            </div>
            
            <div className="bg-gothic-gray/20 p-8 rounded-lg border border-gothic-silver/5 text-center">
              <div className="mx-auto w-12 h-12 bg-gothic-accent/20 flex items-center justify-center rounded-full mb-6">
                <Star size={24} className="text-gothic-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-4">Unique Designs</h3>
              <p className="text-gothic-silver/70">
                Exclusive gothic-inspired designs you won't find anywhere else.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 px-6 bg-gothic-purple relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 z-0"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">Join Our Dark Realm</h2>
            <p className="text-gothic-silver/80 mb-8">
              Subscribe to our newsletter for exclusive offers, new product announcements, and dark inspirations.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-gothic-black/50 border border-gothic-silver/20 rounded-md px-4 py-3 text-gothic-silver placeholder:text-gothic-silver/50 focus:outline-none focus:border-gothic-accent"
                required
              />
              <button 
                type="submit" 
                className="button-primary rounded-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
