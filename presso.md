<!--
  $theme: default
  pretender: true
  footer: Matthias Hryniszak - ITee&Cofee 11.01.2018
-->

<!--
  *footer: 
-->

# Framework-less frontend development

#### by Matthias Hryniszak

---

# 2018-01-09

## The day the world changed

---

![Windows 8.1 Terminated](win81-terminated.jpg)
---

![IE Dead](ie-dead.jpg)

---

## Remember

<br/>

**HTML**/**DOM** is the representation of concepts
**CSS** determines how they look like and what is their positioning
**JavaScript** makes them behave dynamically

---

# Let's talk about HTML

---

## Old-scool HTML :stuck_out_tongue_winking_eye:

```html
<body>
  <div class="container">
    <div class="header">
      Header
    </div>
    <div class="nav">
      Navigation
    </div>
    <div class="sidebar">
      Sidebar
    </div>
    <div class="main">
      <p>...Lorem ipsum here...</p>
    </div>
    <div class="footer">
      Footer
    </div>
  </div>
</body>
```

---

## Semantic HTML using html5

```html
<body>
  <header>
    Header
  </header>
  <nav>
    Navigation
  </nav>
  <aside>
    Sidebar
  </aside>
  <article>
    <p>...Lorem ipsum here...</p>
  </article>
  <footer>
    Footer
  </footer>
</body>
```

---

# Let's talk about CSS layouts

---

## CSS Layouts pre-2018

* Unintuitive tricks
* Negative margins, floats, clear-fixes and more
* Obstructive constructs like containers for no obvious reasons
* Frameworks

---

## CSS Layouts as it exists Today

* Grid (https://caniuse.com/#search=grid)

* Flexbox (https://caniuse.com/#search=flex)

* Media queries (https://caniuse.com/#feat=css-mediaqueries)

---

## First: fix the browser :smile:

```css
* {
  box-sizing: border-box;
}
```

---

## Let's get you lying out on a grid

```css
body {
  display: grid;
}

header  { }
nav     { }
aside   { }
article { }
footer  { }
```

---

## Naming things

```css
header  { area: header; }
nav     { arae: navigation; }
aside   { area: sidebar; }
article { area: main; }
footer  { area: footer; }
```

---

## Defining how things are laid out - mobile first

```css
body {
  display: grid;

  grid-template-areas:
    "header"
    "navigation"
    "main"
    "sidebar"
    "footer"
}
```

--- 

## Let's go tablet-size

```css
@media (min-width: 500px) {
  body {
    grid-template-columns:
      minmax(200px, 250px) minmax(350px, 450px);

    grid-template-areas:
      "header     header"
      "navigation navigation"
      "sidebar    main"
      "footer     footer"
  }
}
```

--- 

## Let's go big screen - fluid layout

```css
@media (min-width: 700px) {
  body {
    grid-template-columns:
      minmax(250px, 350px) minmax(450px, 1fr);

    grid-template-areas:
      "header     header"
      "navigation navigation"
      "sidebar    main"
      "footer     footer"
  }
}
```

---

## Let's go big screen - fixed layout

```css
@media (min-width: 700px) {
  body {
    grid-template-columns:
     1fr minmax(200px, 250px) minmax(350px, 450px) 1fr;

    grid-template-areas:
      ". header     header     ."
      ". navigation navigation ."
      ". sidebar    main       ."
      ". footer     footer     ."
  }
}
```

---

## Where did the ```700px``` came from?

```
@media (min-width: 500px) {
  body {
    grid-template-columns:
      minmax(200px, 250px) minmax(350px, 450px);
  }
}
```

<div style="text-align: center; font-size: 40px; padding-top: 50px;">
  <b>250px</b> + <b>450px</b> = <b>700px</b>
</div>

---

# Let's talk about JavaScript

---

## JavaScript - the bad parts :angry:

```javascript
// https://www.destroyallsoftware.com/talks/wat

> [] + []


> [] + {}
[object Object]

> {} + []
0

> {} + {}
NaN
```

---

## JavaScript without frameworks?

```javascript
for (let i = 0; i < 100; i++) {
  const color = Math.round(Math.random() * 0xffffff)
    .toString(16).padStart(6, '0');

  const div = document.createElement('div')
  div.style.backgroundColor = '#' + color
  div.innerText = '#' + color
  div.classList.add('item')

  const rnd = Math.random();
  if (rnd > 0.25 && rnd < 0.5) div.classList.add('one')
  if (rnd > 0.5 && rnd < 0.75) div.classList.add('two')
  if (rnd > 0.75) div.classList.add('three')

  document.body.appendChild(div)
}
```

---

## Maintainability

```javascript
class RandomColorBox extends HTMLElement {
  connectedCallback () {
    const color = this.getRandomColor()
    this.style.backgroundColor = '#' + color
    this.innerText = '#' + color
    this.classList.add(this.getRandomClass())
  }
  getRandomColor () {
    return Math.round(Math.random() * 0xffffff)
      .toString(16).padStart(6, '0');
  }
  getRandomClass () {
    const rnd = Math.random();
    if (rnd > 0.25 && rnd < 0.5) return 'one'
    if (rnd > 0.5 && rnd < 0.75) return 'two'
    return 'three'
  }
}
```
---

## Readability

```javascript
window
  .customElements
  .define('random-color-box', RandomColorBox)

for (let i = 0; i < 100; i++) {
  document.body.appendChild(
    document.createElement('random-color-box')
  )
}
```

---

## Modularity

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" 
        content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Multicolor supergrid</title>
  <link rel="stylesheet" href="./index4.css">
</head>
<body>
  <script type="module" src="./random-color-box.js">
  </script>
  <script type="module" src="./index4.js"></script>
</body>
</html>
```

---

## Modularity

```javascript
import { RandomColorBox } from './random-color-box.js'

window
  .customElements
  .define('random-color-box', RandomColorBox)

for (let i = 0; i < 100; i++) {
  document.body.appendChild(
    document.createElement('random-color-box')
  )
}
```

---

## Modularity

```javascript
/**
 * RandomColorBox component
 * 
 * This component creates a box in a random color
 * suitable for display in a grid layout with one of 3
 * randomly added classes: 'one', 'two' and 'three'
 */
