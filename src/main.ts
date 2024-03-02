import App from './App.svelte'
(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || import('buffer').Buffer;
const app = new App({
  target: document.getElementById('app')
})

export default app
