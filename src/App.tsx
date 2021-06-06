import './App.css';
import styled from 'styled-components';

import Users from './features/users/Users';
import SearchBar from './features/searchBar/SearchBar';

const AppContainer = styled.div`
  margin: 2vh;
`;

const App = (): JSX.Element => (
  <AppContainer>
    <SearchBar />
    <Users />
  </AppContainer>
);

export default App;
