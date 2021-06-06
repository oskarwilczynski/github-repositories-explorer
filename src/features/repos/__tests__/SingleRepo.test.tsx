import { render, screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import SingleRepo from '../SingleRepo';

const props = {
  name: 'Example0',
  html_url: 'example0.com',
  stargazers_count: 0,
  description: 'Example0 description',
};

describe('SingleRepo', () => {
  it('should render all props for repo component', () => {
    render(<SingleRepo {...props} />);

    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.stargazers_count)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });
});
