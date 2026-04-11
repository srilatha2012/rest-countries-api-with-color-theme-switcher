async function fetchAllCountries() {
    const response =  await fetch(" https://restcountries.com/v3.1/all?fields=name,capital,currencies");
    const data = await response.json();
    console.log(data);

}
fetchAllCountries();