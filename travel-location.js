class TravelLocation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
            display: block;
            width: 100%;
            font-family: 'Arial', sans-serif;
        }

        :host(:hover) .container {
            transform: scale(1.04);
            box-shadow: 0 8px 24px rgba(0,0,0,0.30);
        }
            
        .container {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
            transition: all 0.3s ease;
            background-size: cover;
            background-position: center;
        }

        :host([orientation="horizontal"]) .container {
            flex-direction: row;
        }

        :host([orientation="horizontal"]) .info {
            max-width: 400px;
        }

        .info {
            flex: 1;
            background: transparent;
            padding: 15px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        h2 {
            font-size: 2rem;
            margin: 0 0 10px 0;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
        }

        p {
            margin: 0 0 12px;
            font-size: 1rem;
        }

        ::slotted(*) {
            font-style: italic;
        }

        :host([shadow="no-shadow"]) .container {
            box-shadow: none;
        }
      </style>

      <div class="container">
        <div class="info">
          <h2 id="name"></h2>
          <p id="country"></p>
          <slot></slot>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [
      'name',
      'country',
      'image',
      'orientation',
      'shadow',
      'border-radius',
      'image-rotation',
      'title-bg-color',
      'title-color',
      'country-color',
      'description-color',
      'width',
      'height'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const container = this.shadowRoot.querySelector('.container');
    const nameEl = this.shadowRoot.getElementById('name');
    const countryEl = this.shadowRoot.getElementById('country');
    const slot = this.shadowRoot.querySelector('slot');

    switch (name) {
      case 'image':
        container.style.backgroundImage = `url(${newValue})`;
        break;
      case 'name':
        nameEl.textContent = newValue;
        break;
      case 'country':
        countryEl.textContent = newValue;
        break;
      case 'border-radius':
        container.style.borderRadius = `${newValue}px`;
        break;
      case 'image-rotation':
        container.style.transform = `rotate(${newValue}deg)`;
        break;
      case 'title-bg-color':
        nameEl.style.backgroundColor = newValue;
        break;
      case 'title-color':
        nameEl.style.color = newValue;
        break;
      case 'country-color':
        countryEl.style.color = newValue;
        break;
      case 'description-color':
        slot.style.color = newValue;
        break;
      case 'width':
        this.style.width = newValue;
        break;
      case 'height':
        container.style.height = newValue;
        break;
    }
  }
}

customElements.define('travel-location', TravelLocation);