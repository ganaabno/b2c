import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { sql } from "../../utils/db";

export const createHainan = async (req: Request, res: Response) => {
  const {
    departure_date,
    five_star_adult_price,
    four_star_adult_price,
    availability,
    child_two_to_five,
    four_star_child_six_to_eleven,
    five_star_child_six_to_eleven,
  } = req.body;

  try {
    const id = randomUUID();

    const [created] = await sql`
      INSERT INTO hainan_price_table (id, departure_date, four_star_adult_price , five_star_adult_price, availability, child_two_to_five, four_star_child_six_to_eleven, five_star_child_six_to_eleven)
      VALUES (${id}, ${departure_date}, ${four_star_adult_price},${five_star_adult_price}, ${availability}, ${child_two_to_five}, ${four_star_child_six_to_eleven}, ${five_star_child_six_to_eleven})
      RETURNING *
    `;

    const normalized = {
      ...(created || {}),
      id: created?.id ?? created?.ID ?? id,
    };

    return res.status(201).json({ data: normalized });
  } catch (error) {
    console.error("createHainan error", error);
    return res.status(500).json({ message: "Failed to create Hainan row" });
  }
};
