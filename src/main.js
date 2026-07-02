//session 01
// this creates the object country as const which can't be changed
// const country = {
//     name: "Canada",
//     capital: "Ottawa",
//     region: "Americas",
//     population: 38000000,
//     independent: true
// };

//const { use } = require("react")

// console.log(country.name);
// console.log(country.capital);
// console.log(country.region);

// const propertyToRead = "population";
// console.log(country[propertyToRead])

//ok in this const we made a copy to the original const but it only refered to the memory address
// making it mutable 
// const original = {name:"Canada", score: 0};
// const copy = original;
// copy.score = 99;
// console.log(original.score);
// console.log(copy.score);


// in this session we made a call to unexiting section and expected {undefined} since it didnt exit\
//after we add the field country.flag = "CA"
// console.log(country.flag);
// country.flag = "CA";
// console.log(country.flag);

// and here is the same scene 
// country.languages = {
//     official : ["English", "French"],
//     total: 2
// };

// console.log(country.languages.official)
// console.log(country.languages.official[0])

//session 02
//Lab objective: Create src/countries.js — an array of 3 country objects. 
// Iterate over it two ways, use 4 array methods, and prove you understand 
// mutating vs non-mutating behaviour.


// const countries = [
//     {id:1, name: "Canada" , region: "Americas", population : 50000000},
//     {id:2, name: "Japan", region: "Asia", population : 150000000},
//     {id:3, name:"India", region: "Asia", population: 1500000000}
// ]
// first for loop by indexing 
// for (let i=0; i < countries.length;i++) {
//     console.log ( countries[i].name, "-",countries[i].region)
// }
// for loop 
// for (const country of countries) {
//     console.log (country.name,"-",country.region)
// }

// slice, pop, push, 
// countries.push({id:4, name:"Brazil", region: "Americas", population: 200000000})
// for (let i=0; i< countries.length; i++) {
//     console.log(countries[i].name, "-", countries[i].region)
// }
// countries.pop()
// for (let i=0; i< countries.length; i++) {
//     console.log(countries[i].name, "-", countries[i].region)
// }

// const id_4 = {
//     id : 2,
//     name : "China",
//     region : "Asia",
//     population : 1500000000
// }

// countries.splice(0, 1, id_4)
// for (let i=0; i< countries.length; i++) {
//      console.log(countries[i].name, "-", countries[i].region)
// }

// countries.reverse()
// for (let i=0; i< countries.length; i++) {
//      console.log(countries[i].name, "-", countries[i].region)
// }


// non-mutating
//slice
// let copy = countries.slice(0, countries.length-1)
// for (let i=0; i< copy.length; i++) {
//      console.log(copy[i].name, "-", copy[i].region)
//  }
// console.log(countries.length)

// let copy = [
//     {id:1, name: "Canada" , region: "Americas", population : 50000000},
//     {id:2, name: "Japan", region: "Asia", population : 150000000},
//     {id:3, name:"India", region: "Asia", population: 1500000000}
// ]
// let value = countries.concat(copy)
// console.log(value.length)
// console.log(countries.length)

// find()
// const check = countries.find(country => country.id === 2)
// console.log(check)

// [...array]
// const copy = [...countries]
// for (let i=0; i< copy.length; i++) {
//       console.log(copy[i].name, "-", copy[i].region)
//   }

// copy[1].name = "Togo"
// console.log("------------------------")
// for (let i=0; i< copy.length; i++) {
//       console.log(copy[i].name, "-", copy[i].region)
//   }
// console.log("------------------------")
// for (let i=0; i< countries.length; i++) {
//       console.log(countries[i].name, "-", countries[i].region)
//   }


//session 03 
// Lab objective: Update src/countries.js to use .map() and .filter(). Extract names
// filter by region, chain both together.

// const countries = [
//       {id:1, name: "Canada" , region: "Americas", population : 50000000},
//       {id:2, name: "Japan", region: "Asia", population : 150000000},
//       {id:3, name:"India", region: "Asia", population: 1500000000}]


// // const countryNames = countries.map(c => {
//     return c.name;
// });
// console.log("Names:", countryNames)

// const summaries = countries.map(c => {
//     return c.name + "(" + c.region + ")" ;
// });
// console.log(summaries)

