import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { uploadDocumentApi } from '../../api/document';

interface DocumentState {
  uploading: boolean;
  error: string | null;
}

const initialState: DocumentState = {
  uploading: false,
  error: null,
};

export const uploadDocument = createAsyncThunk(
  'documents/upload',
  async (
    data: { title: string; content: string; file: File },
    thunkAPI
  ) => {
    try {
      const res = await uploadDocumentApi(data);
      return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Upload failed');
    }
  }
);

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadDocument.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state) => {
        state.uploading = false;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload as string;
      });
  },
});

export default documentSlice.reducer;
