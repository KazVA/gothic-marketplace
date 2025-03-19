
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/lib/types';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';

// Sample product data
const allProducts: Product[] = [
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
  {
    id: '5',
    name: 'Dark Forest Mousepad',
    price: 26.99,
    description: 'A mousepad featuring a mysterious dark forest design. High-quality fabric with non-slip backing.',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'],
    category: 'mousepads',
    tags: ['forest', 'nature', 'dark'],
    inStock: true
  },
  {
    id: '6',
    name: 'Skull Embroidery Journal',
    price: 32.99,
    description: 'Black leather journal with embroidered skull design. 180 pages of acid-free paper.',
    images: ['https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?auto=format&fit=crop&w=800&q=80'],
    category: 'journals',
    tags: ['skull', 'embroidery', 'leather'],
    inStock: true
  },
  {
    id: '7',
    name: 'Gothic Gargoyle T-Shirt',
    price: 29.99,
    description: 'Premium black t-shirt with a detailed gargoyle print. 100% cotton with a comfortable fit.',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'],
    category: 'apparel',
    tags: ['gargoyle', 't-shirt', 'clothing'],
    inStock: true
  },
  {
    id: '8',
    name: 'Vintage Coffin Pendant',
    price: 19.99,
    description: 'Antique silver coffin-shaped pendant on a delicate chain. Perfect gothic accessory for any outfit.',
    images: ['https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?auto=format&fit=crop&w=800&q=80'],
    category: 'accessories',
    tags: ['coffin', 'pendant', 'jewelry'],
    inStock: true
  },
];

const categories: { id: Category; name: string }[] = [
  { id: 'mousepads', name: 'Mousepads' },
  { id: 'journals', name: 'Journals' },
  { id: 'apparel', name: 'Apparel' },
  { id: 'accessories', name: 'Accessories' },
];

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
  { id: 'newest', name: 'Newest' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setProducts(allProducts);
  }, []);
  
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);
  
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, this would sort by date added
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy]);
  
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };
  
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-10 px-6">
        <div className="container mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">Our Products</h1>
          <p className="text-gothic-silver/70 max-w-3xl">
            Explore our collection of premium gothic-themed products, designed for those who appreciate the darker aesthetic.
          </p>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="flex-1 px-6 pb-20">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <div className="mb-8">
                  <h3 className="font-serif text-lg font-medium mb-4">Categories</h3>
                  <ul className="space-y-3">
                    <li>
                      <button 
                        onClick={() => handleCategoryChange(null)}
                        className={`text-left w-full transition-colors duration-300 ${!selectedCategory ? 'text-gothic-silver' : 'text-gothic-silver/60 hover:text-gothic-silver'}`}
                      >
                        All Products
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button 
                          onClick={() => handleCategoryChange(category.id)}
                          className={`text-left w-full transition-colors duration-300 ${selectedCategory === category.id ? 'text-gothic-silver' : 'text-gothic-silver/60 hover:text-gothic-silver'}`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              {/* Mobile Filter Controls */}
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="button-secondary rounded-md flex items-center"
                >
                  <Filter size={16} className="mr-2" /> Filters
                </button>
                
                <div className="flex items-center">
                  <label htmlFor="mobile-sort" className="text-sm text-gothic-silver/70 mr-2">
                    Sort
                  </label>
                  <select
                    id="mobile-sort"
                    className="bg-gothic-gray border border-gothic-silver/20 text-gothic-silver rounded-md py-2 px-4 focus:outline-none focus:border-gothic-accent"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Desktop Sort Controls */}
              <div className="hidden lg:flex justify-end mb-6">
                <div className="flex items-center">
                  <label htmlFor="desktop-sort" className="text-sm text-gothic-silver/70 mr-2">
                    Sort by
                  </label>
                  <select
                    id="desktop-sort"
                    className="bg-gothic-gray border border-gothic-silver/20 text-gothic-silver rounded-md py-2 px-4 focus:outline-none focus:border-gothic-accent"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gothic-silver/70">No products found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Sidebar */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 glass flex flex-col animate-fade-in">
          <div className="flex items-center justify-between p-6 border-b border-gothic-silver/10">
            <h3 className="font-serif text-xl font-medium">Filters</h3>
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="text-gothic-silver/70"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-8">
              <h4 className="font-serif text-lg font-medium mb-4">Categories</h4>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => {
                      handleCategoryChange(null);
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`text-left w-full transition-colors duration-300 ${!selectedCategory ? 'text-gothic-silver' : 'text-gothic-silver/60'}`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button 
                      onClick={() => {
                        handleCategoryChange(category.id);
                        setIsMobileFiltersOpen(false);
                      }}
                      className={`text-left w-full transition-colors duration-300 ${selectedCategory === category.id ? 'text-gothic-silver' : 'text-gothic-silver/60'}`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="p-6 border-t border-gothic-silver/10">
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="button-primary w-full rounded-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Products;
