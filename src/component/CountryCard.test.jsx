import {render,screen} from "@testing-library/react"
import {test,expect} from "vitest"
import userEvent from "@testing-library/user-event"
import CountryCard from "./CountryCard.jsx"


test('increment ', async () => {
  const user = userEvent.setup();
  render(<CountryCard name="Japan" region="Asia"/>)

  expect(
    screen.getByText('Clicked 0 times', {exact:true})
  ).toBeInTheDocument();

  const increment = screen.getByRole('button', {name: /click me/i})

  await user.click(increment);
  await user.click(increment);
  await user.click(increment);

  expect(
    screen.getByText('Clicked 3 times', {exact:true})
  ).toBeInTheDocument


 
});

test("rest only" , async () => {
  const user = userEvent.setup();
  render(<CountryCard name="Japan" region="Asia"/>)
  const reset = screen.getByRole('button', {name:/reset/i})

  await user.click(reset)

  expect(
    screen.getByText('Clicked 0 times', {exact:true})
  ).toBeInTheDocument
}
  
)

