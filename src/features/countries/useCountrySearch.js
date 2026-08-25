import {useState} from "react"


function useCountrySearch(countries) {

  const [searchTerm ,setSearchTerm] = useState('')
  

  function handleSearchTerm(event) {
    setSearchTerm(event.target.value)
  }

  const filteredCountries =  countries.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const resultCount = filteredCountries.length;

  function clearSearch() {
    setSearchTerm('')
  }

  return {searchTerm,handleSearchTerm,filteredCountries,resultCount,clearSearch
};
}

export default useCountrySearch

