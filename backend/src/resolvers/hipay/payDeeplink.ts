import axios from "axios";
import { Request, Response } from "express";

const paymentDeeplink = (req: Request, res: Response) => {
    const {checkoutId} = req.body
  let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `hipay://pay/${checkoutId}`,
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
};
export default paymentDeeplink;



