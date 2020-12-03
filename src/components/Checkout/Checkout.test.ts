import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import Placeholder from './Checkout.svelte';

describe('expect text has correctly rendered', () => {
  it('checkout', () => {
    const { getByText } = render(Placeholder);

    expect(getByText('Checkout')).toBeInTheDocument();
  });
});
