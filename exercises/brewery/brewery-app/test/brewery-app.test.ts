import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import type { BreweryApp } from '../src/brewery-app.js';
import '../src/brewery-app.js';

describe('BreweryApp', () => {
  let element: BreweryApp;
  beforeEach(async () => {
    element = await fixture(html`<brewery-app></brewery-app>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
