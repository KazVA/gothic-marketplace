
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { fetchPrintifyProducts, fetchPrintifyShops, transformPrintifyProducts, extractCategoriesFromProducts } from '@/lib/printify';
import { useToast } from '@/hooks/use-toast';

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
  { id: 'newest', name: 'Newest' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { toast } = useToast();
  
  // Fetch shop ID first
  const shopQuery = useQuery({
    queryKey: ['printifyShops'],
    queryFn: fetchPrintifyShops,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  
  // Then use the shop ID to fetch products
  const productsQuery = useQuery({
    queryKey: ['printifyProducts', shopQuery.data],
    queryFn: async () => {
      if (!shopQuery.data || !shopQuery.data.data || shopQuery.data.data.length === 0) {
        throw new Error("No shops found");
      }
      const shopId = shopQuery.data.data[0].id;
      const printifyProducts = await fetchPrintifyProducts(shopId);
      return transformPrintifyProducts(printifyProducts);
    },
    enabled: !!shopQuery.data && !!shopQuery.data.data && shopQuery.data.data.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const categories = productsQuery.data 
    ? extractCategoriesFromProducts(productsQuery.data)
    : [];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);
  
  useEffect(() => {
    if (productsQuery.error) {
      toast({
        title: "Error",
        description: "Failed to load products. Please try again later.",
        variant: "destructive"
      });
    }
  }, [productsQuery.error, toast]);
  
  useEffect(() => {
    if (!productsQuery.data) return;
    
    let result = [...productsQuery.data];
    
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
  }, [productsQuery.data, selectedCategory, sortBy]);
  
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
  
  const isLoading = shopQuery.isLoading || productsQuery.isLoading;
  
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
              
              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 border-4 border-gothic-accent/20 border-t-gothic-accent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gothic-silver/70">Loading products...</p>
                </div>
              )}
              
              {/* Error State */}
              {(shopQuery.error || productsQuery.error) && !isLoading && (
                <div className="text-center py-16">
                  <p className="text-gothic-silver/70 mb-4">Failed to load products.</p>
                  <button 
                    onClick={() => {
                      shopQuery.refetch();
                      if (shopQuery.data) {
                        productsQuery.refetch();
                      }
                    }}
                    className="button-primary rounded-md"
                  >
                    Try Again
                  </button>
                </div>
              )}
              
              {/* Products */}
              {!isLoading && !shopQuery.error && !productsQuery.error && (
                <>
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
                </>
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
