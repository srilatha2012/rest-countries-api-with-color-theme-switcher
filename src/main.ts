import { fetchAllCountries } from "./apiService.js"
import type { CountryApiData, Country } from "./countryTypes.js";

const gridContainer = document.getElementById("countries-container");

// fetch Countries data from the API
const result: CountryApiData[] = await fetchAllCountries();
const countries: Country[] = result.map((item) => ({
    name: item.name.common,
    population: item.population,
    region: item.region,

    //if the capital exists, get the first value. if capital is missing or undefined, do not crash return N/A
    capital: item.capital?.[0] ?? "N/A",

    flag: item.flags.png
}));

countries.forEach(country => {

    //create div element and set id and name attributes
    const card = document.createElement("div");
    
    card.className = "country-card";

    //set data and flag
    card.innerHTML = `
     <img class = "country-flag" src="${country.flag}" alt="${country.flag} flag">
     <div class ="country-content">
     <h2>${country.name}</h2>
     <p><span class="lable">Population:</span> <span class="value">${country.population}</span></p>
     <p><span class="lable">Region:</span> <span class="value">${country.region}</span></p>
     <p><span class="lable">Capital:</span> <span class="value">${country.capital}</span></p>
     </div>
     `;
    //throw if grid container is not null
    if (!gridContainer) {
        throw new Error("Grid container not found");
    }
    gridContainer.appendChild(card);

});



