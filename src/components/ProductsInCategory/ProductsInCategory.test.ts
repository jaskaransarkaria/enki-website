import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/svelte';
import ProductsInCategory from './ProductsInCategory.svelte';
import { refreshProducts } from '@/libs/requests';

jest.mock('@/libs/requests');

describe('GIVEN ProductsInCategory', () => {
  beforeEach(() => (refreshProducts as jest.Mock).mockResolvedValue([]));

  afterEach(() => jest.clearAllMocks());

  describe('WHEN rendered with no props', () => {
    it("THEN don't display any products", () => {
      const { container } = render(ProductsInCategory);
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
        render(ProductsInCategory, {
          categoryId: 1,
        });
        expect(refreshProducts).toHaveBeenCalledTimes(1);
        expect(
          await screen.findByRole('heading', {
            level: 3,
            name: /gold necklace/i,
          })
        ).toBeInTheDocument();
        cleanup();
      });

      it("THEN display the products which are passed in as a prop AND don't call the api", async () => {
        render(ProductsInCategory, {
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
          await screen.findByRole('heading', { level: 3, name: /silver ring/i })
        ).toBeInTheDocument();
      });
    });
  });
});