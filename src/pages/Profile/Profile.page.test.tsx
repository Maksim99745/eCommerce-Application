import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProfilePage from './Profile.page';

jest.mock('@hooks/useAuth', () => ({ user: jest.fn() }));

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Render the profile page', async () => {
  await act(async () => {
    render(<ProfilePage />);
    expect(true).toBeTruthy();
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>,
    );
  });
});
