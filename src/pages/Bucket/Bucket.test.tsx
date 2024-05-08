import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import BucketPage from './Bucket.page';

test('Render the bucket page', () => {
  render(<BucketPage />);
  expect(true).toBeTruthy();
});
