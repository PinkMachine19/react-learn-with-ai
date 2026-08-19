import { afterEach, expect,test,vi } from "vitest";

vi.mock('../src/features/countries/countries', ()=> ({
  default: [
    { id: 1, name: 'Canada', region: 'Americas', population: 50000000 },
    { id: 2, name: 'Japan', region: 'Asia', population: 150000000 }
  ]
}))

import {getCountries, getCountryById, getCountriesByRegion} from '../src/features/countries/countryServices.js'

afterEach( ()=> vi.useRealTimers())

test('getCountries resolves a fresh Country array', async () => {
  const first = await getCountries();
  const second = await getCountries();

  expect(first).toHaveLength(2);
  expect(first[0]).toEqual({
    id: 1, name: 'Canada',
    region: 'Americas', population: 50000000
  });
  expect(first).not.toBe(second);
});

test('Testing know ids', async ()=> {
  await expect(getCountryById(2)).resolves.toMatchObject({
    id: 2,
    name: "Japan"
  })
  })

test('Reject throws' , async ()=>{
  await expect(getCountryById(999)).rejects.toThrow(
    'Country 999 Not Found'
  )
})

test('testing region', async ()=>{
  await expect(getCountriesByRegion('Asia')).resolves.toEqual([{
    id:2 , name:"Japan", region:'Asia', population: 150000000
  }])
})

test('testing region return []', async ()=>{
  await expect(getCountriesByRegion('Eurpo')).resolves.toEqual([])
})

test('fake promise timer', async ()=> {
  vi.useFakeTimers();

  const assertion = expect(getCountries()).resolves.toHaveLength(2)

  await vi.advanceTimersByTimeAsync(300);
  await assertion 
})