import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Signup from '../../pages/Signup';

const mockStore = configureStore([]);
const initialState = {
  auth: {
    loading: false,
    error: null,
    token: null,
  },
};

describe('Signup UI', () => {
  it('renders Signup form', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(await screen.findAllByText(/required/i)).toHaveLength(3);
  });

  it('disables button and shows loading text when loading', () => {
    const store = mockStore({
      auth: { ...initialState.auth, loading: true },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled();
  });
});