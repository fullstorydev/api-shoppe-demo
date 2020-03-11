import { Request, Response } from 'express';
import * as fs from 'fs';
import * as lunr from 'lunr';
import { Product } from '../models';

export class ProductController {

  private idx: lunr.Index;
  private static instance: ProductController;
  private products: Product[];

  /**
   * Gets a singleton instance of a ProductController.
   */
  static getInstance(): ProductController {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }

    return ProductController.instance;
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

/**
 * Gets a product based on its ID, which is provided as a route param.
 * @param req Express Request
 * @param res Express Response
 */
export function getProduct(req: Request, res: Response) {
  const { id } = req.params;

  console.log(`Getting product with id ${id}`);

  const controller = ProductController.getInstance();
  const product = controller.getProduct(+id);

  // send the product or Not Found if the ID wasn't valid
  product ? res.json(product) : res.status(404).send();
}

/**
 * Gets a list of products from query param for example /products?q=mangocados.
 * If no search is specified, all products are returned.
 * @param req Express Request
 * @param res Express Response
 */
export function getProducts(req: Request, res: Response) {
  const { q } = req.query;

  console.log(`Getting product with query ${q}`);

  const controller = ProductController.getInstance();
  const products = controller.getProducts(q);

  res.json(products);
}
