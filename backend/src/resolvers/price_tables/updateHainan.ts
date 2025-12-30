import { Request, Response } from "express";
import { sql } from "../../utils/db";

export const updateHainan = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    departure_date,
    five_star_adult_price,
    four_star_adult_price,
    availability,
    child_two_to_five,
    four_star_child_six_to_eleven,
    five_star_child_six_to_eleven
  } = req.body;

  if (!id) return res.status(400).json({ message: "Missing id" });

  try {
    const [existing] =
      await sql`SELECT id FROM hainan_price_table WHERE id = ${id}`;
    if (!existing) return res.status(404).json({ message: "Row not found" });

    const [updated] = await sql`
      UPDATE hainan_price_table
      SET
        departure_date = ${departure_date},
        five_star_adult_price = ${five_star_adult_price},
        four_star_adult_price = ${four_star_adult_price},
        availability = ${availability},
        child_two_to_five = ${child_two_to_five},
        four_star_child_six_to_eleven = ${four_star_child_six_to_eleven},
        five_star_child_six_to_eleven = ${five_star_child_six_to_eleven}
      WHERE id = ${id}
      RETURNING id, departure_date, five_star_adult_price, four_star_adult_price, availability, child_two_to_five, five_star_child_six_to_eleven ,four_star_child_six_to_eleven
    `;

    return res.status(200).json({ data: updated });
  } catch (error) {
    console.error("updateHainan error", error);
    return res.status(500).json({ message: "Failed to update Hainan row" });
  }
};
