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
