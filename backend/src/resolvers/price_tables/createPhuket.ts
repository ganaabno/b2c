import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { sql } from "../../utils/db";

export const createPhuket = async (req: Request, res: Response) => {
  const { departure_date, adult_price, availability, child_two_to_eleven_with_bed, child_two_to_eleven_no_bed, hotel } = req.body;

  try {
    const id = randomUUID();
    const [created] = await sql`
      INSERT INTO phuket_price_table (id, departure_date, adult_price, availability, child_two_to_eleven_with_bed, child_two_to_eleven_no_bed, hotel  )
      VALUES (${id}, ${departure_date}, ${adult_price}, ${availability}, ${child_two_to_eleven_with_bed}, ${child_two_to_eleven_no_bed}, ${hotel})
      RETURNING *
    `;

    const normalized = {
      ...(created || {}),
      id: created?.id ?? created?.ID ?? id,
    };
    return res.status(201).json({ data: normalized });
  } catch (error) {
    console.error("createPhuket error", error);
    return res.status(500).json({ message: "Failed to create Phuket row" });
  }
};
