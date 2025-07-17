import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { uploadDocument } from '../features/documents/documentSlice';
import { useNavigate } from 'react-router-dom';
import DocumentUploadForm from '../components/DocumentUploadForm';

const UploadDocument: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { uploading, error } = useAppSelector((state) => state.documents);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    if (title && content && file) {
      const result = await dispatch(uploadDocument({ title, content, file }));
      if (result.type !== uploadDocument.rejected.type) {
        setSuccess(true);
        setTitle('');
        setContent('');
        setFile(null);
        (document.getElementById('file-input') as HTMLInputElement).value = '';
      }
    }
  };

  return (
    <div className="p-4">
      <DocumentUploadForm
        title={title}
        content={content}
        file={file}
        setTitle={setTitle}
        setContent={setContent}
        setFile={setFile}
        onSubmit={handleSubmit}
        uploading={uploading}
      />
      <div className="d-flex gap-2 mt-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      {success && (
        <div className="alert alert-success mt-3">
          Document uploaded successfully!
        </div>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default UploadDocument;