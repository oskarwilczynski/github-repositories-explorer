import { render, screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import Users from '../Users';
import { users } from '../../../api/dataSample';

const query = 'Test';

describe('Users', () => {
  it('should render loading paragrapgh and placeholders if status===loading', () => {
    const initialState = { users: { query, status: 'loading' } };
    render(<Users />, { initialState });

    expect(screen.getByText(`Loading users for "${query}"`)).toBeInTheDocument();
    expect(screen.getByTestId('users-loading').childElementCount).toBe(5);
  });

  it('should render "No users found" paragraph if status===succeeded and users===[]', () => {
    const initialState = { users: { query, users: [], status: 'succeeded' } };
    render(<Users />, { initialState });

    expect(screen.getByText(`No users found for "${query}"`)).toBeInTheDocument();
  });

  it('should render "Showing users" paragraph and all users if status===succeeded and users!==[]', () => {
    const initialState = { users: { query, users, status: 'succeeded' } };
    render(<Users />, { initialState });

    expect(screen.getByText(`Showing users for "${query}"`)).toBeInTheDocument();
    users.forEach((e) => expect(screen.getByText(e.login)).toBeInTheDocument());
  });

  it('should render error title and error message if status===failed]', () => {
    const initialState = { users: { status: 'failed', error: 'Error' } };
    render(<Users />, { initialState });

    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
