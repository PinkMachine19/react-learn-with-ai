import countries from '../data/countries';
import CountryCard from './CountryCard';

function CountryList() {
  if (countries.length === 0) {
    return <p className="empty-message">No countries found</p>;
  }

  return (
    <section className="country-list">
      {countries.map((country) => (
        <CountryCard
          key={country.id}
          name={country.name}
          region={country.region}
        />
      ))}
    </section>
  );
}

export default CountryList;
