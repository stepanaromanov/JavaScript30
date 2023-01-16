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