import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux'
import rootReducer from "../Redux/Reducers";
import { createStore } from "redux";
import BucketList from "./BucketList";

const store = createStore(rootReducer);

test("Test Bucket list heading is rendered", () => {
  render(<Provider store={store}><BucketList /></Provider>);
  const headingElement = screen.getByText(/All Buckets/i);
  expect(headingElement).toBeInTheDocument();
});

test("Test All Buckets text is rendered", () => {
  render(<Provider store={store}><BucketList /></Provider>);
  const headingElement = screen.getByText(/Bucket List/i);
  expect(headingElement).toBeInTheDocument();
});


test("Test create bucket button", () => {
  render(<Provider store={store}><BucketList /></Provider>);
  const buttonEl = screen.getByRole('button', {
    name: /Create New Bucket/i
  });

  userEvent.click(buttonEl);
  expect(buttonEl).toHaveTextContent(/Create New bucket/i);
});