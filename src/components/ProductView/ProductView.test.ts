import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/svelte';
import ProductView from './ProductView.svelte';
import { refreshProducts } from '@/libs/requests';

jest.mock('@/libs/requests');

describe('GIVEN ProductView', () => {
  beforeEach(() => (refreshProducts as jest.Mock).mockResolvedValue([]));

  afterEach(() => jest.clearAllMocks());

  describe('WHEN rendered with no props', () => {
    it("THEN don't display any products", () => {
      const { container } = render(ProductView);
      expect(container.children).toHaveLength(1);
      expect(refreshProducts).toHaveBeenCalledTimes(0);
      cleanup();
    });

    describe('WHEN rendered with props', () => {
      it('THEN pull products from api', async () => {
        (refreshProducts as jest.Mock).mockResolvedValueOnce([
          {
            Name: 'Gold necklace',
            Id: 123,
            CategoryId: 1,
            Description: '',
            SalePrice: '1000',
            ProductImages: [],
            ProductTags: [],
            VariantGroupId: 0,
            CurrentStock: 0,
          },
        ]);
        render(ProductView, {
          categoryId: 1,
        });
        expect(refreshProducts).toHaveBeenCalledTimes(1);
        expect(
          await screen.findByRole('button', { name: /gold necklace/i })
        ).toBeInTheDocument();
        cleanup();
      });

      it("THEN display the products which are passed in as a prop AND don't call the api", async () => {
        render(ProductView, {
          categoryId: 2,
          productArr: [
            {
              Name: 'Silver ring',
              Id: 456,
              CategoryId: 2,
              Description: '',
              SalePrice: '2000',
              ProductImages: [],
              ProductTags: [],
              VariantGroupId: 0,
              CurrentStock: 0,
            },
          ],
        });
        expect(refreshProducts).toHaveBeenCalledTimes(0);
        expect(
          await screen.findByRole('button', { name: /silver ring/i })
        ).toBeInTheDocument();
      });
    });
  });
});