
import React from 'react';
import { CartItem as CartItemType } from '@/lib/types';
import { Trash, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;
  
  return (
    <div className="flex border-b border-gothic-silver/10 py-6 animate-fade-in">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="font-serif text-base text-gothic-silver">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gothic-silver/60">
              {product.category}
            </p>
          </div>
          <p className="text-base text-gothic-silver">
            ${product.price.toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm mt-auto">
          <div className="flex items-center border border-gothic-silver/20 rounded">
            <button
              onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
              className="p-1 px-2 text-gothic-silver/70 hover:text-gothic-silver"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-2 py-1 min-w-[40px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="p-1 px-2 text-gothic-silver/70 hover:text-gothic-silver"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="text-gothic-silver/60 hover:text-gothic-accent transition-colors duration-300"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
