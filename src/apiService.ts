import { DataError, NetworkError } from "./errorHandler.js";

export async function fetchAllCountries() {
    const response =  await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital");
    
      // Check if the API request is successful
    if(!response.ok) {
        throw new NetworkError("Failed to fetch coutries");
    }
    
    if(Array.isArray(response)) {
        throw new DataError("Invalid data for countries")
    }

    return await response.json();
  
}

export async function fetchCountryDetails(name : string) {
    const response =  await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`)
    
    // Check if the API request is successful
    if(!response.ok) {
        throw new NetworkError(`Failed to fetch country ${name}`);
    }

      return await response.json();
  
}
