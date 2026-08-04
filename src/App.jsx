import CountryList from './component/CountryList';
import countries from './data/countries';
import { useState } from 'react';


/* Lab objective: Move searchTerm, its handler, and the <input> from CountryList to App. Filter countries in App and pass the result down as a countries prop. */

function App() {
  const [searchTerm ,setSearchTerm] = useState('')

  function handleSearchTerm(event) {
    setSearchTerm(event.target.value)
  }

  const filterdCountries =  countries.filter(c => 
    c.name.includes(searchTerm)
  )

  return (
    <div>
      <h1>Countries</h1>
      <input
         type='text'
         value = {searchTerm}
         onChange={handleSearchTerm}
         placeholder='Search Countries.....'
      />
      <CountryList countries={filterdCountries} />
    </div>
  );
}

export default App;
