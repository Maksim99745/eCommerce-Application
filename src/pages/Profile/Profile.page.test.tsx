import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProfilePage from './Profile.page';

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Render the profile page', () => {
  render(<ProfilePage />);
  expect(true).toBeTruthy();
});
