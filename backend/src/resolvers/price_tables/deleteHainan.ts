import { Request, Response } from "express";
import { sql } from "../../utils/db";

export const deleteHainan = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Missing id" });

  try {
    const [existing] =
      await sql`SELECT id FROM hainan_price_table WHERE id = ${id}`;
    if (!existing) return res.status(404).json({ message: "Row not found" });

    await sql`DELETE FROM hainan_price_table WHERE id = ${id}`;

    return res.status(204).end();
  } catch (error) {
    console.error("deleteHainan error", error);
    return res.status(500).json({ message: "Failed to delete Hainan row" });
  }
};
