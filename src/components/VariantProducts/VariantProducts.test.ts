import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import groupBy from 'lodash.groupby';
import VariantProducts from './VariantProducts.svelte';

declare let global: any;

describe('GIVEN VariantProducts', () => {
  beforeEach(() => (global.groupBy = groupBy));
  describe('WHEN rendered with no props', () => {
    it('THEN show no product or product related actions', () => {
      const { container } = render(VariantProducts);
      expect(container.children).toHaveLength(1);
    });
  });
});
