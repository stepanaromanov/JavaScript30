# javascript_30
### Vanilla JavaScript

###1 DRUM KIT
When user presses key button it should play corresponding audio. Style of the key should be changed also.
After sound play key style returns to initial state.

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


###2 JS CSS CLOCK
Clock elements created in HTML, hands transitions already determined in CSS. It is necessary to write JS code to activate these elements. 

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

###3 CSS Variables
We need to add event listener for all the inputs and make image processing on the page interactive.

'use strict';
const handleUpdate = ({ target: { name, value, dataset: { sizing } } }) => {
  document.documentElement.style.setProperty(`--${name}`, `${value}${sizing || ''}`);
};
document.querySelectorAll('.controls input').forEach((input) => {
            input.addEventListener("change", handleUpdate)
            input.addEventListener("mousemove", handleUpdate)
})
