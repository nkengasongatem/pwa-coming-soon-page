const countdown = document.querySelector('.countdown');

// set the launch date (ms)
const launchDate = new Date('Sep 27, 2018 08:00:00').getTime();

// update every second
const interval = setInterval(() => {
    // get today's date and time (ms)
    const now = new Date().getTime();

    // get time distance from now to launch date in ms
    const distance = launchDate - now;

    // time calculation
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60 ));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    // display the results
    countdown.innerHTML = `
        <div>${days}<span>Days</span></div>
        <div>${hours}<span>Hours</span></div>
        <div>${mins}<span>Minutes</span></div>
        <div>${secs}<span>Seconds</span></div>
    `;

    // if launch date passed
    if(distance < 0) {
        // stop countdown
        clearInterval(interval);
        // style and output text
        countdown.style.color = '#17a2b8';
        countdown.innerHTML = 'Launched!';
    }

}, 1000 );

// add service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch((error) => console.log('Service worker registration failed, error:', error));
}

/*
navigator.serviceWorker.register('/service-worker.js', {
  scope: '/app/'
});
*/