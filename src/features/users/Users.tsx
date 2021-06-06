import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';

import SingleUser from './SingleUser';
import { UserPlaceholder } from '../../styles/ShimmerLoading.styles';
import {
  selectQuery,
  selectUsers,
  selectStatus,
  selectError,
} from './usersSlice';

const keys = [1, 2, 3, 4, 5];

const UsersParagraph = styled.p`
  font-size: 2.5vh;
  color: #646464;
  margin: 10px 0 10px 0px;
`;

const Users = (): JSX.Element => {
  const [index, setIndex] = useState(-1);
  const query = useAppSelector(selectQuery);
  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  useEffect(() => {
    setIndex(-1);
  }, [query, users]);

  const changeItem = (i: number) => {
    if (i !== index) {
      setIndex(i);
    } else {
      setIndex(-1);
    }
  };

  return (
    <>
      {status === 'loading' && (
        <>
          <UsersParagraph>
            Loading users for &quot;{query}&quot;
          </UsersParagraph>
          <div data-testid="users-loading">
            {keys.map((key) => <UserPlaceholder key={`user-loading-${key}`} />)}
          </div>
        </>
      )}
      {status === 'succeeded' && (
        <>
          <UsersParagraph>{users.length
            ? `Showing users for "${query}"`
            : `No users found for "${query}"`}
          </UsersParagraph>
          {users.map((user, i) => (
            <div key={user.id}>
              <SingleUser
                isCollapsed={index !== i}
                login={user.login}
                changeItem={() => changeItem(i)}
              />
            </div>
          ))}
        </>
      )}
      {status === 'failed' && error && (
        <>
          <h3>Error!</h3>
          <p>{error}</p>
        </>
      )}
    </>
  );
};

export default Users;
