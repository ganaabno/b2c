import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { sql } from "../../utils/db";

export const createThailandBanggok = async (req: Request, res: Response) => {
  const { departure_date, adult_price, availability } = req.body;

  try {
    const id = randomUUID();
    const [created] = await sql`
      INSERT INTO thailand_banggok_price_table (id, departure_date, adult_price, availability)
      VALUES (${id}, ${departure_date}, ${adult_price}, ${availability})
      RETURNING *
    `;

    const normalized = {
      ...(created || {}),
      id: created?.id ?? created?.ID ?? id,
    };
    return res.status(201).json({ data: normalized });
  } catch (error) {
    console.error("createThailandBanggok error", error);
    return res
      .status(500)
      .json({ message: "Failed to create ThailandBanggok row" });
  }
};
