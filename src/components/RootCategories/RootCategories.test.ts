import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import RootCategories from './RootCategories.svelte';

import type { Writable } from 'svelte/store';
// import { refreshCategories } from '@/libs/requests';

declare let global: any;

//jest.mock('@/libs/requests', () => {
//  return {
//    refreshCategories: jest.fn().mockResolvedValue([])
//  }
//});

class MockStore {
  arg: string;

  constructor(message: string) {
    this.arg = message;
  }

  subscribe() {
    return '' as any;
  }
  set(val: string) {
    this.arg = val;
  }
  update(updater: any) {
    return updater();
  }
}

const mockedStore = new MockStore('') as Writable<string>;

describe('RootCategories has rendered correctly', () => {
  it('displays opening times', () => {
    global.goto = mockedStore;
    const { getByText } = render(RootCategories);
    expect(getByText('OPENING TIMES')).toBeInTheDocument();
  });
});
