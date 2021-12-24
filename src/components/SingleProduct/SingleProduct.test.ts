import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import SingleProduct from './SingleProduct.svelte';

describe('Given SingleProduct', () => {
  describe('WHEN rendered without props', () => {
    it('THEN show no product or product related actions', () => {
      const { container } = render(SingleProduct);
      expect(container.children).toHaveLength(1);
    });
  });
  describe('WHEN rendered with props', () => {
    it('THEN show the product', () => {
      render(SingleProduct, {
        product: {
          Id: 123,
          Name: 'Red jacket',
          SalePrice: '1000',
          CurrentStock: '1',
        },
      });
      expect(
        screen.getByRole('heading', { name: /red jacket/i })
      ).toHaveTextContent('Red jacket');
      expect(
        screen.getByRole('button', { name: 'Add to Basket' })
      ).toBeInTheDocument();
    });

    it.skip('THEN show the detailed product (with thumbnails) this belongs in ProductImage', () => {
      render(SingleProduct, {
        showDetailedView: true,
        product: {
          Id: 456,
          Name: 'Blue jacket',
          Description: 'A very blue jacket',
          SalePrice: '2000',
          CurrentStock: '2',
          ProductImages: [1, 2],
        },
      });
      const multiImages = screen.getAllByRole('img', { name: /456/i });

      expect(
        screen.getByRole('heading', { level: 2, name: /blue jacket/i })
      ).toHaveTextContent('Blue jacket');
      expect(
        screen.getByRole('heading', { level: 4, name: /very/i })
      ).toHaveTextContent('A very blue jacket');
      expect(
        screen.getByRole('heading', { level: 4, name: /2000/i })
      ).toHaveTextContent('2000 -- 2 in stock');
      expect(multiImages).toHaveLength(3);
      expect(multiImages[0]).toHaveAttribute(
        'src',
        'https://enki.imgix.net/456-0'
      );
      expect(multiImages[1]).toHaveAttribute(
        'src',
        'https://enki.imgix.net/456-0'
      );
      expect(multiImages[2]).toHaveAttribute(
        'src',
        'https://enki.imgix.net/456-1'
      );
      expect(
        screen.getByRole('button', { name: 'Add to Basket' })
      ).toBeInTheDocument();
    });

    it('THEN show no image', async () => {
      render(SingleProduct, {
        showDetailedView: true,
        product: {
          Id: 789,
          Name: 'Green jacket',
          Description: 'greeny',
          SalePrice: '3000',
          CurrentStock: '3',
        },
      });
      expect(
        screen.getByRole('heading', { level: 2, name: 'Green jacket' })
      ).toHaveTextContent('Green jacket');
      expect(
        screen.getByRole('heading', { level: 4, name: /greeny/i })
      ).toHaveTextContent('greeny');
      expect(
        screen.getByRole('heading', { level: 4, name: /3000/i })
      ).toHaveTextContent('3000 -- 3 in stock');
      expect(screen.queryAllByRole('img', { name: /789/i })).toHaveLength(0);
      expect(
        screen.getByRole('button', { name: 'Add to Basket' })
      ).toBeInTheDocument();
    });
  });
});
