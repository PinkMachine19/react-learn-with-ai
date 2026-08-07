/*Create src/services/countryService.js with synchronous functions that encapsulate access to country data.*/

import countries from '../data/countries'

export function getCountries() {
  return[...countries]
}

export function getCountryById(id) {
  return countries.find(c=> c.id === id)
}

export function getCountriesByRegion(region) {
  return countries.filter(c => c.region === region)
}