import '@testing-library/jest-dom';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/svelte';
import SearchProducts from './SearchProducts.svelte';
import { refreshProducts, refreshTags } from '@/libs/requests';
import { products, reset as resetProductsStore } from '@/stores/products';

jest.mock('@/libs/requests');

describe('GIVEN SearchProducts', () => {
  beforeEach(() => {
    (refreshProducts as jest.Mock).mockResolvedValue([]);
    (refreshTags as jest.Mock).mockResolvedValue([]);
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
      (refreshTags as jest.Mock).mockImplementationOnce(() =>
        jest.setTimeout(500)
      );

      render(SearchProducts);

      expect(await screen.findByTestId('loading-spinner')).toBeInTheDocument();
      await tick();
      expect(refreshProducts).toHaveBeenCalledTimes(1);
      expect(refreshTags).toHaveBeenCalledTimes(1);
      cleanup();
    });

    describe('WHEN rendered with props', () => {
      it('THEN show the tags', async () => {
        products.set([]);
        (refreshProducts as jest.Mock).mockResolvedValueOnce([
          {
            Name: 'Gold necklace',
            Id: 123,
            CategoryId: 1,
            Description: '',
            SalePrice: '1000',
            ProductImages: [],
            ProductTags: ['123'],
            VariantGroupId: 0,
            CurrentStock: 0,
          },
        ]);
        (refreshTags as jest.Mock).mockResolvedValueOnce([
          {
            Id: 123,
            Name: 'Random',
            TagTypeId: '',
          },
          {
            Id: 456,
            Name: 'Seal',
            TagTypeId: '',
          },
        ]);

        render(SearchProducts, {
          loading: false,
        });

        expect(get(products)).toEqual([]);

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
            ProductTags: ['123'],
            VariantGroupId: 0,
            CurrentStock: 0,
          },
        ]);

        expect(
          screen.getByRole('heading', { name: /random/i })
        ).toHaveTextContent('Random');
        expect(
          screen.getByRole('heading', { name: /seal/i })
        ).toHaveTextContent('Seal');
        cleanup();
      });

      it('THEN when each tag is clicked show it is selected', async () => {
        (refreshProducts as jest.Mock).mockResolvedValueOnce([]);

        (refreshTags as jest.Mock).mockResolvedValueOnce([
          {
            Id: 123,
            Name: 'Random',
            TagTypeId: '',
          },
          {
            Id: 456,
            Name: 'Seal',
            TagTypeId: '',
          },
        ]);

        render(SearchProducts, {
          loading: false,
        });

        await tick();
        await tick();
        await tick();

        const sealTag = screen.getByRole('heading', { name: /seal/i });

        userEvent.click(sealTag);

        await tick();

        expect(sealTag).toHaveClass('selected-tag');
      });

      it('THEN when each tag is clicked only show the relevant products', async () => {
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

        (refreshTags as jest.Mock).mockResolvedValueOnce([
          {
            Id: 123,
            Name: 'Random',
            TagTypeId: '',
          },
          {
            Id: 456,
            Name: 'Seal',
            TagTypeId: '',
          },
        ]);

        render(SearchProducts, {
          loading: false,
        });

        await tick();
        await tick();
        await tick();

        expect(
          screen.queryByRole('button', { name: /gold necklace/i })
        ).not.toBeInTheDocument();
        expect(
          screen.queryByRole('heading', { name: /total matches:/i })
        ).not.toBeInTheDocument();

        userEvent.click(screen.getByRole('heading', { name: /random/i }));

        await tick();
        await tick();
        await tick();
        await tick();

        expect(
          screen.getByRole('heading', { name: /total matches/i })
        ).toHaveTextContent('Total matches: 1');
        expect(
          screen.getByRole('button', { name: /gold necklace/i })
        ).toBeInTheDocument();
      });

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

        (refreshTags as jest.Mock).mockResolvedValueOnce([
          {
            Id: 123,
            Name: 'Random',
            TagTypeId: '',
          },
          {
            Id: 456,
            Name: 'Seal',
            TagTypeId: '',
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
          screen.queryByRole('button', { name: /gold necklace/i })
        ).not.toBeInTheDocument();
        expect(
          screen.queryByRole('heading', { name: /total matches:/i })
        ).not.toBeInTheDocument();

        userEvent.type(screen.getByTestId('search-bar'), 'go');

        expect(screen.getByTestId('search-bar')).toHaveValue('go');
        expect(
          screen.queryByRole('button', { name: /gold necklace/i })
        ).not.toBeInTheDocument();

        userEvent.type(screen.getByTestId('search-bar'), 'ld');

        expect(screen.getByTestId('search-bar')).toHaveValue('gold');

        await tick();

        expect(
          screen.getByRole('button', { name: /gold necklace/i })
        ).toBeInTheDocument();
      });
    });
  });
});
