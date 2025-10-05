import type { City } from "@/types/types";

export async function getCities(): Promise<City[]> {
    const res = await fetch('/api/cities');
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = (await res.json()) as City[];
    return data;
}