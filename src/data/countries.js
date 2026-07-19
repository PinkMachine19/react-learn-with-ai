export const REGIONS = ['Asia','Americas','Europe','Oceania'];

export function findById(countries, id) {
    return countries.find(c => c.id === id)
}

export function filterByRegion(countries, region) {
    return countries.filter(c => c.region === region)
}


const countries = [
    {id:1, name: "Canada" , region: "Americas", population : 50000000},
    {id:2, name: "Japan", region: "Asia", population : 150000000},
    {id:3, name:"India", region: "Asia", population: 1500000000},
    {id:4, name:'Ghana', region:'Africa', population: 36000000}
];


export default countries



