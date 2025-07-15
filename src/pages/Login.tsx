import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { loginUser, fetchUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="w-100" style={{ maxWidth: 400 }}>
        <div className="card shadow p-4">
          <h2 className="mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100 fw-bold"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;