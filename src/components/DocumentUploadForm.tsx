import React from 'react';

interface Props {
  title: string;
  content: string;
  file: File | null;
  setTitle: (v: string) => void;
  setContent: (v: string) => void;
  setFile: (f: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  uploading: boolean;
}

const DocumentUploadForm: React.FC<Props> = ({
  title,
  content,
  setTitle,
  setContent,
  setFile,
  onSubmit,
  uploading,
}) => (
  <form onSubmit={onSubmit} className="container mt-4">
    <h3 className="mb-4">Upload a Document</h3>
    <div className="mb-3">
      <label className="form-label" htmlFor="title-input">Title</label>
      <input
        id="title-input"
        className="form-control"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>
    <div className="mb-3">
      <label className="form-label" htmlFor="content-input">Content</label>
      <textarea
        id="content-input"
        className="form-control"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
    </div>
    <div className="mb-3">
      <label className="form-label" htmlFor="file-input">File</label>
      <input
        id="file-input"
        className="form-control"
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />
    </div>
    <button className="btn btn-primary" type="submit" disabled={uploading}>
      {uploading ? 'Uploading...' : 'Upload'}
    </button>
  </form>
);

export default DocumentUploadForm;