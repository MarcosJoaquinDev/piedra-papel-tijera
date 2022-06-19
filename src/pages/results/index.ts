import { state } from "../../state";

export function initResults(param) {
  console.log("soy initResults y mi param es: ", param);

  //div
  const div: any = document.createElement("div");
  div.className = "container__results";

  //state.whoWins
  const currentState = state.getState();
  const currentGame = currentState.currentGame;

  const myPlay = currentGame.myPlay;
  const computerPlay = currentGame.computerPlay;

  const whoWins = state.whoWins(myPlay, computerPlay);

  //styles de acuerdo al resultado
  let background;
  let imagen;

  const resultImages = {
    tie: require("url:../../../public/images/StarTie.svg"),
    wins: require("url:../../../public/images/StarWins.svg"),
    loss: require("url:../../../public/images/StarLoss.svg"),
  };

  if (whoWins === "wins") {
    imagen = resultImages.wins;
    background = "rgba(136, 137, 73, 0.6)";
  } else if (whoWins === "loss") {
    imagen = resultImages.loss;
    background = "rgba(137, 73, 73, 0.6)";
  } else {
    imagen = resultImages.tie;
    background = "rgba(106, 112, 101, 0.6)";
  }

  //div
  div.innerHTML = `
  <div>
    <img class="img__result" src="${imagen}">
  </div>

  <div class="board">

    <div>
        <h3>Score</h3>
    </div>

    <text-comp>Vos: ${currentState.history.myScore}</text-comp>
    <text-comp>Maquina: ${currentState.history.computerScore}</text-comp>
    
  </div>

  <button-comp class="button">Volver a Jugar</button-comp>
  <button-comp class="button back">Volver al Inicio</button-comp>
  `;

  div.querySelector(".button").addEventListener("click", () => {
    param.goTo("/game");
  });

  div.querySelector(".back").addEventListener("click", () => {
    param.goTo("/welcome");
  });

  //style
  const style = document.createElement("style");

  style.innerHTML = `
    .container__results {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh;
      justify-content: center;
      padding-top: 40px;
      background-color: ${background};
    }
    .img__result {
      height: 180px;
    }
    .board {
      height: 190px;
      width: 230px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 10px solid #000;
      border-radius: 10px;
      margin: 5px 0;
      background-color: #fff;
    }
    .board  h3 {
      text-align: center;
      font-size: 40px;
      font-weight: 700;
      height: 100%;
    }
    .board > text-comp {
      align-self: flex-end;
    }
    .back {
      margin-top: 10px;
    }
  `;

  div.appendChild(style);

  return div;
}
