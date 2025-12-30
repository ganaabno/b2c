import { Request, Response } from "express";
import { sql } from "../../utils/db";

export const getHainan = async (req: Request, res: Response) => {
  try {
    const rows = await sql`
      SELECT id, departure_date, adult_price, availability, child_two_to_five, child_six_to_eleven
      FROM hainan_price_table
      ORDER BY departure_date ASC
    `;

    return res.status(200).json({ data: rows });
  } catch (error) {
    console.error("getHainan error", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch Hainan price table" });
  }
};
