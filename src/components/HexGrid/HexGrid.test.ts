import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import HexGrid from './HexGrid.svelte';

import type { Category } from '@/types/category';
import userEvent from '@testing-library/user-event';

const mockData: Category[] = [
  {
    Id: 123,
    Name: 'Elephant',
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
      expect(screen.getByRole('listitem')).toHaveTextContent('Elephant');
      expect(
        screen.getByRole('listitem').querySelector('img')
      ).toBeInTheDocument();
      expect(screen.getByRole('listitem').querySelector('img')).toHaveAttribute(
        'src',
        'https://farm9.staticflickr.com/8461/8048823381_0fbc2d8efb.jpg'
      );
    });

    it('AND the hexagon is clicked THEN fire the function', () => {
      const mockFn = jest.fn();
      render(HexGrid, {
        data: mockData,
        categoryFn: mockFn,
      });

      expect(mockFn).toHaveBeenCalledTimes(0);

      userEvent.click(
        screen.getByRole('listitem').querySelector('button') ??
          screen.getByRole('listitem')
      );

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});