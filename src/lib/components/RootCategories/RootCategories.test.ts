import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/svelte';
import { get } from 'svelte/store';
import RootCategories from './RootCategories.svelte';
import { refreshCategories } from '@/libs/requests';
import { readonlyAllCategories, resetReadonlyAllCategoriesStore } from '@/stores/categories';

jest.mock('@/libs/requests');

const nestedCategories = {
	Id: 111,
	ParentId: null,
	Name: 'ROOT',
	NominalCode: 'CATEGORY',
	Children: [
		{
			Id: 123,
			ParentId: null,
			Name: 'Clothes',
			NominalCode: 'CATEGORY',
			Children: [
				{
					Id: 456,
					ParentId: null,
					Name: 'Shoes',
					NominalCode: 'CATEGORY',
					Children: [
						{
							Id: 789,
							ParentId: null,
							Name: 'Hats',
							NominalCode: 'CATEGORY',

							Children: []
						}
					]
				}
			]
		}
	]
};

describe('GIVEN RootCategories', () => {
	beforeEach(() => {
		(refreshCategories as jest.Mock).mockResolvedValue([]);
		resetReadonlyAllCategoriesStore();
		cleanup();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('WHEN rendered', () => {
		it('THEN display the loading spinner if no categories are present', () => {
			render(RootCategories);

			expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
		});

		describe('WHEN we already have the category data', () => {
			it("THEN don't fetch it again from the api", async () => {
				readonlyAllCategories.set([nestedCategories]);
				render(RootCategories);

				expect(refreshCategories).not.toHaveBeenCalled();
				expect(get(readonlyAllCategories)).toEqual([nestedCategories]);

				expect(screen.getByTestId('hex-category-name')).toHaveTextContent('ROOT');
				expect(await screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
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

						NominalCode: ''
					}
				]);

				render(RootCategories);

				expect(refreshCategories).toHaveBeenCalled();
				expect(await screen.findByTestId('hex-category-name')).toHaveTextContent('Clothes');
				expect(await screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
			});

			it('THEN order categories alphabetically', async () => {
				(refreshCategories as jest.Mock).mockResolvedValueOnce([
					{
						Id: 123,
						ParentId: -1,
						Name: 'Clothes',
						Children: [],

						NominalCode: ''
					},
					{
						Id: 456,
						ParentId: -1,
						Name: 'Books',
						Children: [],

						NominalCode: ''
					}
				]);

				render(RootCategories);

				expect(refreshCategories).toHaveBeenCalled();

				const buttons = await screen.findAllByTestId('hex-category-name');

				expect(buttons[0]).toHaveTextContent('Books');
				expect(buttons[1]).toHaveTextContent('Clothes');
				expect(await screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
			});
		});
	});
});
