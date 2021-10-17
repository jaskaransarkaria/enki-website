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
      expect(
        screen.queryByRole('button', { name: /add to basket/i })
      ).not.toBeInTheDocument();
    });
  });

  describe('WHEN rendered with props', () => {
    it('THEN display the component', () => {
      render(AddToBasket, {
        productId: 1,
      });
      expect(
        screen.getByRole('button', { name: /add to basket/i })
      ).toBeInTheDocument();
    });

    it('THEN increment the number of items in the basket', async (done) => {
      render(AddToBasket, {
        productId: 1,
      });

      expect(get(basket)).toEqual([]);
      userEvent.click(screen.getByRole('button', { name: /add to basket/i }));
      expect(get(basket)).toEqual([{ id: '1', quantity: 1 }]);
      await tick();
      await tick();
      await tick();
      await tick();
      setTimeout(() => {
        expect(
          screen.queryByRole('button', { name: /add to basket/i })
        ).not.toBeInTheDocument();
        expect(
          screen.queryByRole('button', { name: /goto basket/i })
        ).toBeInTheDocument();
        done();
      }, 1000);
    });

    // move this test logic to libs/basket || pages/online-shop/basket
    //it('THEN remove items from the basket', async () => {
    //  render(AddToBasket, {
    //    productId: 1,
    //  });

    //  expect(get(basket)).toEqual([]);
    //  userEvent.click(screen.getByRole('button', { name: /add to basket/i }));
    //  expect(get(basket)).toEqual([{ id: '1', quantity: 1 }]);
    //  userEvent.click(screen.getByRole('button', { name: /add to basket/i }));
    //  expect(get(basket)).toEqual([{ id: '1', quantity: 2 }]);
    //  await tick();
    //  userEvent.click(
    //    screen.getByRole('button', { name: /remove from basket/i })
    //  );
    //  expect(get(basket)).toEqual([{ id: '1', quantity: 1 }]);
    //  userEvent.click(
    //    screen.getByRole('button', { name: /remove from basket/i })
    //  );
    //  expect(get(basket)).toEqual([]);
    //});

    it('THEN add a new item to the basket', () => {
      const { container } = render(AddToBasket, {
        productId: 1,
      });

      expect(get(basket)).toEqual([]);
      userEvent.click(screen.getByRole('button', { name: /add to basket/i }));
      expect(get(basket)).toEqual([{ id: '1', quantity: 1 }]);

      render(AddToBasket, {
        target: container,
        props: {
          productId: 2,
        },
      });
      userEvent.click(
        screen.getAllByRole('button', { name: /add to basket/i })[1]
      );
      expect(get(basket)).toMatchObject([
        { id: '2', quantity: 1 },
        { id: '1', quantity: 1 },
      ]);
    });
  });
});
