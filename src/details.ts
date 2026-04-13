import { fetchCountryDetails, fetchBorderCountries } from "./apiService.js";
import type { CountryDetailsApiData, CountryDetails } from "./countryTypes.js"

//Get required DOM elements from the page
const backButton = document.getElementById("back-button");
const detailsContainer = document.getElementById("country-details-container");
const toggleTheme = document.getElementById("theme-toggle");

// Read the selected country name from the URL
const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

//Stop execution if required elements are missing
if (!toggleTheme) {
    throw new Error("Theme toggle element not found");
}

if (!backButton) {
    throw new Error("Back button not found");
}

if (!detailsContainer) {
    throw new Error("Details Container Not found");
}


//Toggle dark mode class on body when the user click on the theme
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle("dark-mode");
});

//Navigate back to the main page when the back button is called
backButton.addEventListener('click', () => {
    window.location.href = "./index.html";
});

//Fetch country details and render the detail page
async function main(): Promise<void> {
    try {
        //Make sure country name exists in the URL
        if (!countryName) {
            throw new Error("Country name not found in URL");
        }
        //Fetch full details for the selected country
        const response: CountryDetailsApiData[] = await fetchCountryDetails(countryName);

        if (response.length === 0) {
            throw new Error("No Country Details found");
        }

        const item: CountryDetailsApiData = response[0]!;
        
        //Transform API data into a simple structure for rendering
        const countryDetails: CountryDetails = {
            name: item.name.common,
            nativeName: item.name.nativeName
                ? Object.values(item.name.nativeName)[0]?.common ?? "N/A"
                : "N/A",
            flag: item.flags.png,
            population: item.population,
            region: item.region,
            subregion: item.subregion ?? "N/A",
            capital: item.capital?.[0] ?? "N/A",
            tld: item.tld?.join(",") ?? "N/A",
            currencies: item.currencies ? Object.values(item.currencies).map((currency) => currency.name).join(",") : "N/A",
            languages: item.languages ? Object.values(item.languages).join(",") : "N/A",
            borders: item.borders ?? []
        };

        //fetch border country names if border exists
        let borderCountries: { name: { common: string }, cca3: string }[] = [];

        if (countryDetails.borders.length > 0) {
            borderCountries = await fetchBorderCountries(countryDetails.borders);
        }
        //Render country details into the page
        detailsContainer!.innerHTML = `
          <div class ="country-details-card">
          <img class="details-flag" src= "${countryDetails.flag}" alt="${countryDetails.name} flag">
          <div class ="details-content">
          <h1>${countryDetails.name}</h1>
        
         <div class="details-meta">
            <div class="details-column">
              <p><span class="label">Native Name:</span> <span class="value">${countryDetails.nativeName}</span></p>
              <p><span class="label">Population:</span> <span class="value">${countryDetails.population}</span></p>
              <p><span class="label">Region:</span> <span class="value">${countryDetails.region}</span></p>
              <p><span class="label">Sub Region:</span> <span class="value">${countryDetails.subregion}</span></p>
              <p><span class="label">Capital:</span> <span class="value">${countryDetails.capital}</span></p>
            </div>
            <div class="details-column">
              <p><span class="label">Top Level Domain:</span> <span class="value">${countryDetails.tld}</span></p>
              <p><span class="label">Currencies:</span> <span class="value">${countryDetails.currencies}</span></p>
              <p><span class="label">Languages:</span> <span class="value">${countryDetails.languages}</span></p>
            </div>
        </div>

        <div class="border-countries-section">
           <span class="label">Border Countries:</span>
           <div class="border-countries-list">
            ${
                borderCountries.length > 0
                ? borderCountries
                    .map(
                      (borderCountry) => `
                    <a class= "border-country" href="./details.html?name=${encodeURIComponent(borderCountry.name.common)}"
                    >
                    ${borderCountry.name.common}
                    </a>
                    `
                    ).join("")
                : `<span class="value">N/A</span>`}
        </div>
      </div>
     </div>
    </div>
`;
    } catch (error) {
        console.error("Error loading Countries", error);
    }
}

//Run the application
main()

