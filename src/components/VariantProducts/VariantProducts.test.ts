import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import VariantProducts from './VariantProducts.svelte';

describe('GIVEN VariantProducts', () => {
  describe('WHEN rendered with no props', () => {
    it('THEN show no product or product related actions', () => {
      const { container } = render(VariantProducts);
      expect(container.children).toHaveLength(1);
    });
  });
});
