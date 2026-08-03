import { useState } from "react";

// Session 19: module-level, not state — incrementing this does NOT trigger
// a re-render. It only counts how many times React has already called this
// function body, across every CountryCard on the page.
let renderCount = 0;

function CountryCard ({name, region}) {
  const [count,setCount] = useState(0)

  renderCount++;
  console.log(`CountryCard render #${renderCount} — ${name}, count is now ${count}`)

  function handleClick(event) {
    console.log(`Action:${event.type},\n Target attr:`,event.target)
    setCount(count+1)
  }

  function handleReset() {
    setCount(0)
  }

  return (<div className="country-card">
     <h2>{name}</h2>
     <p>Region:{region}</p> 
     <p>Clicked {count} times</p>
     <button onClick={handleClick}>Click Me</button>
     <button onClick={handleReset}>Reset</button>
  </div>);
}

export default CountryCard
