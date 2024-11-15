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
  const plane = searchParams.get("plane");
  const train = searchParams.get("train");
  const bus = searchParams.get("bus");
  const blablacar = searchParams.get("car");

  console.log("Recherche de trajets de", startCity, "à", endCity, "le", date);

  if (!startCity || !endCity || !date) {
    return NextResponse.json(
      { error: "Paramètres de recherche manquants" },
      { status: 400 },
    );
  }

  try {
    console.log(plane, train, bus, blablacar);
    const options = await getTransportOptionsWithHubs(
      startCity,
      endCity,
      new Date(date),
      plane === "true",
      train === "true",
      bus === "true",
      blablacar === "true",
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
