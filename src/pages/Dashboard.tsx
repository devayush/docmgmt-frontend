import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div className="container py-5">
      <div className="card shadow mx-auto" style={{ maxWidth: 600 }}>
        <div className="card-body">
          <h1 className="card-title mb-4 text-center">Dashboard</h1>
          {user ? (
            <>
              <p className="mb-4 text-center">
                Welcome, <strong>{user.name}</strong>{' '}
                <span className="badge bg-secondary">{user.role}</span>
              </p>

              <div className="d-flex justify-content-center mb-4">
                <button onClick={handleLogout} className="btn btn-outline-danger">
                  Logout
                </button>
              </div>

              <hr />

              <div className="text-center mt-4">
                <h4>📄 Upload a Document</h4>
                <button className="btn btn-primary mt-2" onClick={handleUploadClick}>
                  Upload Document
                </button>
              </div>

              <div className="text-center mt-5">
                <h4>🔄 Ingestion Status</h4>
                <p className="text-muted">[Coming soon]</p>
              </div>
            </>
          ) : (
            <p className="text-center">Loading user info...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
