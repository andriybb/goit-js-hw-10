import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();


  const formData = new FormData(event.target);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');


  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

 promise
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#326101',
        timeout: 5000
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#B92828',
        timeout: 5000
      });
    });
});