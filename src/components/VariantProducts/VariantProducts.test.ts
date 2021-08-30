import type { Product } from '@/types/product';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import VariantProducts from './VariantProducts.svelte';

const variantProductsArr: Product[] = [
  {
    Id: 1,
    Name: 'Red book',
    CategoryId: 8,
    Description: 'We love red',
    ProductImages: [],
    ProductTags: [],
    SalePrice: '1',
    CurrentStock: 1,
    VariantGroupId: 9,
  },
  {
    Id: 2,
    Name: 'Blue book',
    CategoryId: 8,
    Description: 'Blue Velvet',
    ProductImages: [],
    ProductTags: [],
    SalePrice: '1',
    CurrentStock: 1,
    VariantGroupId: 9,
  },
];

describe('GIVEN VariantProducts', () => {
  describe('WHEN rendered with no props', () => {
    it('THEN show no product or product related actions', () => {
      const { container } = render(VariantProducts);
      expect(container.children).toHaveLength(1);
    });
  });

  describe('WHEN rendered with props', () => {
    it('THEN show the product', () => {
      render(VariantProducts, {
        variantProducts: [...variantProductsArr],
      });
      expect(
        screen.getByRole('option', { name: /red book/i })
      ).toHaveTextContent('Red book');
      expect(
        (screen.getByRole('option', { name: 'Red book' }) as HTMLOptionElement)
          .selected
      ).toBe(true);
      expect(
        (screen.getByRole('option', { name: 'Blue book' }) as HTMLOptionElement)
          .selected
      ).toBe(false);
    });

    it('THEN show the selected product', async () => {
      render(VariantProducts, {
        variantProducts: [...variantProductsArr],
      });
      expect(
        screen.getByRole('button', { name: /red book/i })
      ).toHaveTextContent('Red book --');
      expect(
        (screen.getByRole('option', { name: 'Red book' }) as HTMLOptionElement)
          .selected
      ).toBe(true);
      expect(
        (screen.getByRole('option', { name: 'Blue book' }) as HTMLOptionElement)
          .selected
      ).toBe(false);
      userEvent.selectOptions(screen.getByRole('combobox'), ['Blue book']);
      expect(
        (screen.getByRole('option', { name: 'Blue book' }) as HTMLOptionElement)
          .selected
      ).toBe(true);
      expect(
        (screen.getByRole('option', { name: 'Red book' }) as HTMLOptionElement)
          .selected
      ).toBe(false);
    });
  });
});
