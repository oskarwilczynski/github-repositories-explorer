// test-utils.js
/* eslint-disable */
import { render as rtlRender } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// Import your own reducer
import usersReducer from '../features/users/usersSlice';
import reposReducer from '../features/repos/reposSlice';

function render(
  ui,
  {
    initialState,
    store = createStore(
      combineReducers({users: usersReducer, repos: reposReducer}), 
      initialState
    ),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }