const hands = {
  rock: require("../../../public/images/rock.png"),
  paper: require("../../../public/images/paper.png"),
  scissors: require("../../../public/images/scissors.png"),
};

customElements.define(
  "hands-comp",
  class extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    //connectedCallback() se llama cuando el elemento
    //creado previamente por el Constructor() se adjunta al DOM.
    //connected Callback = devolucion de llamadas conectado.
    // connectedCallback() {
    //   console.log("soy connectedCallback en hands-comp");
    //   this.render();
    // }

    // addListeners() {
    //   console.log("soy addListeners");

    //   this.addEventListener("click", () => {
    //     const handClick = new CustomEvent("handClick", {
    //       detail: { handMove: this.getAttribute("hand") },
    //     });
    //     this.dispatchEvent(handClick);
    //   });
    // }

    render() {
      const shadow = this.attachShadow({ mode: "open" });

      const divEl = document.createElement("div");
      const style = document.createElement("style");

      const hand: any = this.getAttribute("hand");

      //src= dame la imagen que hay en la posicion que haya en atributo "hand"
      //es decir, si la el atributo hand='rock'
      //me da la imagen de la propiedad rock (hands = {rock: img})
      divEl.innerHTML = `
      <img class="hand" src="${hands[hand]}" />
      `;

      style.innerHTML = `
      .hand {
        width: 40px;
      }
      @media only screen and (min-width: 370px) {
        .hand {
          width: 60px;
        }
      }
      @media only screen and (min-width: 420px) {
        .hand {
          width: 80px;
        }
      }
      
        `;

      shadow.appendChild(divEl);
      shadow.appendChild(style);
    }
  }
);
