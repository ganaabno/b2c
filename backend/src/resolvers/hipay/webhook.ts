import { Request, Response } from "express";

const webhook = (req: Request, res: Response) => {
  const { checkoutId, paymentId } = req.body;
  if (!checkoutId || !paymentId) {
    return res.status(400).send("Missing checkoutId or paymentId");
  }

  // Logic to handle the webhook event goes here...

  // Send success response
  return res.sendStatus(200);
};
export default webhook;
