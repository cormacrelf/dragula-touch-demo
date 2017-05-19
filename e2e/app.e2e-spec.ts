import { Dragula597Page } from './app.po';

describe('dragula597 App', () => {
  let page: Dragula597Page;

  beforeEach(() => {
    page = new Dragula597Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
