import { LitElement, html, css } from "lit";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/button/button.js";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/icon/icon.js";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/input/input.js";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/divider/divider.js";
import { registerIconLibrary } from "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/utilities/icon-library.js";

registerIconLibrary("default", {
  resolver: (name) =>
    `https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/${name}.svg`,
  mutator: (svg) => {
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
  },
});

export class PopupDel extends LitElement {
  static properties = {
    userId: { type: Number },
    nombre: { type: String },
  };

  constructor() {
    super();
    this.userId = null;
  }
  static styles = css`
    .popup {
      font-family: "Nunito", sans-serif;
      font-optical-sizing: auto;
      font-style: normal;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      z-index: 1000;
    }

    .popup-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    sl-divider {
      --width: 2px;
      --color: #cad7e1;
      margin: 0;
      margin-bottom: 20px;
    }

    sl-input {
      width: 400px;
      margin: 10px 0;
    }
    h3 {
      text-align: center;
    }

    .actions {
      margin: 10px 0;
      display: flex;
      justify-content: center;
    }

    sl-button {
      margin: 0 10px;
    }
  `;
  render() {
    return html`
      <div class="popup">
        <div class="popup-content">
          <h3>¿Esta seguro de eliminar al contacto?</h3>
          <sl-divider></sl-divider>
          <sl-input type="text" .value=${this.nombre} disabled>
            <sl-icon name="user" slot="prefix"></sl-icon
          ></sl-input>
          <div class="actions">
            <sl-button
              size="medium"
              pill
              variant="primary"
              @click=${this.closePopup}
              >Cancelar</sl-button
            >
            <sl-button pill variant="danger" @click=${this.delContact}>Eliminar</sl-button>
          </div>
        </div>
      </div>
    `;
  }

  delContact() {
    this.dispatchEvent(
      new CustomEvent("delete-contact", {
        bubbles: true,
        composed: true,
        detail: { id: this.userId,
            nombre: this.nombre
         },
      })
    );
    this.closePopup();
  }

  closePopup() {
    this.dispatchEvent(
      new CustomEvent("close", { bubbles: true, composed: true })
    );
  }
}
customElements.define("popup-del", PopupDel);
