import { Request, Response } from "express";
import { sql } from "../../utils/db";

export const updateHoChiMinhPhuQuoc = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { departure_date, adult_price, availability, child_two_to_four, child_five_to_eleven } = req.body;

  if (!id) return res.status(400).json({ message: "Missing id" });

  try {
    let [existing] =
      await sql`SELECT * FROM ho_chi_minh_phu_quoc_price_table WHERE id = ${id}`;
    if (!existing) {
      try {
        [existing] =
          await sql`SELECT * FROM ho_chi_minh_phu_quoc_price_table WHERE "ID" = ${id}`;
      } catch (e) {
        if (!existing) return res.status(404).json({ message: "Row not found" });
      }
    }
    if (!existing) return res.status(404).json({ message: "Row not found" });

    let updated: any = null;
    try {
      const [u] = await sql`
        UPDATE ho_chi_minh_phu_quoc_price_table
        SET departure_date = ${departure_date}, adult_price = ${adult_price}, availability = ${availability}, child_two_to_four=${child_two_to_four}, child_five_to_eleven =${child_five_to_eleven }
        WHERE id = ${id}
        RETURNING *
      `;
      updated = u;
    } catch (e) {
      const [u2] = await sql`
        UPDATE ho_chi_minh_phu_quoc_price_table
        SET departure_date = ${departure_date}, adult_price = ${adult_price}, availability = ${availability}, child_two_to_four=${child_two_to_four}, child_five_to_eleven =${child_five_to_eleven }
        WHERE id = ${id}
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
    console.error("updateHoChiMinhPhuQuoc error", error);
    return res
      .status(500)
      .json({ message: "Failed to update HoChiMinhPhuQuoc row" });
  }
};
