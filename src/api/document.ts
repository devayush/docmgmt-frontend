import axios from '../lib/axios';

export const uploadDocumentApi = async (data: {
  title: string;
  content: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('file', data.file);

  const response = await axios.post('/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const getDocumentsApi = async (page = 1, limit = 20) => {
  const response = await axios.get(`/documents?page=${page}&limit=${limit}`);
  return response.data;
};
