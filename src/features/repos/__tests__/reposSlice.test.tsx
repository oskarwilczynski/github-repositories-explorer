import { repos as reposData } from '../../../api/dataSample';
import { initialState as usersInitialState } from '../../users/usersSlice';
import reposReducer, {
  initialState as reposInitialState,
  fetchRepos,
  selectReposByLogin,
  selectStatusByLogin,
  selectErrorByLogin,
} from '../reposSlice';

const rootState = { users: usersInitialState, repos: reposInitialState };
const login = 'Test';
const meta = { arg: { login } };

describe('repos slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      const result = reposReducer(undefined, { type: '' });

      expect(result).toEqual(reposInitialState);
    });

    it('should return the initial state when users/fetchUsers/fulfilled dispatched', () => {
      const result = reposReducer(reposInitialState, { type: 'users/fetchUsers/fulfilled' });

      expect(result).toEqual(reposInitialState);
    });

    it('sets status===loading when fetchRepos is pending', () => {
      const action = { type: fetchRepos.pending.type, meta };

      const repos = reposReducer(reposInitialState, action);

      const state = { ...rootState, repos };
      expect(selectStatusByLogin(state, login)).toEqual('loading');
    });

    it('sets status===succeeded and repos when fetchRepos is fulfilled', () => {
      const initAction = { type: fetchRepos.pending.type, meta };
      const action = { type: fetchRepos.fulfilled.type, payload: reposData, meta };

      const initRepos = reposReducer(reposInitialState, initAction);
      const repos = reposReducer(initRepos, action);

      const state = { ...rootState, repos };
      expect(selectStatusByLogin(state, login)).toEqual('succeeded');
      expect(selectReposByLogin(state, login)).toEqual(reposData);
    });

    it('sets status===failed and error when fetchRepos is rejected', () => {
      const initAction = { type: fetchRepos.pending.type, meta };
      const action = { type: fetchRepos.rejected.type, error: { message: 'Error' }, meta };

      const initRepos = reposReducer(reposInitialState, initAction);
      const repos = reposReducer(initRepos, action);

      const state = { ...rootState, repos };
      expect(selectStatusByLogin(state, login)).toEqual('failed');
      expect(selectErrorByLogin(state, login)).toEqual(action.error.message);
    });
  });
});
