import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux'
import rootReducer from "../Redux/Reducers";
import { createStore } from "redux";
const { createMemoryHistory } = require("history");
import BucketDetail from "./BucketDetail";

import { Router } from 'react-router-dom'


const store = createStore(rootReducer);
const history = createMemoryHistory();

test("Test if My new storage heading is rendered", () => {
    render(<Provider store={store}><Router location={history.location} navigator={history}><BucketDetail /></Router></Provider>);
    const headingElement = screen.getByText(/My New Storage/i);
    expect(headingElement).toBeInTheDocument();
});

test("Test if All Files text is rendered", () => {
    render(<Provider store={store}><Router location={history.location} navigator={history}><BucketDetail /></Router></Provider>);
    const headingElement = screen.getByText(/All Files/i);
    expect(headingElement).toBeInTheDocument();
});


test("Test if Delete Object button is rendered", () => {
    render(<Provider store={store}><Router location={history.location} navigator={history}><BucketDetail /></Router></Provider>);
    const buttonEl = screen.getByRole('button', {
        name: /Delete Object/i
    });
    expect(buttonEl).toBeInTheDocument();
});

test("Test if Upload Object button is rendered", () => {
    render(<Provider store={store}><Router location={history.location} navigator={history}><BucketDetail /></Router></Provider>);
    const buttonEl = screen.getByRole('button', {
        name: /Upload Object/i
    });
    expect(buttonEl).toBeInTheDocument();
});

test("Test if Bucket detials not found text is rendered", () => {
    render(<Provider store={store}><Router location={history.location} navigator={history}><BucketDetail /></Router></Provider>);
    expect(screen.getByText(/Bucket details not found!/i)).toBeInTheDocument();
});

test("Test Details tab", () => {
    render(<Provider store={store}><Router location={history.location} navigator={history}><BucketDetail /></Router></Provider>);
    const buttonEl = screen.getByRole('tab', {
        name: /Details/i
    });
    expect(buttonEl).toHaveTextContent(/Details/i);
    userEvent.click(buttonEl);
    expect(screen.getByText(/Bucket details not found!/i)).toBeInTheDocument();
});

