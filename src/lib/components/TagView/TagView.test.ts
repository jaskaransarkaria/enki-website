import '@testing-library/jest-dom';
import { tick } from 'svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import TagView from './TagView.svelte';
import { refreshTags } from '@/libs/requests';

import type { Category } from '@/types/category';

jest.mock('@/libs/requests');

const mockData: Category[] = [
	{
		Id: 123,
		Name: 'Elephant',
		ParentId: null,
		Children: [],
		NominalCode: ''
	}
];

describe('Given TagView', () => {
	beforeEach(() => {
		(refreshTags as jest.Mock).mockResolvedValue([]);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('WHEN rendered without props and no tags', () => {
		it('THEN show no categories at all', () => {
			const { container } = render(TagView);
			expect(container.children).toHaveLength(1);
		});
	});

	describe('WHEN rendered with props', () => {
		const mockFn = jest.fn();
		it('AND no tags data THEN show just the other categories', () => {
			render(TagView, {
				data: mockData,
				categoryFn: mockFn
			});

			expect(screen.getByTestId('hex-category-name')).toHaveTextContent('Elephant');
			expect(screen.getAllByTestId('hex-category-name')).toHaveLength(1);
		});

		it('AND tag data THEN show both tag and other categories', async () => {
			(refreshTags as jest.Mock).mockResolvedValueOnce([
				{
					Id: 789,
					Name: 'Zebra',
					TagTypeId: '999'
				}
			]);

			const mockFn = jest.fn();

			render(TagView, {
				data: mockData,
				categoryFn: mockFn
			});

			await tick();
			await tick();
			await tick();
			const allDisplayedCats = await screen.queryAllByTestId('hex-category-name');
			expect(allDisplayedCats).toHaveLength(2);
			expect(allDisplayedCats[0]).toHaveTextContent('Elephant');
			expect(allDisplayedCats[1]).toHaveTextContent('Zebra');
		});

		it('AND a non tag category is clicked THEN fire the categoryFn', async () => {
			(refreshTags as jest.Mock).mockResolvedValueOnce([
				{
					Id: 789,
					Name: 'Buffalo',
					TagTypeId: '999'
				}
			]);

			const mockFn = jest.fn();

			render(TagView, {
				data: mockData,
				categoryFn: mockFn
			});

			await tick();
			await tick();
			await tick();

			const allDisplayedCats = await screen.queryAllByTestId('hex-category-name');

			expect(allDisplayedCats).toHaveLength(2);
			expect(allDisplayedCats[0]).toHaveTextContent('Elephant');
			expect(allDisplayedCats[1]).toHaveTextContent('Buffalo');

			const allButtons = await screen.queryAllByTestId('hex-button');

			userEvent.click(allButtons[0]);
			expect(mockFn).toHaveBeenCalledTimes(1);
		});

		test.todo('because we are unable to mock routify we cannot test clicking a tag');
	});
});
