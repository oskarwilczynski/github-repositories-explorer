import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Repo } from './Repos.types';

const RepoContainer = styled.div`
  background-color: #DFDFDF;
  font-size: 2.5vh;
  width: 95%;
  height: 14vh;
  float: right;
  padding: 10px 7px 10px 7px;
  box-sizing: border-box;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 5px;
  }
`;

const TitleAndStars = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
`;

const RepoTitle = styled.h6`
  font-size: 2.5vh;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const RepoDescription = styled.p`
  margin-top: 0;
  font-size: 2.2vh;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Repos = ({
  name,
  html_url,
  stargazers_count,
  description,
}: Omit<Repo, 'id'>): JSX.Element => (
  <RepoContainer onClick={() => window.open(html_url)}>
    <TitleAndStars>
      <RepoTitle>{name}</RepoTitle>
      <span>
        {stargazers_count}
        <FontAwesomeIcon
          icon={faStar}
          style={{ marginLeft: '5px' }}
        />
      </span>
    </TitleAndStars>
    <RepoDescription>{description}</RepoDescription>
  </RepoContainer>
);

export default Repos;
