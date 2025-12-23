import { Request, Response } from "express"
import axios from "axios"
export const nehemjlehUusgeh = async (req: Request, res:Response)=>{
let data = JSON.stringify({
  "entityId": "songo.mn",
  "redirect_uri": "http://localhost:5173",
  "webhook_url": "http://localhost:4000/api/hipay/webhook",
  "amount": 1000.1,
  "qrData": false,
  "items": [
    {
      "itemno": "string",
      "name": "string",
      "price": 0,
      "quantity": 0,
      "brand": "string",
      "measure": "string",
      "vat": 0,
      "citytax": 0
    }
  ]
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://test.hipay.mn/checkout',
  headers: { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
}