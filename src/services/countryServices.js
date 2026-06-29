/*Lab objective: Create src/services/countryService.js — a fake async data layer that wraps the country array in a simulated delay. Add named and default exports. Call it from a main.js using async/await with error handling.*/

import countries from "../data/countries.js"

function delay(ms) {
  return new Promise (resolve => setTimeout(resolve,ms))
};

export async function fetchAllCountries() {
  await delay(300);
  return [...countries]; 
};

export async function fetchAllById(id) {
  await delay(150);
  const found  = countries.find(c=> c.id  === id)
  if (!found) throw new Error (`Country with Id:${id} is not found`);
  return found
};

export async function fetchAllByRegion(region) {
  await delay(200);
  const found_region = countries.filter(c=> c.region === region)
  if (!found_region) throw new Error (`Country with Region:${region} does not exit`)
  return found_region
};

const countryService = {fetchAllCountries , fetchAllById, fetchAllByRegion}
export default countryService