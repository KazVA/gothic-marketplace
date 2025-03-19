
import { PrintifyProduct, Product } from './types';

const PRINTIFY_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImZjY2Y5ZmYzMDRmNjBmZTVlZThhMzZjZjdkYjM3NzRmMTY1MzhjZGVjYjUxNGZjYjlhNTJmZjZmZmQ0M2Q5NjE3ODJmOTA2NWVhZmNiZDJiIiwiaWF0IjoxNzQyMzk0NTI0LjM4MDA3MywibmJmIjoxNzQyMzk0NTI0LjM4MDA3NiwiZXhwIjoxNzczOTMwNTI0LjM3MjI1OCwic3ViIjoiMjIzOTQ4MDciLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.As-m6L2Qqbw-EC9TADZWeGxwsDnSa316cV78hUrf_ELHTPwwCjdegThw_02z3YP2TPkW0RDKLM4TIjFcNKk";

// API base URL
const PRINTIFY_API_URL = "https://api.printify.com/v1";

/**
 * Fetches the shops associated with the Printify account
 */
export const fetchPrintifyShops = async (): Promise<any> => {
  try {
    // Try to fetch from the API
    const response = await fetch(`${PRINTIFY_API_URL}/shops.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch shops: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Printify shops:", error);
    
    // Return mock shop data when API fails
    return {
      data: [
        {
          id: "mock-shop-id",
          title: "Mock Shop",
          store_type: "mocktype"
        }
      ]
    };
  }
};

/**
 * Fetches all products from the given shop ID
 */
export const fetchPrintifyProducts = async (shopId: string): Promise<PrintifyProduct[]> => {
  try {
    // Try to fetch from the API
    const response = await fetch(`${PRINTIFY_API_URL}/shops/${shopId}/products.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Printify products:", error);
    
    // Return mock products when API fails
    return getMockProducts();
  }
};

/**
 * Transforms Printify products to our app's product format
 */
export const transformPrintifyProducts = (printifyProducts: PrintifyProduct[]): Product[] => {
  return printifyProducts.map(product => ({
    id: product.id,
    name: product.title,
    price: product.variants[0]?.price || 0,
    description: product.description || "",
    images: product.images.map(img => img.src),
    category: product.tags && product.tags.length > 0 ? product.tags[0] : "uncategorized",
    tags: product.tags || [],
    featured: false, // You can determine this based on certain criteria if needed
    inStock: product.is_locked === false // Assuming products that aren't locked are in stock
  }));
};

/**
 * Extracts unique categories from products
 */
export const extractCategoriesFromProducts = (products: Product[]): { id: string; name: string }[] => {
  const categorySet = new Set<string>();
  
  products.forEach(product => {
    if (product.category) {
      categorySet.add(product.category);
    }
  });
  
  return Array.from(categorySet).map(category => ({
    id: category,
    name: category.charAt(0).toUpperCase() + category.slice(1) // Capitalize first letter
  }));
};

/**
 * Returns mock products when the API is unreachable
 */
const getMockProducts = (): PrintifyProduct[] => {
  return [
    {
      id: "mock-product-1",
      title: "Gothic Raven Mousepad",
      description: "Elegant mousepad featuring a gothic raven design, perfect for adding a touch of darkness to your desktop setup.",
      tags: ["mousepads", "gothic", "raven"],
      options: [],
      variants: [{ id: "v1", price: 24.99, is_enabled: true, is_default: true, title: "Standard", options: {}, sku: "GRVM-001" }],
      images: [
        { 
          src: "https://images.unsplash.com/photo-1603731955725-33d361e2e04e?auto=format&fit=crop&q=80&w=800", 
          variant_ids: ["v1"], 
          position: "front", 
          is_default: true 
        }
      ],
      created_at: "2023-01-15T12:00:00Z",
      updated_at: "2023-01-15T12:00:00Z",
      visible: true,
      is_locked: false,
      blueprint_id: "bp1",
      user_id: "u1",
      shop_id: "shop1",
      print_provider_id: "pp1",
      print_areas: []
    },
    {
      id: "mock-product-2",
      title: "Dark Forest Journal",
      description: "Premium journal with a mysterious dark forest cover, perfect for recording your thoughts and secrets.",
      tags: ["journals", "stationery", "dark"],
      options: [],
      variants: [{ id: "v2", price: 19.99, is_enabled: true, is_default: true, title: "Standard", options: {}, sku: "DFJ-001" }],
      images: [
        { 
          src: "https://images.unsplash.com/photo-1598618443855-232ee0f819f6?auto=format&fit=crop&q=80&w=800", 
          variant_ids: ["v2"], 
          position: "front", 
          is_default: true 
        }
      ],
      created_at: "2023-02-01T12:00:00Z",
      updated_at: "2023-02-01T12:00:00Z",
      visible: true,
      is_locked: false,
      blueprint_id: "bp2",
      user_id: "u1",
      shop_id: "shop1",
      print_provider_id: "pp1",
      print_areas: []
    },
    {
      id: "mock-product-3",
      title: "Victorian Gothic Phone Case",
      description: "Elegant phone case with Victorian Gothic patterns, designed to protect your device in style.",
      tags: ["phone-cases", "victorian", "accessories"],
      options: [],
      variants: [{ id: "v3", price: 29.99, is_enabled: true, is_default: true, title: "iPhone 13", options: {}, sku: "VGPC-001" }],
      images: [
        { 
          src: "https://images.unsplash.com/photo-1592385671247-98bdc3f42520?auto=format&fit=crop&q=80&w=800", 
          variant_ids: ["v3"], 
          position: "front", 
          is_default: true 
        }
      ],
      created_at: "2023-02-15T12:00:00Z",
      updated_at: "2023-02-15T12:00:00Z",
      visible: true,
      is_locked: false,
      blueprint_id: "bp3",
      user_id: "u1",
      shop_id: "shop1",
      print_provider_id: "pp1",
      print_areas: []
    },
    {
      id: "mock-product-4",
      title: "Midnight Skull T-Shirt",
      description: "Premium black t-shirt featuring an intricate skull design, perfect for gothic fashion enthusiasts.",
      tags: ["clothing", "t-shirts", "skull"],
      options: [],
      variants: [
        { id: "v4-s", price: 34.99, is_enabled: true, is_default: false, title: "Small", options: { size: "S" }, sku: "MST-S" },
        { id: "v4-m", price: 34.99, is_enabled: true, is_default: true, title: "Medium", options: { size: "M" }, sku: "MST-M" },
        { id: "v4-l", price: 34.99, is_enabled: true, is_default: false, title: "Large", options: { size: "L" }, sku: "MST-L" }
      ],
      images: [
        { 
          src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800", 
          variant_ids: ["v4-s", "v4-m", "v4-l"], 
          position: "front", 
          is_default: true 
        }
      ],
      created_at: "2023-03-01T12:00:00Z",
      updated_at: "2023-03-01T12:00:00Z",
      visible: true,
      is_locked: false,
      blueprint_id: "bp4",
      user_id: "u1",
      shop_id: "shop1",
      print_provider_id: "pp1",
      print_areas: []
    }
  ];
};
