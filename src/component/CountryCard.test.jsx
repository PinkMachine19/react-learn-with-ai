import {render} from "@testing-library/react"
import {test} from "vitest"
import CountryCard from "./CountryCard.jsx"

test('renders Country card with valid props', () => {
  render(<CountryCard name="Japan" region="Asia"/>)
})