import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFoundPage from './NotFound.page';

test('Render the not-found page', () => {
  render(
    <Router>
      <NotFoundPage />
    </Router>,
  );
  expect(true).toBeTruthy();
});
