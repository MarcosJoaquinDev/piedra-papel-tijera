customElements.define(
  "text-comp",
  class extends HTMLElement {
    constructor() {
      super();

      this.render();

      console.log("soy text-comp");
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });

      //dame lo que haya en el atributo 'variant', sino lo que tenga el body por defecto
      const variant = this.getAttribute("variant") || "body";
      const divEl = document.createElement("div");
      const style = document.createElement("style");

      style.innerHTML = `
      .text {
        padding-top: 40px;
        text-align: center
      }

      .title {
        font-size: 80px;
        margin-bottom: 100px;
        color: #009048;
        max-width: 350px;
        line-height: 85px;
        font-family: 'Fredoka One', cursive;
      }

      @media only screen and (min-width: 300px) {
        .title {
          margin-bottom: 50px;
        }
      }

      .body {
        font-size: 30px;
        padding-right: 20px;
        padding-top: 0;
      }

      .large {
        font-size: 40px;
        line-height: 60px;
        margin-bottom: 30px;
        max-width: 400px;
      }
      
      @media only screen and (min-width: 426px) {
        .large {
          font-size: 50px;
        }
      }
      `;

      divEl.textContent = this.textContent;
      divEl.className = variant + " text";

      shadow.appendChild(divEl);
      shadow.appendChild(style);
    }
  }
);
