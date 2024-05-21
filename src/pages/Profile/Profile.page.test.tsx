import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { act } from 'react';
import ProfilePage from './Profile.page';

test('Render the profile page', async () => {
  await act(async () => {
    render(<ProfilePage />);
  });
  expect(true).toBeTruthy();
});
