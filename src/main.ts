import { fetchAllCountries } from "./apiService.js"
import type { CountryApiData, Country } from "./countryTypes.js";

//Get required DOM elements from the page
const gridContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const regionFilter = document.getElementById("filter-select") as HTMLInputElement;

//Stop execution if required elements are missing
if (!gridContainer || !searchInput || !regionFilter) {
    throw new Error("Required DOM elements not found");
}

// fetch all Countries data from the API
const result: CountryApiData[] = await fetchAllCountries();

//convert the raw API data into a simpler Country object
const countries: Country[] = result.map((item) => ({
    name: item.name.common,
    population: item.population,
    region: item.region,
    capital: item.capital?.[0] ?? "N/A", //if the capital exists, get the first value. if capital is missing or undefined, do not crash return N/A
    flag: item.flags.png
}));

//Render the given list of countries into the page
function renderCountries(countryList: Country[]): void {
    //throw if grid container is not null
    if (!gridContainer) {
        throw new Error("Grid container not found");
    }
    if (gridContainer != null)
        gridContainer.innerHTML = "";

    countryList.forEach((country) => {
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
        // add event listerner when card is clicked
        card.addEventListener('click', (event) => {
            //handle clicks from child cards
            window.location.href = `details.html?name=${encodeURIComponent(country.name)}`
        });
        gridContainer.appendChild(card);

    });

}

//Filter countries based on the search input value

function filterCountries(): void {
    const searchValue = searchInput.value.toLocaleLowerCase().trim();
    const filteredCountries = countries.filter((country)=> 
    country.name.toLowerCase().includes(searchValue));

    renderCountries(filteredCountries);
}

//Re-filter countries whenever the user types in the search box
searchInput.addEventListener("input",filterCountries);

//show all countries when the page first loads
renderCountries(countries);





