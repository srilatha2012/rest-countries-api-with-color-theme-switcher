export async function fetchAllCountries() {
    const response =  await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital");
    if(!response.ok) {
        throw new Error("Network issue");
    }
    return await response.json();
  
}
