import { useState } from 'react';
import styled from 'styled-components';

import LongBlueButton from '../../styles/Buttons.styles';
import { useAppDispatch } from '../../app/hooks';
import { setQuery, fetchUsers } from '../users/usersSlice';

const SearchBarInput = styled.input`
  box-sizing: border-box;
  font-size: 2.5vh;
  width: 100%;
  background-color: #F2F2F2;
  padding: 1.3vh;
  border-color: #E9E9E9;
  border-style: solid;
  margin-bottom: 1.5vh;
`;

const SearchBar = (): JSX.Element => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (value) {
      dispatch(fetchUsers(value));
      dispatch(setQuery(value));
    }
  };

  return (
    <>
      <SearchBarInput
        type="text"
        value={value}
        placeholder="Enter username"
        onChange={(e) => setValue(e.target.value)}
      />
      <LongBlueButton type="button" onClick={handleClick}>Search</LongBlueButton>
    </>
  );
};

export default SearchBar;
