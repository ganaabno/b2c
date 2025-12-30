import { Request, Response } from "express";
import { sql } from "../../utils/db";

export const getHoChiMinhPhuQuoc = async (req: Request, res: Response) => {
  try {
    const rows = await sql`
      SELECT * FROM ho_chi_minh_phu_quoc_price_table
      ORDER BY departure_date ASC
    `;

    const normalized = rows.map((r: any) => ({
      ...(r || {}),
      id: r?.id ?? r?.ID ?? null,
    }));

    return res.status(200).json({ data: normalized });
  } catch (error) {
    console.error("getHoChiMinhPhuQuoc error", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch HoChiMinhPhuQuoc price table" });
  }
};
