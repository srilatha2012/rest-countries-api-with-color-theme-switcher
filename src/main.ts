import { fetchAllCountries } from "./apiService.js"
import type { CountryApiData, Country } from "./countryTypes.js";

//Get required DOM elements from the page
const gridContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const regionFilter = document.getElementById("filter-select") as HTMLSelectElement;
const toggleTheme = document.getElementById("theme-toggle");

//Stop execution if required elements are missing
if (!gridContainer || !searchInput || !regionFilter) {
    throw new Error("Required DOM elements not found");
}

if (!toggleTheme) {
    throw new Error("Theme toggle element not found");
}

//toggle dark mode class on body when the user click on the theme
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle("dark-mode");
});

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
    if (!gridContainer) {
        throw new Error("Grid container not found");
    }
    gridContainer.innerHTML = "";

    countryList.forEach((country) => {
        //create div element and set id and name attributes
        const card = document.createElement("div");
        card.className = "country-card";

        //set data and flag
        card.innerHTML = `
        <img class = "country-flag" src="${country.flag}" alt="${country.name} flag">
        <div class ="country-content">
        <h2>${country.name}</h2>
        <p><span class="label">Population:</span> <span class="value">${country.population}</span></p>
        <p><span class="label">Region:</span> <span class="value">${country.region}</span></p>
        <p><span class="label">Capital:</span> <span class="value">${country.capital}</span></p>
     </div>
     `;
        // add event listerner when card is clicked
        card.addEventListener('click', () => {
            //handle clicks from child cards
            window.location.href = `details.html?name=${encodeURIComponent(country.name)}`
        });
        gridContainer.appendChild(card);
    });

}

//Filter countries based on the search input and selected region 
function filterCountries(): void {
    //get the users search text and selected region from the dropdown
    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedRegion = regionFilter.value;


    const filteredCountries = countries.filter((country) => {
        //check whether the country name includes the search box
        const searchMatch = country.name.toLowerCase().includes(searchValue);

        // if no region selected, get all regions otherwise match the selected region
        const regionMatch = selectedRegion === "" || country.region === selectedRegion;

        //keep only those countries that match both search and region filter
        return searchMatch && regionMatch;
    });

    // re-render the page with only the filtered countries
    renderCountries(filteredCountries);
}

//Re-filter countries whenever the user types in the search box
searchInput.addEventListener("input", filterCountries);

//Re-filter countries whenever the user changes the region dropdown
regionFilter.addEventListener("change", filterCountries);

//show all countries when the page first loads
renderCountries(countries);
