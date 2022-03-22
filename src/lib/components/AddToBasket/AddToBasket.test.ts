import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import AddToBasket from './AddToBasket.svelte';
import { basket, reset as resetBasketStore } from '@/stores/basket';
import { tick } from 'svelte';

describe('GIVEN AddToBasket', () => {
	beforeEach(() => resetBasketStore());

	describe('WHEN rendered without props', () => {
		it('THEN do not display the component', () => {
			const { container } = render(AddToBasket);
			expect(container.children).toHaveLength(1);
			expect(screen.queryByRole('button', { name: /add to basket/i })).not.toBeInTheDocument();
		});
	});

	describe('WHEN rendered with props', () => {
		it('THEN display the component', () => {
			render(AddToBasket, {
				product: {
					Id: 123,
					Name: 'Red jacket'
				}
			});
			expect(screen.getByRole('button', { name: /add to basket/i })).toBeInTheDocument();
		});

		it('THEN increment the number of items in the basket', async (done) => {
			render(AddToBasket, {
				product: {
					Id: 123,
					Name: 'Red jacket'
				}
			});

			expect(get(basket)).toEqual([]);
			userEvent.click(screen.getByRole('button', { name: /add to basket/i }));
			expect(get(basket)).toEqual([{ id: '123', quantity: 1, name: 'Red jacket' }]);
			await tick();
			await tick();
			await tick();
			await tick();
			setTimeout(() => {
				expect(screen.queryByRole('button', { name: /add to basket/i })).not.toBeInTheDocument();
				expect(screen.queryByRole('button', { name: /goto basket/i })).toBeInTheDocument();
				done();
			}, 1000);
		});

		// move this test logic to libs/basket || pages/online-shop/basket
		it.skip('THEN remove items from the basket', async () => {
			render(AddToBasket, {
				productId: 1
			});

			expect(get(basket)).toEqual([]);
			userEvent.click(screen.getByRole('button', { name: /add to basket/i }));
			expect(get(basket)).toEqual([{ id: '1', quantity: 1 }]);
			userEvent.click(screen.getByRole('button', { name: /add to basket/i }));
			expect(get(basket)).toEqual([{ id: '1', quantity: 2 }]);
			await tick();
			userEvent.click(screen.getByRole('button', { name: /remove from basket/i }));
			expect(get(basket)).toEqual([{ id: '1', quantity: 1 }]);
			userEvent.click(screen.getByRole('button', { name: /remove from basket/i }));
			expect(get(basket)).toEqual([]);
		});

		// move this test to libs/basket || pages/online-shop/basket
		it.skip('THEN add a new item to the basket', async () => {
			const { container } = render(AddToBasket, {
				product: {
					Id: 123,
					Name: 'Red jacket',
					SalePrice: 1000,
					CurrentStock: 1
				}
			});

			expect(get(basket)).toEqual([]);
			userEvent.click(screen.getByRole('button', { name: /add to basket/i }));
			expect(get(basket)).toEqual([
				{
					id: '123',
					quantity: 1,
					name: 'Red jacket',
					price: 1000,
					currentStock: 1
				}
			]);

			render(AddToBasket, {
				target: container,
				props: {
					product: {
						Id: 456,
						Name: 'Blue jacket'
					}
				}
			});
			await tick();
			await tick();
			await tick();
			await tick();
			userEvent.click(screen.getAllByRole('button', { name: /add to basket/i })[1]);
			expect(get(basket)).toMatchObject([
				{ id: '456', quantity: 1 },
				{ id: '123', quantity: 1 }
			]);
		});
	});
});
