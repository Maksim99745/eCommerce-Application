import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MainComponent from './Main.component';

test('Render the main component', () => {
  render(<MainComponent />);
  expect(true).toBeTruthy();
});
