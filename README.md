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
11 CUSTOM VIDEO PLAYER

Making video player with following functionality: playback, pausing and playing the video, updating play button icon, fragment skipping, progress bar
```
'use strict'

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');

const togglePlay = () => {
  video.paused ? video.play() : video.pause();
}

const updateButton = () => {
  toggle.textContent = video.paused ? '►' : '❚❚';
}

const skip = ({ target: { dataset: { skip } } }) => {
  video.currentTime += parseFloat(skip)
}

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

const scrub = (event) => {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => {
  mousedown && scrub(event)
});
progress.addEventListener('mousedown', () => {
  mousedown = true
});
progress.addEventListener('mouseup', () => {
  mousedown = false
});
```
12 KEY SEQUENCE DETECTION

Checking the sequence of pressed keys. If it meets preset word, message is popping up on the page
```
'use strict'

const pressedArr = [];
const neededCode = 'text';

window.addEventListener('keyup', (event) => {
  if (pressedArr.length === neededCode.length) {
    pressedArr.shift()
  } 
  pressedArr.push(event.key);
  
  if (pressedArr.join('').includes(neededCode)) {
    cornify_add();
  }
})
```
13 SLIDE IN ON SCROLL

Adding slide image animation during scrolling.
```
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');
const checkSlide = () => {
  sliderImages.forEach((sliderImage) => {
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolled = window.scrollY < imageBottom;
    isNotScrolled && isHalfShown ? sliderImage.classList.add('active') :sliderImage.classList.remove('active');
  });
}

window.addEventListener('scroll', debounce(checkSlide));
``` 
14 JAVASCRIPT REFERENCES VS COPYING

Learning how differ various types of variables when referencing to or deep copying them.

```
// start with strings, numbers and booleans
let age = 100;
let age2 = age;
console.log(age, age2);
age = 200;
console.log(age, age2);

let name = 'Wes';
let name2 = name;
console.log(name, name2);
name = 'wesley'
console.log(name, name2);

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
const team = players;

// You might think we can just do something like this:
team[3] = 'Lux';

// however what happens when we update that array?
// now here is the problem!
// oh no - we have edited the original array too!
// Why? It's because that is an array reference, not an array copy. They both point to the same array!
// So, how do we fix this? We take a copy instead!
const team2 = players.slice();

// one way
// or create a new array and concat the old one in
const team3 = [].concat(players);

// or use the new ES6 Spread
const team4 = [...players];
const team5 = Array.from(players);

// now when we update it, the original one isn't changed
// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
  name: 'Wes Bos',
  age: 80
};

// and think we make a copy:
const captain = person;
// captain.age = 99; doesn't work

// how do we take a copy instead?
const cap2 = Object.assign({}, person, { number: 99, age: 12});

// We will hopefully soon see the object ...spread
const cap3 = {...person};

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const wes = {
  name: 'wes',
  age: 100,
  social: {
    twitter: '@name',
    facebook: 'name.surname'
  }
}

const dev = Object.assign({}, wes);
const dev2 = JSON.parse(JSON.stringify(wes));
```
15 LOCAL STORAGE 

Operating with local storage: adding and removing items from list. 

```
'use strict'

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const clear = document.querySelector('.clear');
let items = localStorage.getItem('items').length > 0 ? JSON.parse(localStorage.getItem('items')) : [];

const populateList = (plates = [], platesList) => {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

const addItem = (event) => {
  event.preventDefault();
  const text = event.target.querySelector('input[name=item]').value;
  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  event.target.reset();
}

const toggleDone = (event) => {
  if (!event.target.matches('input')) return;

  const elem = event.target;
  const index = elem.dataset.index;

  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

const clearStorage = (event) => {
  items = [];
  addItems.reset();
  localStorage.setItem('items', items);
  populateList(items, itemsList);
}

const checkBoxes = document.querySelectorAll('input');

addItems.addEventListener('submit', addItem);
clear.addEventListener('click', clearStorage);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);
```
16 MOUSE MOVE SHADOW

Adding shadow depending on mouse cursor position

```
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 100; 

const shadow = ({ target, offsetX, offsetY }) => {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = event;
  if (this !== event.target) {
    x += target.offsetLeft;
    y += target.offsetTop;
  }

  const xWalk = (x / width * walk) - (walk / 2);
  const yWalk = (y / height * walk) - (walk / 2);

  text.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
                           ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
                           ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
                           ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
                          `;
}

hero.addEventListener('mousemove', shadow );
```

17 SORT WITHOUT ARTICLES

sorting the array with advanced condition 

```
'use strict';

const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const regex = new RegExp('^(a |the |an )', 'i')

const strip = (bandName) => {
  return bandName.replace(regex, '').trim();
}

const sortedBands = bands.sort((a, b) => {
  return strip(a) > strip(b) ? 1 : -1;
})

document.getElementById('bands')
  .append(...sortedBands.map((band) => {
    const li = document.createElement('li');
    li.innerHTML = band;
    return li;
  })
);
```

18 ADDING UP TIME WITH REDUCE

Using all the time length data we combine it to get total playlist duration

```
'use strict'

const timeNodes = [...document.querySelectorAll('[data-time]')];

const seconds = timeNodes
  .map(node => node.dataset.time)
  .map(timeCode => {
    const [mins, secs] = timeCode.split(':')
                                 .map(parseFloat)
    return (mins * 60) + secs})
  .reduce((total, seconds) => total + seconds)

const hours = Math.floor(seconds / 3600);
const minutes = Math.floor((seconds % 3600) / 60);
const secondsLeft = seconds - (hours * 3600) - (minutes * 60);

console.log(`Total duration is ${hours} hours ${minutes} minutes ${secondsLeft} seconds.`)
```