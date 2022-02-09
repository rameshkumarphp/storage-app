import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux'
import rootReducer from "../Redux/Reducers";
import { createStore } from "redux";
import BucketDetail from "./BucketDetail";

import { BrowserRouter, Routes, Route } from 'react-router-dom'


const store = createStore(rootReducer);

test("Test My new storage heading is rendered", () => {
    render(<Provider store={store}><BrowserRouter><Routes><Route path="/bucketdetail/:id"><BucketDetail /></Route></Routes></BrowserRouter></Provider>);
    const headingElement = screen.getByText(/My New Storage/i);
    expect(headingElement).toBeInTheDocument();
});

test("Test All Files text is rendered", () => {
    render(<Provider store={store}><BrowserRouter><Routes><Route path="/bucketdetail/:id"><BucketDetail /></Route></Routes></BrowserRouter></Provider>);
    const headingElement = screen.getByText(/All Files/i);
    expect(headingElement).toBeInTheDocument();
});


test("Test Delete Object button is rendered", () => {
    render(<Provider store={store}><BrowserRouter><Routes><Route path="/bucketdetail/:id"><BucketDetail /></Route></Routes></BrowserRouter></Provider>);
    const buttonEl = screen.getByRole('button', {
        name: /Delete Object/i
    });
    expect(buttonEl).toBeInTheDocument();
});