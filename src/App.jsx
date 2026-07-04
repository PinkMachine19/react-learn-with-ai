import CountryCard from "./component/CountryCard";

function App() {
  return (
    <div>
      <h1>Countries</h1>
      <CountryCard name='Canada' region='Americas'/>
      <CountryCard name='India' region='Asia'/>
      <CountryCard name='Ghana' region='Africa'/>
    </div>
  );
}

export default App;