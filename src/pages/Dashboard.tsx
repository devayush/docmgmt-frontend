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

  const handleViewDocuments = () => {
    navigate('/documents');
  };

  return (
    <div className="container py-5">
      <div className="card shadow mx-auto" style={{ maxWidth: 650 }}>
        <div className="card-body">
          <h1 className="card-title mb-4 text-center">Dashboard</h1>
          {user ? (
            <>
              <div className="mb-4 text-center">
                <span className="fs-5">
                  Welcome, <strong>{user.name}</strong>
                </span>
                <span className="badge bg-secondary ms-2">{user.role}</span>
              </div>

              <div className="d-flex justify-content-center mb-4">
                <button onClick={handleLogout} className="btn btn-outline-danger px-4">
                  Logout
                </button>
              </div>

              <hr className="my-4" />

              <div className="row g-4 justify-content-center">
                <div className="col-md-5">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <h4 className="card-title mb-3">📄 Upload a Document</h4>
                      <button className="btn btn-primary w-100" onClick={handleUploadClick}>
                        Upload Document
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <h4 className="card-title mb-3">📄 View Documents</h4>
                      <button className="btn btn-outline-primary w-100" onClick={handleViewDocuments}>
                        View Documents
                      </button>
                    </div>
                  </div>
                </div>
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