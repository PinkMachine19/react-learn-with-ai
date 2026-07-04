function CountryCard ({name, region}) {
  return (<div className="country-card">
     <h2>{name}</h2>
     <p>Region:{region}</p> 
  </div>);
}

export default CountryCard