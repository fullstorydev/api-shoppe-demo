import { Request, Response } from 'express';
import { ProductCatalog } from '../services';

/**
 * Gets a product based on its ID, which is provided as a route param.
 * @param req Express Request
 * @param res Express Response
 */
export function getProduct(req: Request, res: Response) {
  const { id } = req.params;

  console.log(`Getting product with id ${id}`);

  const catalog = ProductCatalog.getInstance();
  const product = catalog.getProduct(+id);

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

  const catalog = ProductCatalog.getInstance();
  const products = catalog.getProducts(q);

  res.json(products);
}
