type Play = "paper" | "rock" | "scissors";

const state = {
  data: {
    //juego actual
    currentGame: {
      computerPlay: "",
      myPlay: "",
    },

    history: {
      myScore: 0,
      computerScore: 0,
    },
  },

  getState() {
    return this.data;
  },

  getStorage() {
    const storage: any = localStorage;
    const localStorageParseado = JSON.parse(storage.getItem("data"));

    if (localStorageParseado) {
      return (this.data.history = localStorageParseado);
    }
  },

  // listeners: [],
  setState(newState) {
    console.log("soy state.setState, y mi newState es:", newState);

    this.data = newState;

    // for (const i of this.listeners) {
    //   const funcion = i();
    // }

    this.saveDataInLocalStorage();
  },

  setScore() {
    console.log("soy state.setScore()");

    const currentState = this.getState();
    const myPlay = currentState.currentGame.myPlay;
    const computerPlay = currentState.currentGame.computerPlay;

    const currentWhoWins = this.whoWins(myPlay, computerPlay);
    const myScore = currentState.history.myScore;
    const computerScore = currentState.history.computerScore;

    //si gana el usuario se le suma 1 punto
    if (currentWhoWins === "wins") {
      return this.setState({
        ...currentState,
        history: {
          myScore: myScore + 1,
          computerScore: computerScore,
        },
      }); //si gana la pc se le suma un punto
    } else if (currentWhoWins === "loss") {
      return this.setState({
        ...currentState,
        history: {
          myScore: myScore,
          computerScore: computerScore + 1,
        },
      });
    }
  },

  setMove(move: Play) {
    console.log("soy setMove y mi move es: ", move);

    const currentState = this.getState();

    //guardo el juego que me pasó el usuario
    currentState.currentGame.myPlay = move;

    const machineMove = () => {
      const hands = ["hands", "rock", "scissors"];

      return hands[Math.floor(Math.random() * 3)];
    };

    //Guardo la eleccion aleatoria de la máquina
    currentState.currentGame.computerPlay = machineMove();

    //Llamo a setScore
    this.setScore();
  },

  whoWins(myPlay: Play, computerPlay: Play) {
    //empates
    const tieS: boolean = myPlay == "scissors" && computerPlay == "scissors";
    const tieR: boolean = myPlay == "rock" && computerPlay == "rock";
    const tieP: boolean = myPlay == "paper" && computerPlay == "paper";
    const tie = [tieS, tieP, tieR].includes(true);

    if (tie) {
      return "tie";
    }

    //
    const winS: boolean = myPlay == "scissors" && computerPlay == "paper";
    const winR: boolean = myPlay == "rock" && computerPlay == "scissors";
    const winP: boolean = myPlay == "paper" && computerPlay == "rock";
    const youWin = [winS, winP, winR].includes(true);

    if (youWin) {
      return "wins";
    } else {
      return "loss";
    }
  },

  saveDataInLocalStorage() {
    const currentHistory = this.getState().history;
    localStorage.setItem("data", JSON.stringify(currentHistory));
  },
};

export { state };
