import { LitElement, html, css } from "lit";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/button/button.js";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/input/input.js";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/divider/divider.js";

export class PopupForm extends LitElement {
  static properties = {};

  constructor() {
    super();
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
      margin:0;
    }

    sl-input {
        width: 400px;
        margin: 10px 0;
    }
    h2 {
      text-align: center;
      color: #4682a9;
    }

    .actions {
        margin:10px 0;
      display: flex;
      justify-content: center;
    }

    sl-button{
        margin: 0 10px;
    }

    .error {
      color: red;
  `;
  render() {
    return html`
      <div class="popup">
        <div class="popup-content">
          <h2>Agregar nuevo contacto</h2>
          <sl-divider></sl-divider>
          <p>Nombre:</p>
          <sl-input
            id="nombre"
            type="text"
            placeholder="Ingrese el nombre de contacto"
          ></sl-input>
          <p>Numero de telefono:</p>
          <sl-input
            id="telefono"
            type="text"
            placeholder="Ingrese el numero de telefono"
          ></sl-input>
          <p>Email:</p>
          <sl-input
            id="email"
            type="text"
            placeholder="Ingrese el email"
          ></sl-input>
          <p>Foto de contacto:</p>
          <sl-input
            id="foto"
            type="text"
            placeholder="Ingrese la url de la foto"
          ></sl-input>
          <p class="error"></p>
          <div class="actions">
            <sl-button pill variant="success" @click=${this.agregarContacto}
              >Agregar</sl-button
            >
            <sl-button
              size="medium"
              pill
              variant="primary"
              @click=${this.cerrarPopup}
              >Cancelar</sl-button
            >
          </div>
        </div>
      </div>
    `;
  }

  agregarContacto() {
    const error = this.renderRoot.querySelector(".error");
    error.textContent = "";
    const nombre = this.renderRoot.querySelector("#nombre").value;
    const telefono = this.renderRoot.querySelector("#telefono").value;
    const email = this.renderRoot.querySelector("#email").value;
    const foto = this.renderRoot.querySelector("#foto").value;

    if (!nombre || !telefono || !email || !foto) {
      error.textContent = "Por favor, complete todos los campos.";
      return;
    }
    if (!/^\d+$/.test(telefono)) {
      error.textContent = "El numero de telefono debe ser numerico.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.textContent = "El email no es valido.";
      return;
    }
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(foto)) {
      error.textContent = "La URL de la foto no es valida.";
      return;
    }

    this.dispatchEvent(
      new CustomEvent("add-contact", {
        bubbles: true,
        composed: true,
        detail: { nombre, telefono, email, foto },
      })
    );
    this.cerrarPopup();
  }

  cerrarPopup() {
    this.dispatchEvent(
      new CustomEvent("close", { bubbles: true, composed: true })
    );
  }
}
customElements.define("popup-form", PopupForm);
