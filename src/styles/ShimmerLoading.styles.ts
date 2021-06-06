import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const Shimmer = styled.div`
  animation : ${shimmer} 2s infinite linear;
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-size: 1000px 100%;
`;

export const RepoPlaceholder = styled(Shimmer)`
  width: 95%;
  float: right;
  height: 14vh;
  padding: 10px 7px 10px 7px;
  box-sizing: border-box;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 5px;
  }
`;

export const UserPlaceholder = styled(Shimmer)`
  width: 100%;
  box-sizing: border-box;
  height: 5vh;
  margin: 5px 0 5px 0px;
  padding: 1vh;
`;
