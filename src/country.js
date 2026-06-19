// this creates the object country as const which can't be changed
const country = {
    name: "Canada",
    capital: "Ottawa",
    region: "Americas",
    population: 38000000,
    independent: true
};

// console.log(country.name);
// console.log(country.capital);
// console.log(country.region);

// const propertyToRead = "population";
// console.log(country[propertyToRead])

//ok in this const we made a copy to the original const but it only refered to the memory address
// making it mutable 
const original = {name:"Canada", score: 0};
const copy = original;
copy.score = 99;
// console.log(original.score);
// console.log(copy.score);


// in this session we made a call to unexiting section and expected {undefined} since it didnt exit\
//after we add the field country.flag = "CA"
console.log(country.flag);
country.flag = "CA";
console.log(country.flag);

// and here is the same scene 
country.languages = {
    official : ["English", "French"],
    total: 2
};

// console.log(country.languages.official)
// console.log(country.languages.official[0])