export class RandomColorBox extends HTMLElement {
  connectedCallback () { ... }
  getRandomColor () { ... }
  getRandomClass () { ... }
}
```

---

## :fire: ```that``` ```this``` hell :fire:

```javascript
function click(e) {
  console.log(this)
}

click()
$('body').on('click', click)
```

---

## :fire: ```that``` ```this``` hell :fire:

```javascript
function click(e) {
  console.log(this)
}

click()
$('body').on('click', click)
```

---

## :fire: ```that``` ```this``` hell :fire:

```javascript
var that = this;

function click(e) {
  console.log(that)
}

click()
$('body').on('click', click)
```

---

## Fat arrow + closure

```javascript
const click = e => console.log(this)

document.body.addEventListener('click', click)
click()
```

---

## Higher order functions

Pre-ECMAScript using regular functions
```javascript
function adder (a) {
  return function (b) {
    return a + b
  }
}
```

<br/>

Using fat arrow function expression
```javascript
const adder = a => b => a + b)
```

---

## Collections API

```javascript
const a = [ { x: 1 }, { x: 2 }, { x: 3 }]

const b = a.map(i => i.x)
b.reduce((acc, x) => acc + x)
b.reduce((acc, x) => acc * x)
b.reduce((acc, x) => acc + ',' + x) // b.join(',')
b.some(x => x %% 2 == 0)
b.some(x => x < 10)
b.find(x => x %% 2 == 0)
b.filter(x => x %% 2 == 0)
b.forEach(console.log)
```

---

## Searching for DOM elements

```javascript
const div = document.querySelector('div')
const divs = document.querySelectorAll('div')

const input = div.querySelector('input[type=text]')
const inputs = div.querySelectorAll('input[type=text]')
```

<br/>

Please note: this is the real CSS3 selector used here, not some pseudo selector invented for the purpose of making up for ancient browser shortcomings!

---

# Final thoughts

---

## When in doubt use http://caniuse.com
## Favor polyfills over massive frameworks
## Use frameworks that with the plarform*

---

# Questions?

---

# May the platform be with you!