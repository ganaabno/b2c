import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { sql } from "../../utils/db";

export const createHoChiMinhPhuQuoc = async (req: Request, res: Response) => {
  const { departure_date, adult_price, availability } = req.body;

  try {
    const id = randomUUID();
    const [created] = await sql`
      INSERT INTO ho_chi_minh_phu_quoc_price_table (id, departure_date, adult_price, availability)
      VALUES (${id}, ${departure_date}, ${adult_price}, ${availability})
      RETURNING *
    `;

    const normalized = {
      ...(created || {}),
      id: created?.id ?? created?.ID ?? id,
    };
    return res.status(201).json({ data: normalized });
  } catch (error) {
    console.error("createHoChiMinhPhuQuoc error", error);
    return res
      .status(500)
      .json({ message: "Failed to create HoChiMinhPhuQuoc row" });
  }
};
