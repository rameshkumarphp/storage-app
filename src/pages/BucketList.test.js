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
  expect(buttonEl).toHaveTextContent(/Create New bucket/i);
  userEvent.click(buttonEl);
  expect(screen.getByText(/Create New Bucket/i)).toBeInTheDocument();
  expect(screen.getByText(/Bucket Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Bucket Location/i)).toBeInTheDocument();
  const inputElement = screen.getByTestId('new-bucket-name');
  expect(inputElement).toBeInTheDocument();
  const selectElement = screen.getByTestId('location-list');
  expect(selectElement).toBeInTheDocument();
});


