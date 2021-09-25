import '@testing-library/jest-dom';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { render, screen, cleanup, getAllByRole } from '@testing-library/svelte';
import Breadcrumbs from './Breadcrumbs.svelte';
import { refreshCategories } from '@/libs/requests';
import {
  readonlyAllCategories,
  resetReadonlyAllCategoriesStore,
} from '@/stores/categories';
import type { Category } from '@/types/category';

jest.mock('@/libs/requests');

describe('GIVEN Breadcrumbs', () => {
  beforeEach(() => {
    (refreshCategories as jest.Mock).mockResolvedValue([]);
    resetReadonlyAllCategoriesStore();
  });

  afterEach(() => jest.clearAllMocks());

  describe('WHEN rendered no props', () => {
    it('THEN display no breadcrumbs', () => {
      render(Breadcrumbs);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('WHEN rendered with props', () => {
    it('AND the category store is NOT set THEN render breadcrumbs by calling the api', async () => {
      (refreshCategories as jest.Mock).mockResolvedValueOnce([
        {
          Id: 123,
          ParentId: null,
          Name: 'Clothes',
          Children: [
            {
              Id: 456,
              ParentId: 123,
              Name: 'Adult Clothes',
              Chlidren: [],
            },
          ],
        },
      ]);

      render(Breadcrumbs, {
        selectedCategoryId: 456,
      });

      await tick();
      await tick();
      await tick();

      const buttons = screen.getAllByRole('button');

      expect(refreshCategories).toHaveBeenCalledTimes(1);
      expect(buttons[0]).toHaveTextContent('Shop');
      expect(buttons[1]).toHaveTextContent('Clothes');
      expect(buttons[2]).toHaveTextContent('Adult Clothes');
    });

    it('AND the category store IS set THEN render breadcrumbs without calling the api', async () => {
      readonlyAllCategories.set([
        {
          Id: 123,
          ParentId: null,
          Name: 'Clothes',
          Children: [
            {
              Id: 456,
              ParentId: 123,
              Name: 'Adult Clothes',
              Children: [],
            },
          ],
        },
      ]);
      render(Breadcrumbs, {
        selectedCategoryId: 456,
      });

      await tick();
      await tick();
      await tick();

      const buttons = screen.getAllByRole('button');

      expect(refreshCategories).toHaveBeenCalledTimes(0);
      expect(buttons[0]).toHaveTextContent('Shop');
      expect(buttons[1]).toHaveTextContent('Clothes');
      expect(buttons[2]).toHaveTextContent('Adult Clothes');
    });
  });
});
