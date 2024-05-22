import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DEFAULT_REQUEST_TIMEOUT } from '@test/constants/time.const';
import ProfilePage from './Profile.page';

jest.mock('@hooks/useAuth', () => () => ({ user: jest.fn() }));

test('Render the profile page', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>,
    );
    await waitFor(() => expect(screen.queryByText('Personal information')).not.toBeInTheDocument(), {
      timeout: DEFAULT_REQUEST_TIMEOUT,
    });
  });
});
