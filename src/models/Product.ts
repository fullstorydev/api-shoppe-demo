/**
 * Product models goods for sale in the e-commerce shoppe demo.
 * A "product" could be an item in the catalog or an item in a shopping cart.
 * This overlap exists to simplify the demo.
 */
export interface Product {
  description: string;
  featured?: boolean;    // whether or not this is a promoted product
  id: number;
  image: string;
  price: number;
  quantity: number;     // quantity could be inventory or number of items in cart
  title: string;
  unit: string;        // lb or kg for example
}