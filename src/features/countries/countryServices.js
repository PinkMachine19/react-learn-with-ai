/*
 * @typedef {object} Country
 * @property {number} id
 * @property {string} region 
 * @property {number} population
 * 
*/

import countries from './countries'

function delay(ms) {
  return new Promise (resolve => setTimeout(resolve,ms))
}


/** @returns {Promise<Country[]>}*/
export async function getCountries() {
  await delay(300)
  return[...countries]
}
/**
 * 
 * @param {number} id 
 * @returns {Promise<Country>}
 * @throws {Error}
 */
export async function getCountryById(id) {
  await delay(150)
  const country = countries.find(c=> c.id ===id)
  if(!country) throw Error (`Country ${id} Not Found`);
  return country    
}

/**
 * @param {string} region
 * @returns {Promise<Country[]>}
 */
export async function getCountriesByRegion(region){
  await delay(200)
  return countries.filter(c=> c.region === region)
}

