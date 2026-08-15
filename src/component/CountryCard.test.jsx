import {render,screen} from "@testing-library/react"
import {test,expect} from "vitest"
import CountryCard from "./CountryCard.jsx"

test('renders Country card with valid props', () => {
  render(<CountryCard name="Japan" region="Asia"/>)

  expect(
    screen.getByRole('heading', {name: "Japan"})
  ).toBeInTheDocument();

  expect(
    screen.getByText("Region:Asia", {exact:true})
  ).toBeInTheDocument()
})

test('does not render unrelated country details', () => {
  render(<CountryCard name="Japan" region="Asia" />);

expect(
  screen.queryByText('Ghana', { exact: true })
).not.toBeInTheDocument();

  expect(
    screen.queryByText('Eurasia', { exact: true })
  ).not.toBeInTheDocument();
});