// const Asia = countries.filter(c => {
//     return c.region === "Asia";
// });
// console.log("Asia:", Asia.length, "of", countries.length)

// const bigCountry = countries.filter(c => {
//     return c.population > 100000000;
// });
// console.log("Big countries:", bigCountry.map(c=> c.name))

// const Asia = countries.filter(c =>
//    {return c.region === "Asia"})
//   .map(c=> {return c.name})
// console.log(Asia)

// console.log("Original still has", countries.length, "items");
// console.log("First item still:", countries[0].name);

// const forEachResult = countries.forEach(function(c) {
//   return c.name;  // this return does nothing useful
// });
// console.log("forEach returned:", forEachResult);  // undefined

// session 04
// const countryNames = countries.map(c =>c.name);
// console.log(countryNames)

//  const forEachResult = countries.forEach(c => c.name );
// console.log("forEach returned:", forEachResult);  // undefined

// countries.forEach(c => console.log(c.name, "-",c.region) )


// session 05
//Lab objective: Add destructuring and spread patterns to src/countries.js. Rewrite arrow function 
// parameters to destructure. Create modified copies of countries with spread.


// const countries = [
//       {id:1, name: "Canada" , region: "Americas", population : 50000000},
//       {id:2, name: "Japan", region: "Asia", population : 150000000},
//       {id:3, name:"India", region: "Asia", population: 1500000000}];

// const {name, region, population} = countries[0];
// console.log(name,"-",region,"-",population.toLocaleString());

// const names= countries.map(({name})=> name)
// console.log(names);

// const summaries = countries.map(({name,region,population}) => name +" ("+region+")-" + 
// population.toLocaleString() + "people");
// console.log(summaries);
// const canada = countries[0];
// const canadaCopy = {...canada};
// canadaCopy.name = "New canada";
// console.log(canada);
// console.log(canadaCopy)

//Update one property with spread — the React state pattern
// const canada = countries[0]
// const canadaCopy = {...canada, population: 10}
// console.log(canada)
// console.log(canadaCopy)

//Spread arrays — simulate adding a country without mutation
// const france = { id: 4, name: "France", region: "Europe", population: 68000000 };
// const expanded = [...countries, france]

// console.log(countries.length)
// console.log(expanded.length)


// Prove shallow copy limitation

// const canada = countries[0]
// const withlang = {...canada, languages : {offical: ["English", "French"]}}
// const copy = {...withlang}
// console.log(withlang.languages.offical)
// copy.languages.offical.push("Spanish")
// console.log(withlang.languages.offical)
// console.log(copy.languages.offical)

// const countryCP = [...countries]
// console.log(countries[0])
// console.log(countries[1].id)
// countryCP[1].id = 10
// countryCP[0]= 100000
// console.log("-------------")
// console.log(countries[0])
// console.log(countries[1].id)
// console.log(countryCP[0])


//session 06
//Lab objective: Move the countries array into src/data/countries.js as a default export. Add named 
// exports for helper data and functions. Import and use them from a separate file.

//import countries, {REGIONS,findById,filterByRegion} from './data/countries.js'

//Create src/main.js to import and use it
    // let C = countries
    // console.log(REGIONS)
    // const respone = findbyid(C,1)
    // console.log(respone)
    // console.log(filterbyregion(C, 'Americas'))

    // console.log("Countries:", countries.length);
    // console.log("Regions:", REGIONS);
    // console.log("Find id 2:", findById(countries, 2).name);
    // console.log("Americas:", filterByRegion(countries, "Americas").map(c => c.name));

//Try importing the default under a different name
    // import allCountries from './data/countries.js';
    // console.log(allCountries === countries); // true if same import — same module instance

import Cservice from './services/countryServices.js'
async function main() {
   try {
        const all = await Cservice.fetchAllCountries();
        console.log("All Countries:",all.map(c=> c.name ))

        const Cname = await Cservice.fetchAllById(2);
        console.log('Country 2:',Cname.name)

        const americas = await Cservice.fetchAllByRegion('Americas');
        console.log("Americas:",americas.map(c=> c.name))

        // Testing error 
        const missing = await Cservice.fetchAllById(999);
        console.log("Should not reach there:",missing)
    } catch (err) {
       console.error("Caught :",err.message);
        
   }
}

main();


