import { LitElement, html, css } from "lit";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/divider/divider.js";

export class Menu extends LitElement {
  static properties = {};

  constructor() {
    super();
  }
  static styles = css`
    nav {
      display: flex;
      flex-direction: column;
      background-color: #f8f9fa;
      width: 150px;
      height: 100vh;
      padding: 10px;
      font-family: "Nunito", sans-serif;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2)
    }
    sl-divider {
      --width: 2px;
      --color: #cad7e1;
      margin:0;
    }
    label {
      padding: 5px;
    }
    label:hover {
      color:  #e9ecef;
      background-color: #4682a9;
      cursor: pointer;
    
    }
  `;
  render() {
    return html`
      <nav>
        <label>Menu</label>
        <sl-divider></sl-divider>
        <label>Inicio</label>
        <sl-divider></sl-divider>
        <label>Contactos</label>
      </nav>
    `;
  }
}
customElements.define("menu-ej", Menu);
