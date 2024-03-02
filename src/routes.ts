import doneSvelte from "./page/done.svelte"
import etrackSvelte from "./page/etrack.svelte"
import homeSvelte from "./page/home.svelte"
import trackSvelte from "./page/track.svelte"
import uiSvelte from "./page/ui.svelte"

const routes = [
  {
    name: '/',
    component: homeSvelte
  },
  {
    name: "/track/:id",
    component: trackSvelte
  },
  {
    name: "/etrack",
    component: etrackSvelte
  },
  {
    name: "/done/:id",
    component: doneSvelte
  },
  {
    name: "/done",
    component: doneSvelte
  },
  {
    name: "/ui",
    component: uiSvelte
  }
]

export { routes }