import { DataError, NetworkError } from "./errorHandler.js";
export async function fetchAllCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital");
    // Check if the API request is successful
    if (!response.ok) {
        throw new NetworkError("Failed to fetch coutries");
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new DataError("Invalid data for countries");
    }
    return data;
}
export async function fetchCountryDetails(name) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`);
    // Check if the API request is successful
    if (!response.ok) {
        throw new NetworkError(`Failed to fetch country ${name}`);
    }
    return await response.json();
}
export async function fetchBorderCountries(codes) {
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes.join(",")}&fields=name,cca3`);
    // Check if the API request is successful
    if (!response.ok) {
        throw new NetworkError(`Failed to fetch country ${name}`);
    }
    return await response.json();
}
//# sourceMappingURL=apiService.js.map