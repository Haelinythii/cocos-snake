import { Director } from 'cc';
const loc = (window || globalThis).location;

export const isLocalhost = loc?.host.includes('localhost');

export function integrateGameToWindow(director: Director) {
  if (isLocalhost) {
    window.myGame = {
      director,
    };
  }
}
