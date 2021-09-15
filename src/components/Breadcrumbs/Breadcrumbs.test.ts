import '@testing-library/jest-dom';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { render, screen, cleanup } from '@testing-library/svelte';
import Breadcrumbs from './Breadcrumbs.svelte';
import { refreshCategory } from '@/libs/requests';
import {
  readonlyAllCategories,
  resetReadonlyAllCategoriesStore,
} from '@/stores/categories';
import type { Category } from '@/types/category';

jest.mock('@/libs/requests');

describe('GIVEN Breadcrumbs', () => {
  beforeEach(() => {
    (refreshCategory as jest.Mock).mockResolvedValue([]);
    resetReadonlyAllCategoriesStore();
  });

  afterEach(() => jest.clearAllMocks());

  describe('WHEN rendered no props', () => {
    it('THEN display no breadcrumbs', () => {
      render(Breadcrumbs);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
