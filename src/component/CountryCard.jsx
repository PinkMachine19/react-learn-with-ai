import { useState } from "react";

function CountryCard ({name, region}) {
  const [count,setCount] = useState(0)

  return (<div className="country-card">
     <h2>{name}</h2>
     <p>Region:{region}</p> 
     <p>Clicked {count} times</p>
     <button onClick={ () => {
      setCount(count + 1)
     }}>Click Me</button>
  </div>);
}

export default CountryCard
