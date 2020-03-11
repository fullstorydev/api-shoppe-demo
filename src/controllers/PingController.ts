import { Request, Response } from 'express';
import { Ping } from '../models';

export class PingController {

  private static instance: PingController;

  /**
   * Gets a singleton instance of a PingController.
   */
  static getInstance(): PingController {
    if (!PingController.instance) {
      PingController.instance = new PingController();
    }

    return PingController.instance;
  }

  /**
   * Returns a Ping object as a JSON response.
   * @param req Express Request
   * @param res Express Response
   */
  getPing(req: Request, res: Response) {
    const controller = PingController.getInstance();

    // simply responds with an Ping object and status 200
    const ping = controller.createPing();
    res.json(ping);
  }

  /**
   * Creates a Ping object with default message 'hello'.
   * @param message String message in the Ping object
   */
  createPing(message = 'hello'): Ping {
    return new Ping(message);
  }
}

