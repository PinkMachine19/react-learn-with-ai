import { useState } from 'react';

function CountryCard ({name, region}) {
  const [count, setCount] = useState(0);

  function handleClick(event) {
    console.log(event.type, event.target);
    setCount(count + 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (<div className="country-card">
     <h2>{name}</h2>
     <p>Region:{region}</p>
     <p>Clicked {count} times</p>
     <button onClick={handleClick}>Click me</button>
     <button onClick={handleReset}>Reset</button>
  </div>);
}

export default CountryCard