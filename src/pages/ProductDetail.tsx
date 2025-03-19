import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Product } from '@/lib/types';
import { ShoppingCart, Heart, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

// Sample product data
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Gothic Cathedral Mousepad',
    price: 24.99,
    description: 'Premium mousepad with a gothic cathedral design. Perfect for adding a touch of darkness to your desktop. Features a smooth surface for precise mouse tracking and a non-slip rubber base to keep it securely in place. The high-quality print showcases intricate gothic cathedral architecture in stunning detail.\n\nDimensions: 900mm x 400mm x 4mm\nMaterial: Cloth surface with rubber base\nEdges: Stitched to prevent fraying',
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'mousepads',
    tags: ['gothic', 'cathedral', 'desk accessories'],
    featured: true,
    inStock: true
  },
  {
    id: '2',
    name: 'Raven\'s Journal',
    price: 29.99,
    description: 'Elegant journal with an embossed raven design. 200 high-quality pages for your darkest thoughts. The cover features a beautifully detailed raven in flight, embossed on premium faux leather. The acid-free paper is suitable for a variety of media including fountain pens.\n\nPages: 200 (100 sheets)\nPaper: 120gsm cream, acid-free\nBinding: Sewn binding allows the journal to lay flat\nClosure: Elastic band\nIncludes: Ribbon bookmark and back pocket',
    images: [
      'https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'journals',
    tags: ['raven', 'notebook', 'writing'],
    featured: true,
    inStock: true
  },
  {
    id: '3',
    name: 'Dark Night Sky Mousepad',
    price: 22.99,
    description: 'Extra large mousepad with a starry night sky design. Perfect for gamers and dark aesthetic enthusiasts. Features a smooth surface for precise mouse tracking and a non-slip rubber base to keep it securely in place. The high-quality print showcases a beautiful night sky with stars and constellations.\n\nDimensions: 900mm x 400mm x 4mm\nMaterial: Cloth surface with rubber base\nEdges: Stitched to prevent fraying',
    images: [
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'mousepads',
    tags: ['night', 'stars', 'gaming'],
    featured: true,
    inStock: true
  },
  // ...other products
];

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulating API fetch
    setTimeout(() => {
      const foundProduct = allProducts.find(p => p.id === productId);
      setProduct(foundProduct || null);
      setIsLoading(false);
    }, 500);
  }, [productId]);
  
  const handleAddToCart = () => {
    if (product) {
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity}) has been added to your cart.`,
      });
    }
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gothic-accent/30 border-t-gothic-accent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <h1 className="font-serif text-3xl font-medium mb-4">Product Not Found</h1>
          <p className="text-gothic-silver/70 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products" className="button-primary rounded-md">
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gothic-black text-gothic-silver">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Link 
              to="/products" 
              className="flex items-center text-gothic-silver/60 hover:text-gothic-silver transition-colors duration-300"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gothic-gray/20 border border-gothic-silver/5">
                <img 
                  src={product.images[selectedImageIndex]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors duration-300 ${
                        selectedImageIndex === index 
                          ? 'border-gothic-accent' 
                          : 'border-transparent hover:border-gothic-silver/30'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <div className="text-sm text-gothic-silver/60 uppercase tracking-wider mb-2">
                  {product.category}
                </div>
                <h1 className="font-serif text-3xl lg:text-4xl font-medium mb-2">
                  {product.name}
                </h1>
                <div className="text-2xl text-gothic-silver mt-4">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              
              <div className="prose prose-sm prose-invert">
                {product.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gothic-silver/80 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="space-y-6 pt-6 border-t border-gothic-silver/10">
                {/* Availability */}
                <div className="flex items-center">
                  <div className="mr-4 font-medium">Availability:</div>
                  {product.inStock ? (
                    <div className="flex items-center text-green-400">
                      <Check size={16} className="mr-1" /> In Stock
                    </div>
                  ) : (
                    <div className="text-gothic-silver/60">Out of Stock</div>
                  )}
                </div>
                
                {/* Quantity Selector */}
                {product.inStock && (
                  <div className="flex items-center">
                    <div className="mr-4 font-medium">Quantity:</div>
                    <div className="flex items-center border border-gothic-silver/20 rounded">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="p-1 px-2 text-gothic-silver/70 hover:text-gothic-silver disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-1 px-2 text-gothic-silver/70 hover:text-gothic-silver"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="button-primary rounded-md flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={18} className="mr-2" /> Add to Cart
                  </button>
                  <button className="button-secondary rounded-md flex items-center justify-center">
                    <Heart size={18} className="mr-2" /> Add to Wishlist
                  </button>
                </div>
              </div>
              
              {/* Tags */}
              <div className="pt-6 border-t border-gothic-silver/10">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gothic-gray/40 text-gothic-silver/80 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
