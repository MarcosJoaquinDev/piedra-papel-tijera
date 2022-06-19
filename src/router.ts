import { initWelcome } from "./pages/welcome";
import { initInstructions } from "./pages/instructions";
import { initGame } from "./pages/game";
import { initResults } from "./pages/results";

const BASE_PATH = "/piedra-papel-tijera";

const routes = [
  { path: /welcome/, component: initWelcome },
  { path: /instructions/, component: initInstructions },
  { path: /game/, component: initGame },
  { path: /results/, component: initResults },
];

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
    location.pathname.includes("/piedra-papel-tijera")
  ) {
    goTo("/welcome");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = () => {
    handleRoute(location.pathname);
  };
}
