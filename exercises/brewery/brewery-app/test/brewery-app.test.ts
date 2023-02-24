import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import type { BreweryApp } from '../src/brewery-app.js';
import '../src/brewery-app.js';

describe('BreweryApp', () => {
  it('renders a header', async () => {
    const app: BreweryApp = await fixture(
      html`<brewery-app><p>Some intro</p></brewery-app>`
    );

    const h1 = app.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('KewlBrews');
  });

  it('renders a the intro slot', async () => {
    const app: BreweryApp = await fixture(
      html`<brewery-app><p>Some intro</p></brewery-app>`
    );

    const intro = app.querySelector('.intro')!;
    // This is not dom testing!! :o
    expect(intro).not.to.exist;
  });

  it('passes the a11y audit', async () => {
    const app: BreweryApp = await fixture(html`<brewery-app></brewery-app>`);
    await expect(app).shadowDom.to.be.accessible();
  });
});
