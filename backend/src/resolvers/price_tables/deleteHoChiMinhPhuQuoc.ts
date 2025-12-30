import { Request, Response } from "express";
import { sql } from "../../utils/db";

export const deleteHoChiMinhPhuQuoc = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Missing id" });

  try {
    const [deleted] =
      await sql`DELETE FROM ho_chi_minh_phu_quoc_price_table WHERE id = ${id} RETURNING id`;
    if (deleted) return res.status(204).end();

    try {
      const [deleted2] =
        await sql`DELETE FROM ho_chi_minh_phu_quoc_price_table WHERE "ID" = ${id} RETURNING "ID" as id`;
      if (deleted2) return res.status(204).end();
    } catch (e) {}

    return res.status(404).json({ message: "Row not found" });
  } catch (error) {
    console.error("deleteHoChiMinhPhuQuoc error", error);
    return res
      .status(500)
      .json({ message: "Failed to delete HoChiMinhPhuQuoc row" });
  }
};
