// Définition des hubs métropolitains
const hubs: string[] = [
  "Paris",
  "Lyon",
  "Marseille",
  "Toulouse",
  "Nice",
  "Nantes",
  "Strasbourg",
  "Montpellier",
  "Bordeaux",
  "Lille",
  "Rennes",
  "Reims",
  "Saint-Étienne",
  "Toulon",
  "Le Havre",
  "Grenoble",
  "Dijon",
  "Angers",
  "Nîmes",
  "Villeurbanne",
  "Clermont-Ferrand",
  "Le Mans",
  "Aix-en-Provence",
  "Brest",
  "Limoges",
  "Tours",
  "Amiens",
  "Perpignan",
  "Metz",
  "Besançon",
  "Orléans",
  "Mulhouse",
  "Rouen",
  "Caen",
  "Nancy",
];

const CORRESPONDENCE_MARGIN = 0; // Marge en minutes pour les correspondances

// Type pour les segments de transport
interface TransportOption {
  start: string;
  end: string;
  price: number;
  type: string;
  duration: number; // Durée en minutes
  departureTime: string; // Heure de départ au format ISO (HH:mm)
  arrivalTime: string; // Heure d'arrivée au format ISO (HH:mm)
  segments?: TransportOption[]; // Pour les correspondances
  link?: string; // Lien pour réserver le trajet
}

// Fonction principale pour obtenir les options de transport avec hubs
export async function getTransportOptionsWithHubs(
  startCity: string,
  endCity: string,
  date: Date,
  flight: boolean,
  train: boolean,
  bus: boolean,
  blablacar: boolean,
): Promise<TransportOption[]> {
  let options: TransportOption[] = [];

  if (flight) {
    options.push(...(await callFlightAPI(startCity, endCity, date)));
  }
  if (train) {
    options.push(...(await callTrainAPI(startCity, endCity, date)));
  }
  if (bus) {
    options.push(...(await callBusAPI(startCity, endCity, date)));
  }
  if (blablacar) {
    options.push(...(await callBlablacarAPI(startCity, endCity, date)));
  }

  for (const hub of hubs) {
    if (hub !== startCity && hub !== endCity) {
      const toHubOptions = await getTransportOptionsForHub(
        startCity,
        hub,
        date,
        flight,
        train,
        bus,
        blablacar,
      );
      const fromHubOptions = await getTransportOptionsForHub(
        hub,
        endCity,
        date,
        flight,
        train,
        bus,
        blablacar,
      );

      toHubOptions.forEach((toHubOption) => {
        fromHubOptions.forEach((fromHubOption) => {
          const combined = combineSegments(toHubOption, fromHubOption);
          if (combined) {
            options.push(combined);
          }
        });
      });
    }
  }

  return options;
}

// Filtre pour obtenir les résultats les moins chers et avec peu de correspondances
export async function getFilteredTransportOptionsWithHubs(
  startCity: string,
  endCity: string,
  date: Date,
  flight: boolean,
  train: boolean,
  bus: boolean,
  blablacar: boolean,
): Promise<TransportOption[]> {
  let options: TransportOption[] = [];

  if (flight) {
    options.push(...(await callFlightAPI(startCity, endCity, date)));
  }
  if (train) {
    options.push(...(await callTrainAPI(startCity, endCity, date)));
  }
  if (bus) {
    options.push(...(await callBusAPI(startCity, endCity, date)));
  }
  if (blablacar) {
    options.push(...(await callBlablacarAPI(startCity, endCity, date)));
  }

  const maxCorrespondences = 2;

  for (const hub of hubs) {
    if (hub !== startCity && hub !== endCity) {
      const toHubOptions = await getTransportOptionsForHub(
        startCity,
        hub,
        date,
        flight,
        train,
        bus,
        blablacar,
      );
      const fromHubOptions = await getTransportOptionsForHub(
        hub,
        endCity,
        date,
        flight,
        train,
        bus,
        blablacar,
      );

      toHubOptions.forEach((toHubOption) => {
        fromHubOptions.forEach((fromHubOption) => {
          const combined = combineSegments(toHubOption, fromHubOption);
          if (
            combined &&
            combined.segments &&
            combined.segments.length <= maxCorrespondences
          ) {
            options.push(combined);
          }
        });
      });
    }
  }

  // Tri des résultats par prix croissant
  options.sort((a, b) => a.price - b.price);

  // Limite aux 10 trajets les moins chers
  return options.slice(0, 10);
}

// Fonction pour obtenir les options de transport entre une ville et un hub
export async function getTransportOptionsForHub(
  startCity: string,
  hub: string,
  date: Date,
  plane: boolean,
  train: boolean,
  bus: boolean,
  blablacar: boolean,
): Promise<TransportOption[]> {
  let options: TransportOption[] = [];

  if (plane) {
    options.push(...(await callFlightAPI(startCity, hub, date)));
  }
  if (train) {
    options.push(...(await callTrainAPI(startCity, hub, date)));
  }
  if (bus) {
    options.push(...(await callBusAPI(startCity, hub, date)));
  }
  if (blablacar) {
    options.push(...(await callBlablacarAPI(startCity, hub, date)));
  }

  return options;
}

