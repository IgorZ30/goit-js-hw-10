import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
const dateInp = document.querySelector("#datetime-picker")
const btn = document.querySelector("[data-start]")
const dayElem = document.querySelector("[data-days]")
const hourElem = document.querySelector("[data-hours]")
const minuteElem = document.querySelector("[data-minutes]")
const secElem = document.querySelector("[data-seconds]")
 
let pickDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const nowDate = new Date();
  pickDate = selectedDates[0];
  if (!pickDate) {
    btn.disabled = true;
    return;
  }
  if (pickDate <= nowDate) {
    iziToast.show({
      message: "Please choose a date in the future",
      position: "topRight",
      timeout: 2000,
      color: 'red'
    });
    btn.disabled = true;
    return;
  }
  btn.disabled = false;
  console.log("Выбранная дата:", pickDate);
},
};

flatpickr(dateInp, options)

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

function addLeadingZero(value) {
    return String(value).padStart(2, "0")
    
}

btn.addEventListener("click", handleckick)

function handleckick(e) {
btn.disabled = true;
dateInp.disabled = true;

  const intervalId = setInterval(() => {

  const nowDate = new Date();
  let timeMs = pickDate - nowDate;
    let timeLeft = convertMs(timeMs) 
    
    updateDisp(timeLeft)
    
  if (timeMs <= 0) {
  dateInp.disabled = false;
    clearInterval(intervalId)
    updateDisp({days:0, hours:0, minutes: 0, seconds: 0 });
  return
  }
  }, 1000)
}

function updateDisp(timeLeft) {
  dayElem.textContent = addLeadingZero(timeLeft.days)
  hourElem.textContent = addLeadingZero(timeLeft.hours)
  minuteElem.textContent = addLeadingZero(timeLeft.minutes)
  secElem.textContent = addLeadingZero(timeLeft.seconds)
}
