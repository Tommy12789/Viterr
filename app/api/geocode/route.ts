import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cityName = searchParams.get("cityName");

  if (!cityName) {
    return NextResponse.json(
      { error: "cityName query parameter is missing" },
      { status: 400 },
    );
  }

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
      return NextResponse.json({ lat, lng });
    } else {
      return NextResponse.json(
        { error: "Aucune donnée trouvée pour la ville" },
        { status: 404 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des coordonnées" },
      { status: 500 },
    );
  }
}
