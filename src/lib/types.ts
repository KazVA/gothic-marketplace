
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  featured?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = 'mousepads' | 'journals' | 'apparel' | 'accessories';

export interface NavItem {
  title: string;
  href: string;
}
