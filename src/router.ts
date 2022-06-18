import { initWelcome } from "./pages/welcome";
import { initInstructions } from "./pages/instructions";
import { initGame } from "./pages/game";
import { initResults } from "./pages/results";

const routes = [
  { path: /welcome/, component: initWelcome },
  { path: /instructions/, component: initInstructions },
  { path: /game/, component: initGame },
  { path: /results/, component: initResults },
];

//Para imágenes
const BASE_PATH = "/desafio-final-mod5";

function isGithubPages() {
  return location.host.includes("github.io");
}
//

export function initRouter(container: Element) {
  function goTo(path) {
    const completePath = isGithubPages() ? BASE_PATH + path : path;

    history.pushState({}, "", completePath);

    handleRoute(completePath);
  }

  function handleRoute(route) {
    const newRoute = isGithubPages() ? route.replace(BASE_PATH, "") : route;

    for (const i of routes) {
      if (i.path.test(newRoute)) {
        const el = i.component({ goTo: goTo });

        container.firstChild?.remove();

        container.appendChild(el);
      }
    }
  }

  if (
    location.pathname == "/" ||
    location.pathname == "/welcome" ||
    location.pathname == "/desafio-final-mod5/"
  ) {
    goTo("/welcome");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = () => {
    handleRoute(location.pathname);
  };
}
