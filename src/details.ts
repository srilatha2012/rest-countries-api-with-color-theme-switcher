import { fetchCountryDetails } from "./apiService.js";

const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

if(!countryName) {
    throw new Error("Country name not found in URL");
}

const response = await fetchCountryDetails(countryName);
const country = response[0];
console.log(country);