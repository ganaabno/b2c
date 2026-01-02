import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { sql } from "../../utils/db";

export const createSingapore = async (req: Request, res: Response) => {
  const { departure_date, adult_price, availability, child_two_to_four, child_five_to_eleven } = req.body;

  try {
    const id = randomUUID();
    const [created] = await sql`
      INSERT INTO singapore_price_table (id, departure_date, adult_price, availability, child_two_to_four, child_five_to_eleven)
      VALUES (${id}, ${departure_date}, ${adult_price}, ${availability}, ${child_two_to_four}, ${child_five_to_eleven})
      RETURNING *
    `;

    const normalized = {
      ...(created || {}),
      id: created?.id ?? created?.ID ?? id,
    };
    return res.status(201).json({ data: normalized });
  } catch (error) {
    console.error("createSingapore error", error);
    return res.status(500).json({ message: "Failed to create Singapore row" });
  }
};
