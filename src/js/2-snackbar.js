// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Отримання посилання на форму
const form = document.querySelector('.form');

// Додавання обробника подій для події submit
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Скасовуємо стандартну поведінку форми

  // Отримання значень з форми
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // Створення проміса
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  // Обробка проміса
  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});