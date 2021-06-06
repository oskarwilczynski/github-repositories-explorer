import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../api/client';

import type { RootState } from '../../app/store';

interface Users {
  query: string,
  users: Array<{ login: string, id: number }>,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | undefined,
}

export const initialState: Users = {
  query: '',
  users: [],
  status: 'idle',
  error: undefined,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (login: string) => {
  const response = await client.get(`https://api.github.com/search/users?per_page=5&q=${login}`);
  return response.items;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setQuery } = usersSlice.actions;

export const selectQuery = (state: RootState): Users['query'] => state.users.query;
export const selectUsers = (state: RootState): Users['users'] => state.users.users;
export const selectStatus = (state: RootState): Users['status'] => state.users.status;
export const selectError = (state: RootState): Users['error'] => state.users.error;

export default usersSlice.reducer;
