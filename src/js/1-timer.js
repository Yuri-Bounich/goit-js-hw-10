// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Оголошення змінних
let userSelectedDate = null;
const startButton = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

// Оцінка кнопки як неактивної спочатку
startButton.disabled = true;

// Налаштування flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    
    if (!userSelectedDate || userSelectedDate <= new Date()) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight'
          });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  }
};

flatpickr(datetimePicker, options);

// Функція для запуску зворотного відліку
function startCountdown() {
  const intervalId = setInterval(() => {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;

    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({
        title: 'Done',
        message: 'Countdown finished!',
        position: 'topRight'
      });
      startButton.disabled = true;
      datetimePicker.disabled = false; // Вмикаємо дату
    } else {
      updateTimerDisplay(convertMs(timeRemaining));
    }
  }, 1000);

  startButton.disabled = true;
  datetimePicker.disabled = true; // Вимикаємо дату
}

// Функція для оновлення таймера
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

// Функція для додавання нуля в початок числа
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для перетворення мілісекунд в об'єкт часу
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Обробник подій для кнопки Start
startButton.addEventListener('click', startCountdown);