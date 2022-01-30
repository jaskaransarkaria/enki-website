import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import RootCategories from './RootCategories.svelte';
import { refreshCategories } from '@/libs/requests';

jest.mock('@/libs/requests');

describe('GIVEN RootCategories', () => {
  beforeEach(() => {
    (refreshCategories as jest.Mock).mockResolvedValue([]);
  });

  describe('WHEN rendered', () => {
    it('THEN display opening times', () => {
      render(RootCategories);

      expect(
        screen.getByText('welcome to the online shop')
      ).toBeInTheDocument();
    });

    it('THEN display the loading spinner if no categories are present', () => {
      render(RootCategories);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('WHEN handling category data', () => {
    it('THEN fetch categories from api AND display them', async () => {
      (refreshCategories as jest.Mock).mockResolvedValueOnce([
        {
          Id: 123,
          ParentId: -1,
          Name: 'Clothes',
          Children: [],

          NominalCode: '',
        },
      ]);

      render(RootCategories);

      expect(refreshCategories).toHaveBeenCalled();
      expect(await screen.findByTestId('hex-category-name')).toHaveTextContent(
        'Clothes'
      );
      expect(
        await screen.queryByTestId('loading-spinner')
      ).not.toBeInTheDocument();
    });

    it('THEN order categories alphabetically', async () => {
      (refreshCategories as jest.Mock).mockResolvedValueOnce([
        {
          Id: 123,
          ParentId: -1,
          Name: 'Clothes',
          Children: [],

          NominalCode: '',
        },
        {
          Id: 456,
          ParentId: -1,
          Name: 'Books',
          Children: [],

          NominalCode: '',
        },
      ]);

      render(RootCategories);

      expect(refreshCategories).toHaveBeenCalled();

      const buttons = await screen.findAllByTestId('hex-category-name');

      expect(buttons[0]).toHaveTextContent('Books');
      expect(buttons[1]).toHaveTextContent('Clothes');
      expect(
        await screen.queryByTestId('loading-spinner')
      ).not.toBeInTheDocument();
    });
  });
});
