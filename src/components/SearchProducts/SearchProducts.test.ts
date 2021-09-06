import '@testing-library/jest-dom';
import { tick } from 'svelte';
import { get } from 'svelte/store';
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
    cleanup()
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('WHEN rendered', () => {
    it('THEN show the loading spinner',  async () => {
      (refreshProducts as jest.Mock).mockImplementationOnce(() => jest.setTimeout(500));
      (refreshTags as jest.Mock).mockImplementationOnce(() => jest.setTimeout(500));
      
      render(SearchProducts)
      
      expect(await screen.findByTestId('loading-spinner')).toBeInTheDocument()
      await tick()
      expect(refreshProducts).toHaveBeenCalledTimes(1)
      expect(refreshTags).toHaveBeenCalledTimes(1)
      cleanup()
    })

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
            ProductTags: ["123"],
            VariantGroupId: 0,
            CurrentStock: 0,
          },
      ]);
      (refreshTags as jest.Mock).mockResolvedValueOnce([
        {
          Id: '123',
          Name: 'Random',
          TagTypeId: "",
        },
        {
          Id: '456',
          Name: 'Seal',
          TagTypeId: "",
        },
      ]);

      render(SearchProducts, {
        loading: false
      })
      
      await tick()
      await tick()
      await tick()
      await tick()
      await tick()
      await tick()
      await tick()
      
      expect(get(products)).toEqual([

          {
            Name: 'Gold necklace',
            Id: 123,
            CategoryId: 1,
            Description: '',
            SalePrice: '1000',
            ProductImages: [],
            ProductTags: ["123"],
            VariantGroupId: 0,
            CurrentStock: 0,
          },
      ])

      expect(screen.getByRole('heading', { name: /random/i })).toHaveTextContent("Random")
      expect(screen.getByRole('heading', { name: /seal/i })).toHaveTextContent("Seal")

    })

    //it.skip('THEN when each tag is clicked show it is selected', () => {})
    //it.skip('THEN when each tag is clicked only show the relevant products', () => {})
    //it.skip('THEN only search for a product if the debounce char limit is surpassed', () => {})
    //it.skip('THEN find the relevant product based on the search input', () => {})
  })
})
