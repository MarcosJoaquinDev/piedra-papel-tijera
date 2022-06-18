//cuando hice click en empezar, se activa goTo(/instructions)
//al recibir ese parametro el path /instructions se activa
//y también el componente initInscructions
//este ultimo a la vaez espera un nuevo goTo

export function initInstructions(param): HTMLElement {
  console.log("soy initInstructions y mi param es: ", param);

  const div: any = document.createElement("div");
  div.className = "container";
  div.innerHTML = `
  <text-comp variant='large'>Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</text-comp>
  <button-comp class='button'>Jugar</button-comp>
  
  <div class="container__hand">
      <hands-comp hand="scissors"></hands-comp>
      <hands-comp hand="rock"></hands-comp>
      <hands-comp hand="paper"></hands-comp>
  </div>`;

  div
    .querySelector(".button")

    .addEventListener("click", () => {
      param.goTo("/game");
    });

  return div;
}
