/**
 * RandomColorBox component
 * 
 * This component creates a box in a random color suitable for display
 * in a grid layout with one of 3 randomly added classes: 'one', 'two' and 'three'
 */
export class RandomColorBox extends HTMLElement {
  connectedCallback () {
    const rnd = Math.random();
    const color = Math.round(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    this.style.backgroundColor = '#' + color
    this.innerText = '#' + color
    if (rnd > 0.25 && rnd < 0.5) this.classList.add('one')
    if (rnd > 0.5 && rnd < 0.75) this.classList.add('two')
    if (rnd > 0.75) this.classList.add('three')
  }
}
