/*Create src/services/countryService.js with synchronous functions that encapsulate access to country data.*/

/*lab objective: Convert countryService.js to return delayed Promises and verify the functions with async/await and error handling. */

import countries from '../data/countries'

function delay(ms) {
  return new Promise (resolve => setTimeout(resolve,ms))
}

export async function getCountries() {
  await delay(300)
  return[...countries]
}
export async function getCountryById(id) {
  await delay(150)
  const country = countries.find(c=> c.id ===id)
  if(!country) throw Error (`Country ${country} Not Found`);
  return country    
}

export async function getCountriesByRegion(region){
  await delay(200)
  return countries.filter(c=> c.region === region)
}

