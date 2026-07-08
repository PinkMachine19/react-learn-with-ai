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

import countries from '../data/countries';
import CountryCard from  './CountryCard';

function CountryList() {
  if (countries.length === 0) {
    return <p className='empty-message'>No countries found</p>
  }

  return (
    <section className='country-list'> 
     {countries.map(c => (
      <CountryCard name={c.name} region={c.region}/>
     ))}
    </section>
  )
};

export default CountryList