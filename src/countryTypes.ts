// API data format raw country data returned by REST Countries API
export interface CountryApiData {
    name: {
        common: string;
    };
    population: number;
    region: string;
    capital?: string[];
    flags: {
        png: string;
    };
}

//simplified country data used in the application UI
export interface Country {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
}