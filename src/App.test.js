import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from "redux";

import { MemoryRouter } from 'react-router-dom';

import rootReducer from "./Redux/Reducers/index";

const store = createStore(rootReducer);

import '@testing-library/jest-dom'

import App from './App';

import { RoutesData } from './App';

test('Page is rendered with heading', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )
    expect(screen.getByText(/Secure Cloud Storage/i)).toBeInTheDocument()

})

test('Full app rendering with index route', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )
    expect(screen.getByText(/Bucket List/i)).toBeInTheDocument();
})

test('renders routes correct', async () => {
    const app = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <RoutesData />
            </MemoryRouter>
        </Provider>
    );
    expect(app.getByText(/Bucket List/i)).toBeInTheDocument();
});

test('landing on a bad page', async () => {
    const app = render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/404']} initialIndex={0}>
                <RoutesData />
            </MemoryRouter>
        </Provider>
    );
    expect(app.getByText(/Page not found/i)).toBeInTheDocument();
});