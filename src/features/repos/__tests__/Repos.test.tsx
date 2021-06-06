import { render, screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import Repos from '../Repos';
import { repos } from '../../../api/dataSample';

const props = {
  login: 'Test',
};

describe('Repos', () => {
  it('should render loading placeholders if status===loading', () => {
    const initialState = { repos: { [props.login]: { status: 'loading' } } };
    render(<Repos {...props} />, { initialState });

    expect(screen.getByTestId('repos-loading').childElementCount).toBe(3);
  });

  it('should render all repos with proper props if status===succeeded', () => {
    const initialState = { repos: { [props.login]: { repos, status: 'succeeded' } } };
    render(<Repos {...props} />, { initialState });

    repos.forEach((e) => {
      expect(screen.getByText(e.name)).toBeInTheDocument();
      expect(screen.getByText(e.stargazers_count)).toBeInTheDocument();
      expect(screen.getByText(e.description)).toBeInTheDocument();
    });
  });

  it('should render "No repos found" paragraph if !repos.length and status===succeeded', () => {
    const initialState = { repos: { [props.login]: { repos: [], status: 'succeeded' } } };
    render(<Repos {...props} />, { initialState });

    expect(screen.getByText(`No repos found for ${props.login}`)).toBeInTheDocument();
  });

  it('should not render "Load all repos" button if repos.length !== 3 and status===succeeded', () => {
    const initialState = { repos: { [props.login]: { repos, status: 'succeeded' } } };
    render(<Repos {...props} />, { initialState });

    expect(screen.queryByText(`Click to load all ${props.login}'s repos`)).not.toBeInTheDocument();
  });

  it('should render "Load all repos" button if repos.length === 3 and status===succeeded', () => {
    const initialState = { repos: { [props.login]: { repos: repos.slice(1), status: 'succeeded' } } };
    render(<Repos {...props} />, { initialState });

    expect(screen.getByRole('button')).toHaveTextContent(`Click to load all ${props.login}'s repos`);
  });

  it('should render error title and message if status===failed', () => {
    const initialState = { repos: { [props.login]: { status: 'failed', error: 'Error' } } };
    render(<Repos {...props} />, { initialState });

    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
