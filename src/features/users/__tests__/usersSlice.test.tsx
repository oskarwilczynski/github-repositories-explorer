import { users as usersData } from '../../../api/dataSample';
import { initialState as reposInitialState } from '../../repos/reposSlice';
import usersReducer, {
  initialState as usersInitialState,
  fetchUsers,
  setQuery,
  selectQuery,
  selectStatus,
  selectUsers,
  selectError,
} from '../usersSlice';

const rootState = { users: usersInitialState, repos: reposInitialState };

describe('users slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      const state = usersInitialState;

      const result = usersReducer(undefined, { type: '' });

      expect(result).toEqual(state);
    });

    it('should properly set query state', () => {
      const query = 'Test';

      const users = usersReducer(usersInitialState, setQuery(query));

      const state = { ...rootState, users };
      expect(selectQuery(state)).toEqual(query);
    });

    it('sets status===loading when fetchUsers is pending', () => {
      const action = { type: fetchUsers.pending.type };

      const users = usersReducer(usersInitialState, action);

      const state = { ...rootState, users };
      expect(selectStatus(state)).toEqual('loading');
    });

    it('sets status===succeeded and users when fetchUsers is fulfilled', () => {
      const action = { type: fetchUsers.fulfilled.type, payload: usersData };

      const users = usersReducer(usersInitialState, action);

      const state = { ...rootState, users };
      expect(selectStatus(state)).toEqual('succeeded');
      expect(selectUsers(state)).toEqual(usersData);
    });

    it('sets status===failed and error when fetchUsers is rejected', () => {
      const action = { type: fetchUsers.rejected.type, error: { message: 'Error' } };

      const users = usersReducer(usersInitialState, action);

      const state = { ...rootState, users };
      expect(selectStatus(state)).toEqual('failed');
      expect(selectError(state)).toEqual(action.error.message);
    });
  });
});
