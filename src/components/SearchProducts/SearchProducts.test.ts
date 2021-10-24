import '@testing-library/jest-dom';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/svelte';
import SearchProducts from './SearchProducts.svelte';
import { refreshProducts } from '@/libs/requests';
import { products, reset as resetProductsStore } from '@/stores/products';

jest.mock('@/libs/requests');

describe('GIVEN SearchProducts', () => {
  beforeEach(() => {
    (refreshProducts as jest.Mock).mockResolvedValue([]);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    resetProductsStore();
  });

  describe('WHEN rendered with no props', () => {
    it('THEN show the loading spinner', async () => {
      (refreshProducts as jest.Mock).mockImplementationOnce(() =>
        jest.setTimeout(500)
      );

      render(SearchProducts);

      expect(await screen.findByTestId('loading-spinner')).toBeInTheDocument();
      await tick();
      expect(refreshProducts).toHaveBeenCalledTimes(1);
      cleanup();
    });

    describe('WHEN rendered with props', () => {
      it('THEN only search for a product if the debounce char limit is surpassed', async () => {
        (refreshProducts as jest.Mock).mockResolvedValueOnce([
          {
            Name: 'Gold necklace',
            Id: 123,
            CategoryId: 1,
            Description: '',
            SalePrice: '1000',
            ProductImages: [],
            ProductTags: [
              {
                Id: 123,
                Name: 'Random',
              },
            ],
            VariantGroupId: 0,
            CurrentStock: 0,
          },
        ]);

        render(SearchProducts, {
          loading: false,
        });

        await tick();
        await tick();
        await tick();
        await tick();
        await tick();
        await tick();
        await tick();

        expect(get(products)).toEqual([
          {
            Name: 'Gold necklace',
            Id: 123,
            CategoryId: 1,
            Description: '',
            SalePrice: '1000',
            ProductImages: [],
            ProductTags: [
              {
                Id: 123,
                Name: 'Random',
              },
            ],
            VariantGroupId: 0,
            CurrentStock: 0,
          },
        ]);
        expect(
          screen.queryByRole('heading', { name: /gold necklace/i })
        ).not.toBeInTheDocument();
        expect(
          screen.queryByRole('heading', { name: /total matches:/i })
        ).not.toBeInTheDocument();

        userEvent.type(screen.getByTestId('search-bar'), 'go');

        expect(screen.getByTestId('search-bar')).toHaveValue('go');
        expect(
          screen.queryByRole('heading', { name: /gold necklace/i })
        ).not.toBeInTheDocument();

        userEvent.type(screen.getByTestId('search-bar'), 'ld');

        expect(screen.getByTestId('search-bar')).toHaveValue('gold');

        await tick();

        expect(
          screen.getByRole('heading', { name: /gold necklace/i })
        ).toBeInTheDocument();
      });
    });
  });
});
