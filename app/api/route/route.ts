import { NextResponse } from "next/server";
import {
  getFilteredTransportOptionsWithHubs,
  getTransportOptionsWithHubs,
} from "@/lib/transport";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startCity = searchParams.get("startCity");
  const endCity = searchParams.get("endCity");
  const date = searchParams.get("date");

  console.log("Recherche de trajets de", startCity, "à", endCity, "le", date);

  if (!startCity || !endCity || !date) {
    return NextResponse.json(
      { error: "Paramètres de recherche manquants" },
      { status: 400 },
    );
  }

  try {
    const options = await getTransportOptionsWithHubs(
      startCity,
      endCity,
      new Date(date),
    );
    return NextResponse.json({ routes: options });
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des résultats" },
      { status: 500 },
    );
  }
}
