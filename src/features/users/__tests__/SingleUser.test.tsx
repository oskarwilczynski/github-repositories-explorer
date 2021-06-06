import { render, screen, fireEvent } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import SingleUser from '../SingleUser';

const props = {
  login: 'Test',
  isCollapsed: true,
  changeItem: jest.fn(),
};

describe('SingleUser', () => {
  it('should render button with proper login string', () => {
    render(<SingleUser {...props} />);

    expect(screen.getByText(props.login)).toBeInTheDocument();
  });

  it('should not render repos container if isCollapsed===true', () => {
    render(<SingleUser {...props} />);

    expect(screen.queryByTestId('repos-container')).not.toBeInTheDocument();
  });

  it('should render repos container if isCollapsed===false', () => {
    render(<SingleUser {...props} isCollapsed={false} />);

    expect(screen.queryByTestId('repos-container')).toBeInTheDocument();
  });

  it('should fire changeItem() on click', () => {
    render(<SingleUser {...props} isCollapsed={false} />);
    const button = screen.getByText(props.login);

    fireEvent.click(button);

    expect(props.changeItem).toHaveBeenCalledTimes(1);
  });
});
