# javascript_30
### Vanilla JavaScript

1 DRUM KIT

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

2 JS CSS CLOCK

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
3 CSS VARIABLES

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
#4 ARRAY CARDIO DAY 1

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

#5 FLEX PANEL GALLERY
Add interactivity to block transiotions.
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

#6 TYPE AHEAD
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


