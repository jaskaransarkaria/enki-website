import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import Placeholder from './Placeholder.svelte';

describe('expect text has correctly rendered', () => {
  it('hello world', () => {
    const { getByText } = render(Placeholder);

    expect(getByText('Hello World!')).toBeInTheDocument();
  });
});
