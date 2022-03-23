import '@testing-library/jest-dom';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { render, screen, cleanup } from '@testing-library/svelte';
import CategoryView from './CategoryView.svelte';
import { categories, reset as resetCategoriesStore } from '$lib/stores/categories';
import type { Category } from '$lib/types/category';

const nestedCategories = {
	Id: -1,
	ParentId: null,
	Name: '',
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

describe('GIVEN CategoryView', () => {
	beforeEach(() => {
		resetCategoriesStore();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('WHEN rendered with no props', () => {
		it('THEN display no categories message', () => {
			render(CategoryView);
			expect(get(categories)).toMatchObject({
				Id: 0,
				ParentId: null,
				Name: '',
				Children: [],
				NominalCode: ''
			});
		});
	});

	describe('WHEN rendered with props', () => {
		it('THEN display the correct category from the store', () => {
			categories.set({ ...nestedCategories });

			render(CategoryView, {
				categoryId: -1,
				categoryFn: (cat: Category) => categories.set(cat)
			});

			expect(get(categories)).toMatchObject({ ...nestedCategories });

			expect(screen.getByText('Clothes')).toBeInTheDocument();
			cleanup(); // it doesn't unmount unless called here, needed to prevent props from interfering accross tests
		});

		it('THEN display the correct the category from the server, when not found in the store', async () => {

			render(CategoryView, {
				categoryId: 456,
				categoryFn: (cat: Category) => categories.set(cat)
			});

			expect(get(categories)).toMatchObject({
				Id: 0,
				ParentId: null,
				Name: '',
				Children: [],
				NominalCode: ''
			});
			await tick(); // using tick helps to flush any state changes in the component
			await tick();
			await tick();
			expect(get(categories)).toMatchObject({
				Id: 456,
				Name: 'Shoes',
				ParentId: null,
				Children: [
					{
						Id: 999,
						ParentId: 123,
						Name: 'Child Shoes',
						Children: [],
						NominalCode: 'CATEGORY'
					}
				],
				NominalCode: 'CATEGORY'
			});
			expect(screen.getByRole('heading')).toHaveTextContent('Child Shoes');
			cleanup();
		});

		it('THEN display the correct category even when it is a child in the store tree', () => {
			categories.set({ ...nestedCategories });

			render(CategoryView, {
				categoryFn: (cat: Category) => categories.set(cat),
				categoryId: 456
			});
			expect(screen.getByRole('heading')).toHaveTextContent('Hats');
			cleanup();
		});

		it('THEN displays any children categories', async () => {
			categories.set({ ...nestedCategories });

			render(CategoryView, {
				categoryFn: (cat: Category) => categories.set(cat),
				categoryId: 456
			});
			expect(screen.getByRole('heading', { name: 'Hats' })).toHaveTextContent('Hats');
			cleanup();
		});

		it("AND showBreadcrumbs is false THEN don't show breadcrumbs", () => {
			render(CategoryView, {
				showBreadcrumbs: false
			});
			expect(screen.queryByText('Shop')).not.toBeInTheDocument();
			cleanup();
		});

		it("AND it is a variant category THEN don't show the category", async () => {
			categories.set({
				Id: 890,
				Name: 'Variant',
				ParentId: null,
				Children: [],
				NominalCode: ''
			});

			render(CategoryView, {
				categoryFn: (cat: Category) => categories.set(cat),
				categoryId: 890
			});
			expect(screen.queryByRole('heading', { name: '890', level: 3 })).not.toBeInTheDocument();

			expect(screen.queryByText('Variant')).not.toBeInTheDocument();
			cleanup();
		});
	});
});
