import { LitElement, html, css } from "lit";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/details/details.js";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/icon/icon.js";
import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/components/button/button.js";
import "./popup-form.js";
import "./popup-del.js";
import { registerIconLibrary } from "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/utilities/icon-library.js";

registerIconLibrary("default", {
  resolver: (name) =>
    `https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/${name}.svg`,
  mutator: (svg) => {
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
  },
});

export class Principal extends LitElement {
  static properties = {
    contactos: { type: Array },
  };

  constructor() {
    super();
    this.contactos = [
      {
        id: 1,
        nombre: "Griselda Garcia",
        telefono: "8611355029",
        email: "Griselda@hsm.com",
        foto: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=100&q=80"
      }
    ];
  }

  static styles = css`
    .principal-container {
      flex: 1;
      padding: 20px;
      font-family: "Nunito", sans-serif;
      display: flex;
      flex-direction: column;
    }
    sl-details {
      width: 100%;
      margin-bottom: 20px;
    }
    .summary-content {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: bold;
      font-size: 18px;
    }
    sl-avatar {
      --size: 40px;
    }
    .detalles {
      background-color: #f8f9fa;
    }
    .detalles ul {
      list-style: none;
      padding: 10px;
      margin: 0;
      background-color: #f4f3f3;
    }
    .detalles li span {
      font-weight: bold;
      color: #4682a9;
    }
    .agregar-contacto {
      cursor: pointer;
      display: flex;
      justify-content: right;
      margin-bottom: 20px;
    }
    sl-button {
      --sl-button-padding: 5px;
      --sl-button-font-size: 10px;
      --sl-button-background-color: #4682a9;
      --sl-button-text-color: white;
    }
    .acciones {
      display: flex;
      justify-content: flex-end;
    }
  `;

  render() {
    return html`
      <div class="principal-container">
        <div class="agregar-contacto">
          <sl-button @click=${this.abrirForm} variant="primary" pill size="medium">
            Nuevo contacto
            <sl-icon name="plus-circle" slot="prefix"></sl-icon>
          </sl-button>
        </div>

        ${this.contactos.map(contacto => html`
          <sl-details>
            <div slot="summary" class="summary-content">
              <sl-avatar shape="circle" image=${contacto.foto} label=${contacto.nombre}></sl-avatar>
              <span>${contacto.nombre}</span>
            </div>
            <sl-icon name="plus-square" slot="expand-icon"></sl-icon>
            <sl-icon name="minus-square" slot="collapse-icon"></sl-icon>

            <div class="detalles">
              <ul>
                <li><span>Numero de telefono: </span>${contacto.telefono}</li>
                <li><span>Email: </span>${contacto.email}</li>
                <li class="acciones">
                  <sl-button @click=${() => this.abrirDelete(contacto.id)} circle variant="danger" size="small">
                    <sl-icon name="trash"></sl-icon>
                  </sl-button>
                </li>
              </ul>
            </div>
          </sl-details>
        `)}
      </div>
    `;
  }

  abrirForm() {
    const popup = document.createElement("popup-form");
    popup.addEventListener("add-contact", (e) => {
      this.contactos = [...this.contactos, { id: Date.now(), ...e.detail }];
    });
    popup.addEventListener("close", () => popup.remove());
    document.body.appendChild(popup);
  }

  abrirDelete(id) {
  const contacto = this.contactos.find(c => c.id === id);
  const popup = document.createElement("popup-del");
  popup.userId = id;
  popup.nombre = contacto.nombre;
  popup.addEventListener("delete-contact", (e) => {
    this.contactos = this.contactos.filter(c => c.id !== e.detail.id);
  });

  popup.addEventListener("close", () => popup.remove());
  document.body.appendChild(popup);
}

}

customElements.define("principal-ej", Principal);
