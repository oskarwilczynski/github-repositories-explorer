import { render, screen, fireEvent } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('should render input and button with proper texts', () => {
    render(<SearchBar />);

    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter username');
    expect(screen.getByRole('button')).toHaveTextContent('Search');
  });

  it('should present proper input value', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Enter username') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Test' } });

    expect(input.value).toBe('Test');
  });
});
