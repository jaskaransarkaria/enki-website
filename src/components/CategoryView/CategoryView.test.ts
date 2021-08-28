import '@testing-library/jest-dom';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { render, screen, cleanup } from '@testing-library/svelte';
import CategoryView from './CategoryView.svelte';
import { refreshCategory } from '@/libs/requests';
import { categories, reset as resetCategoriesStore } from '@/stores/categories';
import type { Category } from '@/types/category';

jest.mock('@/libs/requests');

describe('GIVEN CategoryView', () => {
  beforeEach(() => {
    (refreshCategory as jest.Mock).mockResolvedValue([]);
    resetCategoriesStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('WHEN rendered with no props', () => {
    it('THEN display no categories message', () => {
      render(CategoryView);
      expect(screen.getByRole('heading')).toHaveTextContent(
        'no "categoryToShow" from CategoryView'
      );
    });
  });

  describe('WHEN rendered with props', () => {
    it('THEN display the correct category from the store', async () => {
      categories.set({
        Id: 123,
        Name: 'Clothes',
        Children: [],
      });

      render(CategoryView, {
        categoryId: 123,
        categoryFn: (cat: Category) => categories.set(cat),
      });
      expect(refreshCategory).toHaveBeenCalledTimes(0);
      expect(screen.getByRole('heading')).toHaveTextContent('123');
      cleanup(); // it doesn't unmount unless called here, needed to prevent props from interfering accross tests
    });

    it('THEN display the correct the category from the server, when not found in the store', async () => {
      (refreshCategory as jest.Mock).mockResolvedValueOnce([
        {
          Id: 456,
          Name: 'Shoes',
          Children: [],
        },
      ]);

      render(CategoryView, {
        categoryId: 456,
        categoryFn: (cat: Category) => categories.set(cat),
      });

      expect(refreshCategory).toHaveBeenCalledTimes(1);
      await tick();
      await tick();
      await tick();
      expect(get(categories)).toMatchObject({
        Id: 456,
        Name: 'Shoes',
        Children: [],
      });
      expect(screen.getByRole('heading')).toHaveTextContent('456');
      cleanup();
    });
  });
});
