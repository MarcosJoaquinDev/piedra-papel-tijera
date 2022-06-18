export function initWelcome(param): HTMLElement {
  console.log("soy initWelcome y mi param es: ", param);

  const div = document.createElement("div");
  div.className = "container";
  div.innerHTML = `
  <text-comp variant='title'>¿Piedra, papel, o tijera?</text-comp>
  <button-comp class='button'>Empezar</button-comp>
  
  <div class="container__hand">
      <hands-comp hand="scissors"></hands-comp>
      <hands-comp hand="rock"></hands-comp>
      <hands-comp hand="paper"></hands-comp>
  </div>`;

  div
    .querySelector(".button")

    .addEventListener("click", () => {
      param.goTo("/instructions");
    });

  return div;
}
