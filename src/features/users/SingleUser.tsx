import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import Repos from '../repos/Repos';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchRepos, selectStatusByLogin } from '../repos/reposSlice';

const UserButton = styled.button`
  width: 100%;
  margin: 5px 0 5px 0px;
  font-size: 2.5vh;
  border: none;
  padding: 1vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface Props {
  login: string,
  isCollapsed: boolean,
  changeItem: () => void,
}

const SingleUser = ({ login, isCollapsed, changeItem }: Props): JSX.Element => {
  const status = useAppSelector((state) => selectStatusByLogin(state, login));
  const dispatch = useAppDispatch();

  const onClick = () => {
    isCollapsed && status === 'idle' && dispatch(fetchRepos({ login }));
    changeItem();
  };

  return (
    <>
      <UserButton type="button" onClick={onClick}>
        {login}
        <FontAwesomeIcon icon={isCollapsed ? faAngleDown : faAngleUp} />
      </UserButton>
      {!isCollapsed && (
        <div
          style={{ display: isCollapsed ? 'none' : 'block' }}
          aria-expanded={!isCollapsed}
          data-testid="repos-container"
        >
          <Repos login={login} />
        </div>
      )}
    </>
  );
};

export default SingleUser;
