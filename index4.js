import { RandomColorBox } from './random-color-box.js'

window.customElements.define('random-color-box', RandomColorBox)

for (let i = 0; i < 100; i++) {
  document.body.appendChild(document.createElement('random-color-box'))
}
