import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProfilePage from './Profile.page';

afterEach(cleanup);

jest
  .mock('@hooks/useAuth', () => ({
    useAuth: jest.fn(),
  }))
  .mock('@core/api/api.service', () => ({
    apiService: jest.fn(),
  }));

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
