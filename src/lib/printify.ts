
import { PrintifyProduct, Product } from './types';

const PRINTIFY_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImZjY2Y5ZmYzMDRmNjBmZTVlZThhMzZjZjdkYjM3NzRmMTY1MzhjZGVjYjUxNGZjYjlhNTJmZjZmZmQ0M2Q5NjE3ODJmOTA2NWVhZmNiZDJiIiwiaWF0IjoxNzQyMzk0NTI0LjM4MDA3MywibmJmIjoxNzQyMzk0NTI0LjM4MDA3NiwiZXhwIjoxNzczOTMwNTI0LjM3MjI1OCwic3ViIjoiMjIzOTQ4MDciLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.As-m6L2Qqbw-EC9TADZWeGxwsDnSa316cV78hUrf_ELHTPwwCjdegThw_02z3YP2TPkW0RDKLM4TIjFcNKk";

// API base URL
const PRINTIFY_API_URL = "https://api.printify.com/v1";

/**
 * Fetches the shops associated with the Printify account
 */
export const fetchPrintifyShops = async (): Promise<any> => {
  try {
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
    throw error;
  }
};

/**
 * Fetches all products from the given shop ID
 */
export const fetchPrintifyProducts = async (shopId: string): Promise<PrintifyProduct[]> => {
  try {
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
    throw error;
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

