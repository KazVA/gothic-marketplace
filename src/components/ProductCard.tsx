
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="group bg-gothic-gray/40 border border-gothic-silver/5 rounded-lg overflow-hidden card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
        />
        
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gothic-black/40 flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            to={`/products/${product.id}`}
            className="bg-gothic-silver/90 text-gothic-black p-3 rounded-full hover:bg-gothic-silver transition-colors duration-300"
          >
            <Eye size={20} />
          </Link>
          <button 
            className="bg-gothic-accent text-white p-3 rounded-full hover:bg-gothic-purple transition-colors duration-300"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Tag if featured */}
        {product.featured && (
          <div className="absolute top-4 left-4 bg-gothic-accent text-white text-xs uppercase tracking-wider py-1 px-2 rounded">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2 text-xs text-gothic-silver/60 uppercase tracking-wider">
          {product.category}
        </div>
        <h3 className="font-serif text-lg font-medium mb-2 transition-colors duration-300 group-hover:text-gothic-silver">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-4">
          <span className="font-medium text-gothic-silver">${product.price.toFixed(2)}</span>
          {!product.inStock && (
            <span className="text-xs text-gothic-silver/60 uppercase">Out of stock</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
