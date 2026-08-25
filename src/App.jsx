import CountryList from "./component/CountryList.jsx"
import countries from './features/countries/countries';
import useCountrySearch from './features/countries/useCountrySearch.js';
import Button from './component/ui/button.jsx';


/* Lab objective: Move searchTerm, its handler, and the <input> from CountryList to App. Filter countries in App and pass the result down as a countries prop. */

function App() {
 

const {
  searchTerm,
  handleSearchTerm,
  filteredCountries,
  resultCount,
  clearSearch
} = useCountrySearch(countries);
  
  return (
    
    <div>
      <h1>Countries</h1>
      <input
         type='text'
         value = {searchTerm}
         onChange={handleSearchTerm}
         placeholder='Search Countries.....'
      />
      <Button onClick={clearSearch}>Clear search</Button>
      <p>{resultCount} {resultCount === 1 ? 'result' : 'results'}</p>
      <CountryList countries={filteredCountries} />
    </div>
  );
}

export default App;
