
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { fetchPrintifyProducts, fetchPrintifyShops, transformPrintifyProducts } from '@/lib/printify';
import { Product } from '@/lib/types';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  
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
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    if (productsQuery.data && id) {
      const foundProduct = productsQuery.data.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.images[0]);
      }
    }
  }, [productsQuery.data, id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      // In a real app, this would add the product to the cart in state or context
      toast({
        title: "Added to Cart",
        description: `${quantity} x ${product.name} added to your cart.`,
      });
    }
  };
  
  const handleImageClick = (image: string) => {
    setMainImage(image);
  };
  
  if (shopQuery.isLoading || productsQuery.isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gothic-accent/20 border-t-gothic-accent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product && !productsQuery.isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <h2 className="font-serif text-2xl mb-4">Product Not Found</h2>
          <p className="text-gothic-silver/70 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/products')}
            className="button-primary rounded-md"
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
      <Navbar />
      
      {/* Product Detail Section */}
      <div className="pt-32 pb-20 px-6 flex-1">
        <div className="container mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gothic-silver/70 hover:text-gothic-silver mb-8 transition-colors duration-300"
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>
          
          {product && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div>
                <div className="bg-gothic-gray/20 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={mainImage} 
                    alt={product.name}
                    className="w-full h-auto object-contain aspect-square"
                  />
                </div>
                
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageClick(image)}
                        className={`bg-gothic-gray/20 rounded-lg overflow-hidden ${mainImage === image ? 'ring-2 ring-gothic-accent' : ''}`}
                      >
                        <img 
                          src={image} 
                          alt={`${product.name} - View ${index + 1}`}
                          className="w-full h-auto object-contain aspect-square"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div>
                <div className="mb-2 text-sm text-gothic-silver/60 uppercase tracking-wider">
                  {product.category}
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">
                  {product.name}
                </h1>
                <div className="text-2xl font-medium text-gothic-silver mb-6">
                  ${product.price.toFixed(2)}
                </div>
                
                <div className="prose prose-invert max-w-none mb-8">
                  <p>{product.description}</p>
                </div>
                
                {/* Quantity Selector */}
                <div className="mb-8">
                  <label htmlFor="quantity" className="block text-sm text-gothic-silver/70 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="bg-gothic-gray/40 text-gothic-silver px-4 py-2 rounded-l-md"
                    >
                      -
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="bg-gothic-gray/20 border-y border-gothic-silver/20 text-center px-4 py-2 w-16 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gothic-gray/40 text-gothic-silver px-4 py-2 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="button-primary rounded-md flex-1 flex items-center justify-center"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  
                  <button className="button-secondary rounded-md p-3">
                    <Heart size={18} />
                  </button>
                  
                  <button className="button-secondary rounded-md p-3">
                    <Share2 size={18} />
                  </button>
                </div>
                
                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-8">
                    <div className="text-sm text-gothic-silver/70 mb-2">Tags:</div>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gothic-gray/20 text-gothic-silver/80 text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
