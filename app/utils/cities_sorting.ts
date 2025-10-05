import type { City } from "@/types/types";
import { getCities } from "./fetch_cities";

export async function getSortedCities(minPopulationValue = 50000): Promise<City[]> {
    const cities = await getCities();
    const filteredCities = cities.filter(el => +el.population > minPopulationValue);
    const maxPopulationCity: City = filteredCities.sort((a, b) => Number(b.population) - Number(a.population))[0];
    return [maxPopulationCity, ...filteredCities.filter(el => el != maxPopulationCity).sort((a, b) => a.city.localeCompare(b.city, 'ru'))]
}

