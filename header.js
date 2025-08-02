import { LitElement, html, css } from "lit";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/avatar/avatar.js";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/icon/icon.js";
import { registerIconLibrary } from "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/utilities/icon-library.js";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/tooltip/tooltip.js";

registerIconLibrary("default", {
  resolver: (name) =>
    `https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/${name}.svg`,
  mutator: (svg) => {
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
  },
});

export class Header extends LitElement {
  static properties = {};

  constructor() {
    super();
  }
  static styles = css`
    header {
      background-color: #4682a9;
      color: white;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: "Nunito", sans-serif;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .logo {
      display: flex;
      align-items: center;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
      margin-left: 10px;
    }

    nav a {
      color: white;
      text-decoration: none;
      margin-left: 20px;
      font-size: 1rem;
      transition: color 0.3s;
    }

    nav a:hover {
      color: #ffdd57;
    }

  `;
  render() {
    return html`
      <header>
        <div class="logo">
          <sl-icon name="book-open" style="font-size:30px"></sl-icon>
          <h1>Lista de contactos</h1>
        </div>
        <nav>
          <sl-tooltip content="Gatito">
            <sl-avatar
              shape="circle"
              image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            ></sl-avatar>
          </sl-tooltip>
        </nav>
      </header>
    `;
  }
}
customElements.define("header-ej", Header);
