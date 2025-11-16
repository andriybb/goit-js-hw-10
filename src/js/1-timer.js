import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");


let userSelectedDate = null;
let countdownTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
       iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#B92828'
      });
      startBtn.disabled = true;
      userSelectedDate = null;
    } else {

      startBtn.disabled = false;
      userSelectedDate = selectedDate;
    }
    console.log(selectedDates[0]);
  },
};
flatpickr(dateTimePicker, options);

startBtn.disabled = true;


startBtn.addEventListener("click", () => {
  if (!userSelectedDate) return;
  

  startBtn.disabled = true;
  

  startCountdown(userSelectedDate);
});


function startCountdown(targetDate) {

  updateTimer(targetDate);
  
  countdownTimer = setInterval(() => {
    const now = new Date();
    const timeLeft = targetDate - now;
    

    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      

      dateTimePicker.disabled = false;
      
      iziToast.success({
        title: 'Complete',
        message: 'Countdown finished!',
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#326101'
      });
      
      return;
    }
    updateTimer(targetDate);
  }, 1000);
}


function updateTimer(targetDate) {
  const now = new Date();
  const timeLeft = targetDate - now;
  const time = convertMs(timeLeft);
  updateTimerDisplay(time);
}

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
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}


function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
