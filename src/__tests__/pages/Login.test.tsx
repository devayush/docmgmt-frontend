import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../../../src/pages/Login';

const mockStore = configureStore([]);
const initialState = {
  auth: {
    loading: false,
    error: null,
    token: null,
  },
};

describe('Login UI', () => {
  it('renders Login form', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findAllByText(/required/i)).toHaveLength(2);
  });

  it('disables button when loading', () => {
    const store = mockStore({
      auth: { ...initialState.auth, loading: true },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
  });
});