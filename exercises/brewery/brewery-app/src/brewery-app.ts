import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

interface Brewery {
  id: string;
  name: string;
  visited?: boolean;
}

const logo = new URL('../../assets/beer-svgrepo-com.svg', import.meta.url).href;

// customElement decorator defines the component
@customElement('brewery-app')
export class BreweryApp extends LitElement {
  @property({ type: String }) city = 'San Francisco';

  @property({ type: Boolean }) loading = true;

  @property({ type: Array }) breweries: Brewery[] = [];

  static styles = css`
    :host {
      font-size: calc(1rem + 2vmin);
      color: hsl(25deg 76% 30%);
      background-color: var(--brewery-app-background-color);
    }

    main {
      padding: 2rem;
      max-width: min-content;
      margin: 0 auto;
    }

    header {
      display: flex;
      gap: 2rem;
      align-items: center;
      justify-content: center;
      margin: 2rem 0;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 2rem 0;
      font-size: 1rem;
    }

    .logo {
      width: calc(3rem + 10vmin);
    }

    .city {
      font-size: 0.7em;
    }

    .breweries {
      display: grid;
      padding: 0;
      grid-template-columns: max-content;
    }

    .breweries > li {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      gap: 2rem;
      margin: 0.5rem;
    }

    button {
      color: inherit;
      font-size: 1rem;
    }

    .toggle {
      min-width: 8rem;
      text-align: center;
    }

    .visited {
      text-decoration: line-through;
      color: hsl(25deg 76% 50%);
    }
  `;

  connectedCallback(): void {
    super.connectedCallback?.();

    if (!this.breweries.length) {
      this.fetchBreweries();
    }
  }

  async fetchBreweries() {
    // TODO: how to trigger if the city property changes?
    this.loading = true;
    const byCity = this.city.replace(/\s+/g, '_').toLowerCase();

    const response = await fetch(
      `https://api.openbrewerydb.org/breweries?by_city=${byCity}`
    ).then(res => res.json());

    this.breweries = response;
    this.loading = false;
  }

  toggleVisitedStatus(breweryToUpdate: Brewery) {
    this.breweries = this.breweries.map(brewery =>
      brewery.id === breweryToUpdate.id
        ? {
            ...brewery,
            visited: !brewery.visited,
          }
        : brewery
    );
  }

  render() {
    const totalVisited = this.breweries.filter(b => b.visited).length;
    const totalNotVisited = this.breweries.filter(b => !b.visited).length;

    return html`
      <main>
        <header>
          <img class="logo" alt="Beer glass logo" src=${logo} />
          <h1>KewlBrews</h1>
        </header>

        <h2>Breweries <span class="city">in ${this.city}</span></h2>

        ${this.loading ? html`<p role="status">Loading...</p>` : ''}

        <p>Visited: ${totalVisited}, Remaining: ${totalNotVisited}</p>

        <ul class="breweries">
          ${this.breweries.map(
            brewery => html`<li>
              <span class=${brewery.visited ? 'visited' : ''}
                >${brewery.name}</span
              >
              <button
                class="toggle"
                @click="${() => this.toggleVisitedStatus(brewery)}"
              >
                ${brewery.visited ? 'Un-mark visited' : 'Mark visited'}
              </button>
            </li>`
          )}
        </ul>

        <footer>
          Powered by&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.openbrewerydb.org/"
            >Open Brewery DB</a
          >
        </footer>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'brewery-app': BreweryApp;
  }
}
