import { state } from "../../state";

export function initGame(param): HTMLElement {
  console.log("soy initGame y mi param es: ", param);

  //setInterval: repite una function indefinidamente durante un intervalo
  let counter = 5;
  const countdown = setInterval(() => {
    const counterEl: any = div.querySelector(".master-circle");
    counter--;
    counterEl.textContent = String(counter);
    console.log("counter: ", counter);

    if (counter < 0) {
      //clearInterval: limpia el intervalo
      clearInterval(countdown);
      param.goTo("/instructions");
    }
  }, 1000);

  const div: any = document.createElement("div");
  div.className = "container";
  div.innerHTML = `
    <div class="hands__top">
      <hands-comp hand="rock" class="rock__top hand-display-none"></hands-comp>
      <hands-comp hand="paper" class="paper__top hand-display-none"></hands-comp>
      <hands-comp hand="scissors" class="scissors__top hand-display-none"></hands-comp>
    </div>

    <div class="master-circle">${counter}</div>
    
    
    <div class="container__hand">
      <hands-comp hand="scissors" class="scissors__bottom disabled"></hands-comp>
      <hands-comp hand="rock" class="rock__bottom disabled"></hands-comp>
      <hands-comp hand="paper" class="paper__bottom disabled"></hands-comp>
    </div>
    `;

  const handsBottom = div.querySelector(".container__hand").children;

  for (const i of handsBottom) {
    i.addEventListener("click", () => {
      const type = i.getAttribute("hand");

      clearInterval(countdown);

      if (type === "scissors") {
        state.setMove("scissors");
        activeHands("scissors");
      } else if (type === "rock") {
        state.setMove("rock");
        activeHands("rock");
      } else if (type === "paper") {
        state.setMove("paper");
        activeHands("paper");
      }
    });
  }

  //ACTIVEHANDS: MUEVE EL USUARIO
  const scissorsUser = div.querySelector(".scissors__bottom");
  const paperUser = div.querySelector(".paper__bottom");
  const rockUser = div.querySelector(".rock__bottom");

  function activeHands(hand) {
    if (hand === "scissors") {
      scissorsUser.classList.remove("disabled"); //desactivado
      scissorsUser.classList.add("actived"); //activado

      //oculto las manos que no eligió el usuario
      //setTimeout = a los x segundos, ejecuta un funcion.
      setTimeout(() => {
        paperUser.classList.add("hand-display-none");
        rockUser.classList.add("hand-display-none");
      }, 5500);
    } else if (hand === "rock") {
      rockUser.classList.remove("disabled"); //desactivado
      rockUser.classList.add("actived"); //activado

      //oculto las manos que no eligió el usuario
      //setTimeout = a los x segundos, ejecuta un funcion.
      setTimeout(() => {
        paperUser.classList.add("hand-display-none");
        scissorsUser.classList.add("hand-display-none");
      }, 5500);
    } else if (hand === "paper") {
      paperUser.classList.remove("disabled"); //desactivado
      paperUser.classList.add("actived"); //activado

      //oculto las manos que no eligió el usuario
      //setTimeout = a los x segundos, ejecuta un funcion.
      setTimeout(() => {
        scissorsUser.classList.add("hand-display-none");
        rockUser.classList.add("hand-display-none");
      }, 5500);
    }
  }

  //SETTIMEOUT: RESPONDE LA MAQUINA
  const counterEl = div.querySelector(".master-circle");
  const handsDiv = div.querySelector(".container__hand");

  const rockTop = div.querySelector(".rock__top");
  const paperTop = div.querySelector(".paper__top");
  const scissorTop = div.querySelector(".scissors__top");

  setTimeout(() => {
    const machineMove = state.getState().currentGame.computerPlay;

    counterEl.remove();

    handsDiv.classList.add("active-hands");
    handsDiv.classList.add("actived-hands-top");

    if (machineMove == "scissors") {
      scissorTop.classList.add("actived-hand-top");
    }
    if (machineMove == "rock") {
      rockTop.classList.add("actived-hand-top");
    }
    if (machineMove == "paper") {
      paperTop.classList.add("actived-hand-top");
    }

    setTimeout(() => {
      param.goTo("/results");
    }, 6000);
  }, 6000);

  //STYLES
  const style = document.createElement("style");
  style.innerHTML = `
  .hands__top {
    transform: rotate(180deg);
    display: flex;
    align-items: center;
    position: relative;
    top: -35px;
    background-red: red;
  }
  .actived {
    display: inherit;
    transform: translateY(-30px);
    transition: all 0.5s;
  }
  .disabled {
    opacity: 60%;
  }
  .hand-display-none {
    display: none;
  }
  .active-hands{
    width
  }
  .actived-hands-top {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .actived-hand-top {
    display: flex;
    transform: translateY(-30px);
    transition: all 0.5s;
  }
  hands-comp:hover {
    cursor:pointer
  }

  .master-circle {
    width: 150px;
    height: 150px;
    box-shadow: 0 0 0 1.875vmin, inset 3.75vmin 3.75vmin 7.5vmin rgba(0, 0, 0, 0.125), 3.75vmin 3.75vmin 7.5vmin rgba(0, 0, 0, 0.125);
    font-size: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    color: #000;
    border-radius: 50%;
    border: 30px;
    font-weight: 700;
  }

  @media (min-width: 420px) {
    .master-circle {
      width: 250px;
      height: 250px;
      box-shadow: 0 0 0 1.25vmin, inset 2.5vmin 2.5vmin 5vmin rgba(0, 0, 0, 0.125), 2.5vmin 2.5vmin 5vmin rgba(0, 0, 0, 0.125);
      font-size: 25vmin;
      text-shadow: 2.5vmin 2.5vmin 5vmin rgba(0, 0, 0, 0.125);
    }
  }

  .master-circle:before {
    content: "";
    -webkit-animation: 5s 1s forwards timer_countdown, 1s 0.875s 15 timer_beat;
            animation: 5s 1s forwards timer_countdown, 1s 0.875s 15 timer_beat;
    color: #000;
  }
  @-webkit-keyframes timer_beat {
    40%, 80% {
      transform: none;
    }
    50% {
      transform: scale(1.125);
    }
  }
  @keyframes timer_beat {
    40%, 80% {
      transform: none;
    }
    50% {
      transform: scale(1.125);
    }
  }
  .master-circle:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -100;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.125);
    -webkit-animation: 5s 1s linear forwards timer_indicator;
            animation: 5s 1s linear forwards timer_indicator;
  }
  @-webkit-keyframes timer_indicator {
    100% {
      transform: translateY(100%);
    }
  }
  @keyframes timer_indicator {
    100% {
      transform: translateY(100%);
    }
  }
}
`;

  div.appendChild(style);
  return div;
}
