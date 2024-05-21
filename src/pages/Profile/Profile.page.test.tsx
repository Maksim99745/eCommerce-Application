import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { act } from 'react';
import { DEFAULT_REQUEST_DELAY } from '@test/constants/time.const';
import ProfilePage from './Profile.page';

jest.mock('@core/api/api.service', () => ({
  apiService: {
    getCustomer: jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(null), DEFAULT_REQUEST_DELAY);
        }),
    ),
  },
}));

test('Render the profile page', async () => {
  await act(async () => {
    render(<ProfilePage />);
    expect(true).toBeTruthy();
  });
});
