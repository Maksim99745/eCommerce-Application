import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProfilePage from './Profile.page';

test('Render the profile page', async () => {
  render(<ProfilePage />);
  expect(true).toBeTruthy();
});
