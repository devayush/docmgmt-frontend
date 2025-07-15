import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { uploadDocument } from '../features/documents/documentSlice';

const DocumentUploadForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { uploading, error } = useAppSelector((state) => state.documents);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content && file) {
      dispatch(uploadDocument({ title, content, file }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h3 className="mb-4">Upload a Document</h3>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">File</label>
        <input
          className="form-control"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>

      <button className="btn btn-primary" type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </form>
  );
};

export default DocumentUploadForm;
