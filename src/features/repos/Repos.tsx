import { useState } from 'react';
import type { Repo } from './Repos.types';
import SingleRepo from './SingleRepo';
import LongBlueButton from '../../styles/Buttons.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RepoPlaceholder } from '../../styles/ShimmerLoading.styles';
import {
  fetchRepos,
  selectReposByLogin,
  selectStatusByLogin,
  selectErrorByLogin,
} from './reposSlice';

const keys = [1, 2, 3];

interface Props {
  login: string,
}

const Repos = ({ login }: Props): JSX.Element => {
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);
  const repos = useAppSelector((state) => selectReposByLogin(state, login));
  const status = useAppSelector((state) => selectStatusByLogin(state, login));
  const error = useAppSelector((state) => selectErrorByLogin(state, login));
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(fetchRepos({ login, fetchAllRepos: true }));
    setLoadMoreClicked(true);
  };

  return (
    <>
      {status === 'loading' && (
        <div data-testid="repos-loading">
          {keys.map((key) => <RepoPlaceholder key={`repo-loading-${key}`} />)}
        </div>
      )}
      {status === 'succeeded' && repos.map((r: Repo) => (
        <SingleRepo
          name={r.name}
          html_url={r.html_url}
          stargazers_count={r.stargazers_count}
          description={r.description}
          key={r.id}
        />
      ))}
      {status === 'succeeded' && !repos.length && (
        <p style={{ textAlign: 'center' }}>No repos found for {login}</p>
      )}
      {status === 'succeeded' && repos.length === 3 && !loadMoreClicked && (
        <LongBlueButton
          type="button"
          onClick={handleClick}
        >
          Click to load all {login}&apos;s repos
        </LongBlueButton>
      )}
      {status === 'failed' && (
        <>
          <h5>Error!</h5>
          <p>{error}</p>
        </>
      )}
    </>
  );
};

export default Repos;