// Blablacar API Mock
export async function callBlablacarAPI(
  startCity: string,
  endCity: string,
  date: Date,
): Promise<TransportOption[]> {
  const departureTime = generateRandomTime(0, 23); // Générer un horaire de départ entre 6h00 et 23h00
  const duration = 60; // Par exemple, 4 heures de trajet
  const arrivalTime = calculateArrivalTime(departureTime, duration);
  const price = generateRandomPrice(10, 70);

  return [
    {
      start: startCity,
      end: endCity,
      price: price, // Prix fictif
      type: "blablacar",
      duration: 60, // 4 heures fictives
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      link: `https://www.bus.com/trip?from=${startCity}&to=${endCity}&date=${date.toISOString()}`,
    },
  ];
}

function generateRandomTime(startHour: number, endHour: number): string {
  const hour = Math.floor(Math.random() * (endHour - startHour) + startHour);
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

function calculateArrivalTime(departureTime: string, duration: number): string {
  const [hour, minute] = departureTime.split(":").map(Number);
  const departureDate = new Date(1970, 0, 1, hour, minute);
  const arrivalDate = new Date(departureDate.getTime() + duration * 60000);

  const arrivalHour = arrivalDate.getHours().toString().padStart(2, "0");
  const arrivalMinute = arrivalDate.getMinutes().toString().padStart(2, "0");

  return `${arrivalHour}:${arrivalMinute}`;
}

function generateRandomPrice(minPrice: number, maxPrice: number): number {
  return Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
}

// Bus API Mock
export async function callBusAPI(
  startCity: string,
  endCity: string,
  date: Date,
): Promise<TransportOption[]> {
  const departureTime = generateRandomTime(0, 23); // Générer un horaire de départ entre 6h00 et 23h00
  const duration = 60; // Par exemple, 4 heures de trajet
  const arrivalTime = calculateArrivalTime(departureTime, duration);
  const price = generateRandomPrice(10, 50);

  return [
    {
      start: startCity,
      end: endCity,
      price: price, // Prix fictif
      type: "bus",
      duration: 60, // 4 heures fictives
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      link: `https://www.bus.com/trip?from=${startCity}&to=${endCity}&date=${date.toISOString()}`,
    },
  ];
}

// Train API Mock
export async function callTrainAPI(
  startCity: string,
  endCity: string,
  date: Date,
): Promise<TransportOption[]> {
  const departureTime = generateRandomTime(0, 23); // Générer un horaire de départ entre 6h00 et 23h00
  const duration = 60; // Par exemple, 4 heures de trajet
  const arrivalTime = calculateArrivalTime(departureTime, duration);
  const price = generateRandomPrice(10, 100);

  return [
    {
      start: startCity,
      end: endCity,
      price: price, // Prix fictif
      type: "train",
      duration: 60, // 4 heures fictives
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      link: `https://www.bus.com/trip?from=${startCity}&to=${endCity}&date=${date.toISOString()}`,
    },
  ];
}

// Flight API Mock
export async function callFlightAPI(
  startCity: string,
  endCity: string,
  date: Date,
): Promise<TransportOption[]> {
  const departureTime = generateRandomTime(0, 23); // Générer un horaire de départ entre 6h00 et 23h00
  const duration = 60; // Par exemple, 4 heures de trajet
  const arrivalTime = calculateArrivalTime(departureTime, duration);
  const price = generateRandomPrice(10, 150);

  return [
    {
      start: startCity,
      end: endCity,
      price: price, // Prix fictif
      type: "flight",
      duration: 60, // 4 heures fictives
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      link: `https://www.bus.com/trip?from=${startCity}&to=${endCity}&date=${date.toISOString()}`,
    },
  ];
}

export function combineSegments(
  segment1: TransportOption,
  segment2: TransportOption,
): TransportOption | null {
  // Convertir les heures de départ et d'arrivée en objets Date
  const arrivalTimeSegment1 = new Date(`1970-01-01T${segment1.arrivalTime}:00`);
  const departureTimeSegment2 = new Date(
    `1970-01-01T${segment2.departureTime}:00`,
  );

  // Calculer la différence en minutes entre l'arrivée du premier segment et le départ du second
  const timeDifference =
    (departureTimeSegment2.getTime() - arrivalTimeSegment1.getTime()) /
    (1000 * 60);

  // Si la différence est inférieure à la marge de correspondance, la correspondance n'est pas valide
  if (timeDifference < CORRESPONDENCE_MARGIN) {
    return null; // Pas assez de temps pour la correspondance
  }

  return {
    start: segment1.start,
    end: segment2.end,
    price: segment1.price + segment2.price,
    duration: segment1.duration + segment2.duration + timeDifference, // Inclure le temps d'attente pour la correspondance
    type: `${segment1.type}-${segment2.type}`,
    departureTime: segment1.departureTime,
    arrivalTime: segment2.arrivalTime,
    segments: [segment1, segment2],
  };
}
