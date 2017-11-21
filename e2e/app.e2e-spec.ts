import { TestD3Page } from './app.po';

describe('test-d3 App', () => {
  let page: TestD3Page;

  beforeEach(() => {
    page = new TestD3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
