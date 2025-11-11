export interface Continent {
  id: number;
  name: string;
  description: string;
}

export interface Country {
  id: number;
  name: string;
  population: number;
  official_language: string;
  currency: string;
  continent_id: number;
  continent?: Continent;
}

export interface City {
  id: number;
  name: string;
  population: number;
  latitude: number;
  longitude: number;
  country_id: number;
  country?: Country;
}

// Dados das APIs externas
export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
}

export interface CountryAPI {
  name: { common: string };
  flags: { png: string };
  capital: string[];
  region: string;
}