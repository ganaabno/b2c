import express from "express";
import { Request, Response } from "express";

export const createTable = (req: Request, res: Response) => {
  const { data } = req.body;
  console.log(data);

  try {



    
  } catch (error) {
    console.log(error);
  }
};
