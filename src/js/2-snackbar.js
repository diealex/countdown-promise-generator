import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
let promiseData = { delay: '', state: '' };
form.addEventListener('submit', evt => {
  evt.preventDefault();
  promiseData.delay = form.elements.delay.value;
  promiseData.state = form.elements.state.value;
  const makePromise = ({ delay, state }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  };
  makePromise(promiseData)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        icon: '',
        position: 'topRight',
        close: false,
        progressBar: false,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        icon: '',
        position: 'topRight',
        close: false,
        progressBar: false,
      });
    });
  form.reset();
});
