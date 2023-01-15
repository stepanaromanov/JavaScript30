# javascript_30
### Vanilla JavaScript

01 DRUM KIT

When user presses key button it should play corresponding audio. Style of the key should be changed also.
After sound play key style returns to initial state.
```
'use strict';
const playAudio = ({key}) => {
  const keyCode = key
                    .toUpperCase()
                    .charCodeAt();
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!audio) return null;
  new Audio(audio.src).play();

  const keyButton = document.querySelector(`div[data-key="${keyCode}"]`);
  keyButton
    .classList
    .add('playing');
};

const rollbackTransition = ({ target: { classList }, propertyName }) => {
  if (classList.contains('playing')
  && propertyName === 'transform') {
    classList.remove('playing');
  }
};

document.addEventListener('keydown', (e) => playAudio(e));
document.querySelectorAll('.key').forEach(elem =>
         elem.addEventListener('transitionend', rollbackTransition));
```

02 JS CSS CLOCK

Clock elements created in HTML, hands transitions already determined in CSS. It is necessary to write JS code to activate these elements. 
```
'use strict';
window.setInterval(()=> {
  const now = new Date();
  const calcDeg = (time, ceil) => ((time / ceil) * 360) + 90;

  const secondsHand = document.querySelector('.second-hand');
  const minutesHand = document.querySelector('.min-hand');
  const hoursHand = document.querySelector('.hour-hand');

  const secondsDegrees = calcDeg(now.getSeconds(), 60)
  const minutesDegrees = calcDeg(now.getMinutes(), 60)
  const hoursDegrees = calcDeg(now.getHours(), 12)

  secondsHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;
}, 1000)
```
03 CSS VARIABLES

We need to add event listener for all the inputs and make image processing on the page interactive.
```
'use strict';
const handleUpdate = ({ target: { name, value, dataset: { sizing } } }) => {
  document.documentElement.style.setProperty(`--${name}`, `${value}${sizing || ''}`);
};
document.querySelectorAll('.controls input').forEach((input) => {
            input.addEventListener("change", handleUpdate)
            input.addEventListener("mousemove", handleUpdate)
})
```
04 ARRAY CARDIO DAY 1

Practicing operations with arrays
```
// 1. Filter the list of inventors for those who were born in the 1500's
const fifteen = inventors.filter(
                  inventor => (inventor.year >= 1500 && inventor.year < 1600 ?
                  true : false))

// 2. Give us an array of the inventors first and last names
const fullNames = inventors.map(
                    inventor => `${inventor.first} ${inventor.last}`)

// 3. Sort the inventors by birthdate, oldest to youngest
const ordered = inventors.sort(
                    (a, b) => (a.year > b.year ? 1 : -1))

// 4. How many years did all the inventors live all together?
const totalYears = inventors.reduce((total, inventor) =>
                        (total + (inventor.passed - inventor.year)), 0)

// 5. Sort the inventors by years lived
const oldest = inventors.sort((a, b) => (
                   a.passed - a.year > b.passed - b.year ?
                   -1 : 1))

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
//const category = document.querySelector('.mw-category');
//const links = [...category.querySelectorAll('a')];
//const de = links.map(link => link.textContent).filter(streetName => streetName.includes('de'));
                
// 7. Sort the people alphabetically by last name
    const alpha = people.sort((a, b) => {
      const [aLast, aFirst] = a.split(', ');
      const [bLast, bFirst] = b.split(', ');
      return aLast > bLast ? 1 : -1
    })

// 8. Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

const transportation = data.reduce((obj, item) => {
  if(!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});
```

05 FLEX PANEL GALLERY

Adding interactivity to block transiotions.
```
'use strict'

function toggleOpen() {
  this.classList.toggle('open');
}

function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

document.querySelectorAll('.panel')
        .forEach(panel => {
                  panel.addEventListener('click', toggleOpen);
                  panel.addEventListener('transitionend', toggleActive);
        });
```

06 TYPE AHEAD

Fetching and filtering cities data with regular expressions 
```
'use strict';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

const numberWithCommas = (x) => (
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
)

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

const displayMatching = (element) => {
  const html = cities
          .filter(place => {
              const regex = new RegExp(element.value, 'gi')
              return regex.test(place.city) || regex.test(place.state)
          }).map(place => {
              return `
                <li>
                  <span class="name">${place.city}, ${place.state}</span>
                  <span class="population">${numberWithCommas(place.population)}</span>
                </li>`;
          }).join('');
  suggestionsInput.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestionsInput = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', (element) => displayMatching(searchInput));
```
07 ARRAY CARDIO DAY 2

Filtering elements of array on condition
```
const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 }
];

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 }
];

//Is at least one person 19 or older?
const isAdult = people.some(person => (
        (new Date()).getFullYear()) - person.year >= 19
); 

//Is everyone 19 or older?
const allAdults = people.every(person => (
        (new Date()).getFullYear()) - person.year >= 19
); 

// find the comment with the ID of 823423
const findComment = comments.find(comment =>
  comment.id === 823423);

// delete the comment with the ID of 823423
const findIndex = comments.findIndex(comment =>
  comment.id === 823423);
const filteredComments = comments
                            .filter(comment => (
                            comments.indexOf(comment) !== findIndex))
```
08 HTML CANVAS

Creating canvas for drawing
```
const canvas = document.querySelector('#draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#FIRST';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const draw = (event) => {
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();

  [lastX, lastY] = [event.offsetX, event.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if(direction) {
    ctx.lineWidth++;
  } else {
  ctx.lineWidth--;
  }

}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', () => {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX, event.offsetY];

});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
```
09 DEV TOOLS DOMINATION

Practicing operations with console logging

```
const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log('hello');
// Interpolated
console.log('hello, I am %s string', 'some variable');
// Styled
console.log('%chello I am some styled text', 'font-size: 16px; background: red;');
// warning!
console.warn('OH NOOO');
// Error :|
console.error('OH ERROR');
// Info
console.info('some fact');
// Testing
const p = document.querySelector('p');
console.assert(p.classList.contains('ouch'), 'that is wrong');
// clearing
//console.clear()
// Viewing DOM Elements
console.log(p);
console.dir(p);
// Grouping together
dogs.forEach(dog => {
  console.groupCollapsed(`${dog.name}`);
  //console.group(`${dog.name}`);      
  console.log(`This is a ${dog.name}`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});
// counting
console.count('Wes');
console.count('Wes');
console.count('Wes');

// timing
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
  .then(data => data.json())
  .then(data => {
    console.timeEnd('fetching data')
  })
// table data
console.table(dogs)
```
10 HOLD SHIFT AND CHECK CHECKBOXES

Making interactive 'to do' list with shift-key functionality
```
'use strict';

const allCheckboxes = [...document.querySelectorAll('.inbox input[type="checkbox"]')]

let lastChecked;

const handleCheck = ({ target, shiftKey }) => {
  if (shiftKey && lastChecked) {
    const firstInd = allCheckboxes.indexOf(target);
    const lastInd = allCheckboxes.indexOf(lastChecked);
    const newState = target.checked;
    const subset = [...allCheckboxes.slice(Math.min(firstInd, lastInd) + 1, Math.max(firstInd, lastInd))];
    subset.forEach(checkbox => checkbox.checked = newState)
  }
  lastChecked = target;
}

allCheckboxes.forEach(checkbox => 
    checkbox.addEventListener('click', handleCheck)
)
```