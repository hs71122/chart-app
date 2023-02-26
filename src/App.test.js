import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders home page", () => {
  render(<App />);
  const buttonElement = screen.getByText(/Import csv file/i);
  expect(buttonElement).toBeInTheDocument();
});
