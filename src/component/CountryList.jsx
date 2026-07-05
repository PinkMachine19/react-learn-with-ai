import CountryCard from './CountryCard';

function CountryList() {
  return (
    <section className="country-list">
      <CountryCard name="Canada" region="Americas" />
      <CountryCard name="Japan" region="Asia" />
      <CountryCard name="Brazil" region="Americas" />
    </section>
  );
}

export default CountryList;