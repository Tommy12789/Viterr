"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrainFront, Plane, Bus, Car } from "lucide-react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import axios from "axios";
import { useTheme } from "next-themes";

const OPENCAGE_API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

interface TransportOption {
  start: string;
  end: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  type: string;
  link: string;
  segments?: TransportOption[];
}

export default function ResultsPage() {
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState<number>(0);
  const [directionsResponses, setDirectionsResponses] = useState<
    google.maps.DirectionsResult[]
  >([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const startCity = searchParams?.get("startCity") || "";
  const endCity = searchParams?.get("endCity") || "";
  const date = searchParams?.get("date") || "";

  const [results, setResults] = useState<TransportOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  const mapStyles = [
    {
      elementType: "geometry",
      stylers: [{ color: "#212121" }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#212121" }],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#181818" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#1b1b1b" }],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8a8a8a" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#373737" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#3c3c3c" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#4e4e4e" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#3d3d3d" }],
    },
  ];

  useEffect(() => {
    if (startCity && endCity && date) {
      fetch(`/api/route?startCity=${startCity}&endCity=${endCity}&date=${date}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setResults(data.routes);
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des résultats :",
            error,
          );
          setError("Erreur lors de la récupération des résultats");
        });
    }
  }, [startCity, endCity, date]);

  // Fonction pour obtenir les coordonnées des points du trajet sélectionné
  const getRouteCoordinates = async (selectedRoute: TransportOption) => {
    try {
      const directions: google.maps.DirectionsResult[] = [];

      if (selectedRoute.segments) {
        for (const segment of selectedRoute.segments) {
          const startCoords = await getCoordinates(segment.start);
          const endCoords = await getCoordinates(segment.end);
          const directionsResult = await requestDirections(
            startCoords,
            endCoords,
          );
          if (directionsResult) directions.push(directionsResult);
        }
      } else {
        const startCoords = await getCoordinates(selectedRoute.start);
        const endCoords = await getCoordinates(selectedRoute.end);
        const directionsResult = await requestDirections(
          startCoords,
          endCoords,
        );
        if (directionsResult) directions.push(directionsResult);
      }

      setDirectionsResponses(directions);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des coordonnées du trajet :",
        err,
      );
    }
  };

  // Requête directions avec l'API Google Maps Directions
  const requestDirections = (
    startCoords: [number, number],
    endCoords: [number, number],
  ): Promise<google.maps.DirectionsResult | null> => {
    return new Promise((resolve, reject) => {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: startCoords[0], lng: startCoords[1] },
          destination: { lat: endCoords[0], lng: endCoords[1] },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            resolve(result);
          } else {
            console.error(`Erreur lors de la requête directions: ${status}`);
            resolve(null);
          }
        },
      );
    });
  };

  // Mettre à jour les coordonnées du trajet sélectionné
  useEffect(() => {
    if (results.length > 0) {
      getRouteCoordinates(results[selected]);
    }
  }, [selected, results]);

  async function getCoordinates(cityName: string): Promise<[number, number]> {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: cityName,
            key: OPENCAGE_API_KEY,
          },
        },
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        return [lat, lng];
      } else {
        throw new Error("Aucune donnée trouvée pour la ville");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des coordonnées :", error);
      throw error;
    }
  }

  if (!startCity || !endCity || !date) {
    return <p>Paramètres de recherche manquants.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleInvertCities = () => {
    router.push(
      `/results?startCity=${endCity}&endCity=${startCity}&date=${date}`,
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen overflow-hidden">
        <Header />
        <div className="px-4">
          <div className="rounded-md bg-zinc-100 shadow-lg dark:bg-zinc-800">
            <div className="rounded-t-md bg-zinc-50 px-4 py-4 text-center text-xl shadow-md dark:bg-zinc-800">
              <div className="flex w-1/2 gap-4">
                <Input
                  className="bg-zinc-200 dark:bg-zinc-800"
                  type="text"
                  defaultValue={startCity}
                ></Input>
                <div className="w-28">
                  <Button
                    onClick={handleInvertCities}
                    className="border-zinc-500 bg-zinc-200 p-2 hover:border hover:bg-zinc-300 dark:border-zinc-900 dark:bg-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    variant={"ghost"}
                  >
                    <ArrowLeftRight />
                  </Button>
                </div>
                <Input
                  className="bg-zinc-200 dark:bg-zinc-800"
                  type="text"
                  defaultValue={endCity}
                ></Input>
              </div>
            </div>
            <div className="flex">
              <ul className="flex h-[calc(100vh-14.5rem)] w-1/3 flex-col gap-2 overflow-y-auto rounded-bl-md p-4 dark:bg-zinc-700">
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <li
                      key={index}
                      onClick={() => setSelected(index)}
                      className={cn(
                        "dark-shadow-zinc-50 cursor-pointer rounded-lg px-6 py-6 shadow-md hover:bg-zinc-200 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800",
                        {
                          "bg-zinc-200 text-zinc-900 dark:bg-zinc-800":
                            index === selected,
                          "bg-zinc-50 text-zinc-800": index !== selected,
                        },
                      )}
                    >
                      {result.segments ? (
                        <>
                          {" "}
                          <div className="mb-4 flex flex-row font-semibold">
                            {result.segments.map(
                              (segment: TransportOption, i: number) =>
                                i === 0
                                  ? `${segment.start} → ${segment.end}`
                                  : `, ${segment.start} → ${segment.end}`,
                            )}{" "}
                          </div>
                          <div className="flex justify-between">
                            <div className="flex gap-3">
                              {result.segments.map(
                                (segment: TransportOption, i: number) =>
                                  segment.type === "train" ? (
                                    <TrainFront />
                                  ) : segment.type === "flight" ? (
                                    <Plane />
                                  ) : segment.type === "bus" ? (
                                    <Bus />
                                  ) : (
                                    <Car />
                                  ),
                              )}
                              <h3>
                                {
                                  (result.duration / 60)
                                    .toString()
                                    .split(".")[0]
                                }
                                h {result.duration % 60}min
                              </h3>
                            </div>
                            <h3>{result.price} €</h3>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <h2 className="font-semibold">
                            {result.start} → {result.end}
                          </h2>
                          <div className="flex justify-between">
                            <div className="flex gap-3">
                              {result.type === "train" ? (
                                <TrainFront />
                              ) : result.type === "flight" ? (
                                <Plane />
                              ) : result.type === "bus" ? (
                                <Bus />
                              ) : (
                                <Car />
                              )}
                              <h3>
                                {
                                  (result.duration / 60)
                                    .toString()
                                    .split(".")[0]
                                }
                                h{" "}
                                {result.duration % 60 > 0 &&
                                  (result.duration % 60) + "min"}
                              </h3>
                            </div>
                            <h3>{result.price} €</h3>
                          </div>
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <p>Aucun résultat trouvé.</p>
                )}
              </ul>
              <div className="h-[calc(100vh-14.5rem)] w-2/3 bg-white text-center shadow-md">
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY as string}>
                  <GoogleMap
                    mapContainerStyle={{ height: "100%", width: "100%" }}
                    center={{ lat: 48.8566, lng: 2.3522 }}
                    zoom={6}
                    options={{
                      fullscreenControl: false,
                      styles: theme === "dark" ? mapStyles : undefined,
                      controlSize: 24,
                      streetViewControl: false,
                      mapTypeControl: false,
                    }}
                  >
                    {directionsResponses.map((directions, index) => (
                      <DirectionsRenderer key={index} directions={directions} />
                    ))}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </Suspense>
  );
}
