import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const StartBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysUI = document.querySelector('[data-days]');
const hoursUI = document.querySelector('[data-hours]');
const minutesUI = document.querySelector('[data-minutes]');
const secondsUI = document.querySelector('[data-seconds]');
let userSelectedDate;
let timeSpan;
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1, // start week on Monday
  },
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0];
      StartBtn.disabled = false;
    } else {
      StartBtn.disabled = true;
      iziToast.show({
        title: 'Error',
        titleColor: '#FFFFFF',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: 'Please choose a date in the future',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        messageSize: '16px',
        messageLineHeight: '1.5',
        close: true,
        theme: 'light',
        progressBar: true,
        progressBarColor: '#B51B1B',
        position: 'topRight',
        iconUrl: './img/close-octagon.svg',
      });
    }
  },
});
StartBtn.addEventListener('click', evt => {
  input.disabled = true;
  StartBtn.disabled = true;
  const intervalId = setInterval(() => {
    timeSpan = userSelectedDate - Date.now();
    if (timeSpan >= 0) {
      setValues(convertMs(timeSpan));
    } else {
      clearInterval(intervalId);
      input.disabled = false;
      StartBtn.disabled = false;
    }
  }, 1000);
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function setValues({ days, hours, minutes, seconds }) {
  daysUI.innerHTML = String(days).padStart(2, '0');
  hoursUI.innerHTML = String(hours).padStart(2, '0');
  minutesUI.innerHTML = String(minutes).padStart(2, '0');
  secondsUI.innerHTML = String(seconds).padStart(2, '0');
}
