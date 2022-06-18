customElements.define(
  "button-comp",
  class extends HTMLElement {
    constructor() {
      super();
      this.render();

      console.log("soy button-comp");
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });

      const buttonEl = document.createElement("button");
      const style = document.createElement("style");

      buttonEl.textContent = this.textContent;
      buttonEl.className = "btn";

      style.innerHTML = `
      .btn{
        width: 322px;
        height: 87px;
        background-color: #006CFC;
        color: #ffff;
        font-size: 40px;
        font-family: "Patrick Hand", sans-serif;
        border: 10px solid #001997;
        border-radius: 10px;
      }

      .btn:hover {
        cursor: pointer;
      }
    
      `;

      shadow.appendChild(buttonEl);
      shadow.appendChild(style);
    }
  }
);
