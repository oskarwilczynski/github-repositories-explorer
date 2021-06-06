import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../api/client';

import type { RootState } from '../../app/store';
import type { Repo } from './Repos.types';

interface ReposSlice {
  repos: Repo[],
  status: 'loading' | 'succeeded' | 'failed',
  error: string | undefined,
}

export const initialState: { [key: string]: ReposSlice } = {};

export const fetchRepos = createAsyncThunk('repos/fetchRepos',
  async (arg: { login: string, fetchAllRepos?: boolean }) => {
    const { login, fetchAllRepos } = arg;
    const response = await client
      .get(`https://api.github.com/users/${login}/repos?per_page=${fetchAllRepos ? '9999' : '3'}`);
    return response;
  });

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Clear state.repos when new fetchUsers action fulfilled
      .addCase('users/fetchUsers/fulfilled', () => (
        initialState
      ))
      .addCase(fetchRepos.pending, (state, action) => (
        {
          ...state,
          [action.meta.arg.login]: {
            repos: [],
            status: 'loading',
            error: undefined,
          },
        }
      ))
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state[action.meta.arg.login].status = 'succeeded';
        state[action.meta.arg.login].repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state[action.meta.arg.login].status = 'failed';
        state[action.meta.arg.login].error = action.error.message;
      });
  },
});

export const selectReposByLogin = (state: RootState, login: string): Repo[] | [] => (
  state.repos[login]?.repos || []
);
export const selectStatusByLogin = (state: RootState, login: string): string => (
  state.repos[login]?.status || 'idle'
);
export const selectErrorByLogin = (state: RootState, login: string): string | undefined => (
  state.repos[login]?.error || undefined
);

export default reposSlice.reducer;
