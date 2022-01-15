import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import HexGrid from './HexGrid.svelte';

import type { Category } from '@/types/category';
import userEvent from '@testing-library/user-event';

const mockData: Category[] = [
  {
    Id: 123,
    Name: 'Elephant',
    ParentId: null,
    Children: [],
  },
];

describe('GIVEN HexGrid', () => {
  describe('WHEN rendered with NO props', () => {
    it('THEN do NOT render any hexagons AND show loading spinner', () => {
      const { container } = render(HexGrid);
      expect(container.children).toHaveLength(1);
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('WHEN rendered WITH props', () => {
    it('THEN render hexagons', () => {
      render(HexGrid, {
        data: mockData,
      });
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      expect(screen.getByTestId('hex-category-name')).toHaveTextContent(
        'Elephant'
      );
      expect(screen.getByTestId('hex-image')).toBeInTheDocument();
      expect(screen.getByTestId('hex-image-fallback')).toHaveAttribute(
        'src',
        '/faith.jpg'
      );
      expect(screen.getByTestId('hex-image')).toHaveAttribute(
        'srcset',
        'https://enki.imgix.net/123?auto=format'
      );
    });

    it('AND the hexagon is clicked THEN fire the function', () => {
      const mockFn = jest.fn();
      render(HexGrid, {
        data: mockData,
        categoryFn: mockFn,
      });

      expect(mockFn).toHaveBeenCalledTimes(0);

      userEvent.click(screen.getByTestId('hex-button'));

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
