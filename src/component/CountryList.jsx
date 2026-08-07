// import CountryCard from './CountryCard';

// function CountryList() {
//     const countries = [
//     {name : 'Japan', region :'Asia'},
//     {name: 'India', region: 'Asia'},
//     {nmae: 'Ghana', region: 'Africa'},
//     {name: 'Usa', region: 'Americas'}
//   ]
//   if (countries.length === 0 ) {
//     return <p className='empty-message'>No countries here</p>;
//   } else {
//       return (
//             <section className="country-list">
//               <CountryCard name={countries[0].name} region={countries[0].region} />
//               <CountryCard name={countries[1].name} region={countries[1].region} />
//               <CountryCard name={countries[2].name} region={countries[2].region} />
//               <CountryCard name={countries[3].name} region={countries[3].region} />
//               <p>{countries.length} countries</p>
//             </section>
//           );
//   }

// }

// export default CountryList;

/*
Lab objective: Add a countries array to CountryList.
When it is empty, show No countries found. When it has items,
show cards (still written manually — map comes in Session 14).
*/



//using the .map() function

//Lab objective: Import countries from src/data/countries.js
// and render all of them with .map() in CountryList.

// Session 20 — Lab objective: add a search input that controls its own
// value. It does not filter the list yet — that is Session 21, once the
// state has somewhere to be shared from. Today is only the controlled
// input pattern: value={searchTerm} + onChange={handleSearchChange}.

// Session 21 — Lab objective: lift state up. CountryList no longer imports
// countries or owns searchTerm — App does both now, and passes the
// already-filtered list down as the countries prop. This component only
// renders what it's given; it doesn't know or care that it's filtered.


import CountryCard from './CountryCard';
import { getCountries } from '../services/countryServices';

function CountryList({countries}) {
  const countriesContainer = getCountries()
  console.log(countriesContainer)

  if (countries.length === 0) {
    return <p className='empty-message'>No countries found</p>
  }

  return (
  <section className='country-list'>
    
    {countries.map(c => (
      <CountryCard key={c.id} name={c.name} region={c.region}/>
    ))}
  </section>
);
}


export default CountryList
