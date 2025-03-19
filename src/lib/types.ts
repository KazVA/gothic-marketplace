
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

export type Category = string;

export interface NavItem {
  title: string;
  href: string;
}

// Printify specific types
export interface PrintifyImage {
  src: string;
  variant_ids: string[];
  position: string;
  is_default: boolean;
}

export interface PrintifyVariant {
  id: string;
  price: number;
  is_enabled: boolean;
  is_default: boolean;
  title: string;
  options: Record<string, string>;
  sku: string;
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: any[];
  variants: PrintifyVariant[];
  images: PrintifyImage[];
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  blueprint_id: string;
  user_id: string;
  shop_id: string;
  print_provider_id: string;
  print_areas: any[];
}

