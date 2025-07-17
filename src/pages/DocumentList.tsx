import React, { useEffect, useState } from 'react';
import { getDocumentsApi } from '../api/document';

interface Document {
  id: string;
  title: string;
  content: string;
  fileUrl: string;
  createdAt: string;
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await getDocumentsApi(1, 20);
        setDocuments(res);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to fetch documents');
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Uploaded Documents</h3>
      {loading && <div className="text-center py-4">Loading documents...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {!loading && documents.length === 0 && (
        <p className="text-center text-muted">No documents uploaded yet.</p>
      )}
      <div className="row">
        {documents.map((doc) => (
          <div key={doc.id} className="col-md-6 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{doc.title}</h5>
                <p className="card-text">{doc.content}</p>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View File
                </a>
              </div>
              <div className="card-footer text-muted">
                Uploaded on {new Date(doc.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;