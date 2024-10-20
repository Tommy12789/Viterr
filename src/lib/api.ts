import axios from "axios";

export interface Commune {
  nom: string;
  code: string;
  codeDepartement: string;
  codeRegion: string;
  codesPostaux: string[];
  population: number;
}

export async function searchCommunes(query: string): Promise<Commune[]> {
  try {
    const response = await axios.get<Commune[]>(
      "https://geo.api.gouv.fr/communes",
      {
        params: {
          nom: query,
          fields: "nom,code,codeDepartement,codeRegion,codesPostaux,population",
          boost: "population",
          limit: 5,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching communes:", error);
    return [];
  }
}

export async function searchCommunesCoords(query: string): Promise<Commune[]> {
  try {
    const response = await axios.get<Commune[]>(
      "https://geo.api.gouv.fr/communes",
      {
        params: {
          nom: query,
          fields: "centre",
          boost: "population",
          limit: 1,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching communes:", error);
    return [];
  }
}
