import {useState} from 'react';
import CountryCard from '../features/countries/CountryCard';
import { getCountries } from '../features/countries/countryServices';



function CountryList({countries}) {
  const countriesContainer = getCountries()
  console.log(countriesContainer)

  const [favoriteIds, setFavoriteIds] = useState([]);


  function ToggleFavorite(id) {
    setFavoriteIds(current => 
      current.includes(id) ? current.filter(itemId => itemId !== id) : [...current, id]
    )
  }



  if (countries.length === 0) {
    return <p className='empty-message'>No countries found</p>
  }

  return (
  <section className='country-list'>
    
    {countries.map(c => (
      <CountryCard key={c.id} name={c.name} region={c.region} isFavorite={favoriteIds.includes(c.id)}
      onToggleFavorite={ () => ToggleFavorite(c.id)}/>
    ))}
  </section>
);
}


export default CountryList
