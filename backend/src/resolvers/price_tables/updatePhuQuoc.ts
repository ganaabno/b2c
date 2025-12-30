import { Request, Response } from "express";
import { sql } from "../../utils/db";

export const updatePhuQuoc = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { departure_date, adult_price, availability } = req.body;

  if (!id) return res.status(400).json({ message: "Missing id" });

  try {
    let [existing] =
      await sql`SELECT * FROM phu_quoc_price_table WHERE id = ${id}`;
    if (!existing) {
      try {
        [existing] =
          await sql`SELECT * FROM phu_quoc_price_table WHERE "ID" = ${id}`;
      } catch (e) {
        if (!existing) return res.status(404).json({ message: "Row not found" });
      }
    }
    if (!existing) return res.status(404).json({ message: "Row not found" });

    let updated: any = null;
    try {
      const [u] = await sql`
        UPDATE phu_quoc_price_table
        SET departure_date = ${departure_date}, adult_price = ${adult_price}, availability = ${availability}
        WHERE id = ${id}
        RETURNING *
      `;
      updated = u;
    } catch (e) {
      const [u2] = await sql`
        UPDATE phu_quoc_price_table
        SET departure_date = ${departure_date}, adult_price = ${adult_price}, availability = ${availability}
        WHERE "ID" = ${id}
        RETURNING *
      `;
      updated = u2;
    }

    const normalized = {
      ...(updated || {}),
      id: updated?.id ?? updated?.ID ?? null,
    };
    return res.status(200).json({ data: normalized });
  } catch (error) {
    console.error("updatePhuQuoc error", error);
    return res.status(500).json({ message: "Failed to update PhuQuoc row" });
  }
};
