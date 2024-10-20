import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cityName } = req.query;

  try {
    const response = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: cityName,
          key: OPENCAGE_API_KEY,
        },
      },
    );

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      res.status(200).json({ lat, lng });
    } else {
      res.status(404).json({ error: "Aucune donnée trouvée pour la ville" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des coordonnées" });
  }
}
