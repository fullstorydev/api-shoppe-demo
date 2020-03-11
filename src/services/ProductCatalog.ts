import * as fs from 'fs';
import * as lunr from 'lunr';
import { Product } from '../models';

/**
 * ProductCatalog provides Products available to the e-commerce
 * shoppe.
 */
export class ProductCatalog {

  private idx: lunr.Index;
  private static instance: ProductCatalog;
  private products: Product[];

  /**
   * Gets a singleton instance of a ProductCatalog.
   */
  static getInstance(): ProductCatalog {
    if (!ProductCatalog.instance) {
      ProductCatalog.instance = new ProductCatalog();
    }

    return ProductCatalog.instance;
  }

  constructor() {
    console.log('Initilizing products');

    this.products = this.readProducts();

    // randomly assign an inventory amount between 0 and 20
    this.products.forEach(product => {
      product.quantity = Math.floor(Math.random() * Math.floor(20))
    });

    this.idx = this.buildIndex();
  }

  /**
   * Builds a lunr search index.
   */
  private buildIndex(): lunr.Index {
    const builder = new lunr.Builder();
    builder.ref('id');
    builder.field('title');
    builder.field('description');

    this.products.forEach(product => builder.add(product));

    return builder.build();
  }

  /**
   * Gets a specific product.
   * @param id Product's ID
   */
  getProduct(id: number): Product | undefined {
    return this.getProducts().find(product => id === product.id)
  }

  /**
   * Gets a list of products.
   * @param query Optional search keyword
   */
  getProducts(query?: string): Product[] {
    if (query) {
      return this.idx.search(query).map(result => this.getProduct(+result.ref)) as Product[];
    } else {
      return this.products;
    }
  }

  /**
   * Gets the raw product data from a file.
   * @param filename the JSON file containing product data
   */
  private readProducts(filename = `${__dirname}/../../public/products.json`) {
    const content = fs.readFileSync(filename, { encoding: 'utf8' });

    try {
      return JSON.parse(content);
    } catch (err) {
      console.error(`Failed to convert ${filename} to JSON ${err}`);
      return [];
    }
  }
}