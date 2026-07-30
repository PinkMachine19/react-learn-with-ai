import { useState } from "react";
import CountryList from "./component/CountryList";
import countries from "./data/countries";

// Session 21 — Lab objective: lift the search state up from CountryList
// into App, the nearest common ancestor. App now owns searchTerm, filters
// the full countries array against it, and passes only the matching
// countries down as a prop. CountryList no longer imports countries or
// manages its own search state — it just renders whatever list it's given.

// Session 22 — Lab objective: filteredCountries and resultCount are BOTH
// derived values, not state. They are recalculated from searchTerm on
// every render instead of being stored in their own useState — there is
// nothing to keep in sync, so there is nothing that can drift out of sync.
// The only real, independent state left in this component is searchTerm.

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  const filteredCountries = countries.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const resultCount = filteredCountries.length;

  return (
    <div>
      <h1>Countries</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search countries..."
      />
      <p>{resultCount} {resultCount === 1 ? 'result' : 'results'}</p>
      <CountryList countries={filteredCountries} />
    </div>
  );
}

export default App;
