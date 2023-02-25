import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import type { BreweryApp } from '../src/brewery-app.js';
import '../src/brewery-app.js';

describe('BreweryApp', () => {
  it('renders a header', async () => {
    const app: BreweryApp = await fixture(html`<brewery-app></brewery-app>`);

    const h1 = app.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('KewlBrews');
  });

  it('renders a the intro slot', async () => {
    const app: BreweryApp = await fixture(
      html`<brewery-app><p id="intro">Some intro</p></brewery-app>`
    );

    expect(app).dom.to.contain('brewery-app #intro');
    expect(app).lightDom.to.contain('#intro');
    expect(app).lightDom.to.equal('<p id="intro">Some intro</p>');

    // NOTE: snapshots not working, see https://github.com/open-wc/open-wc/issues/2582
  });

  it('renders the default city', async () => {
    const app: BreweryApp = await fixture(html`<brewery-app></brewery-app>`);

    const city = app.shadowRoot!.querySelector('.city')!;
    expect(city.textContent).to.equal('in San Francisco');
  });

  it('renders a given city', async () => {
    const app: BreweryApp = await fixture(
      html`<brewery-app city="Los Angeles"></brewery-app>`
    );

    const city = app.shadowRoot!.querySelector('.city')!;
    expect(city.textContent).to.equal('in Los Angeles');
  });

  it('passes the a11y audit', async () => {
    const app: BreweryApp = await fixture(html`<brewery-app></brewery-app>`);
    await expect(app).shadowDom.to.be.accessible();
  });
});
