import axios from "axios";
import { Request, Response } from "express";

const nehemjlelLavlah = (req: Request, res: Response) => {
  const {checkoutId} = req.body;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://test.hipay.mn/checkout/get/${checkoutId}`,
    headers: {
      Accept: "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
export default nehemjlelLavlah;
