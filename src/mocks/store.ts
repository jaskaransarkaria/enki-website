export default class MockStore {
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
