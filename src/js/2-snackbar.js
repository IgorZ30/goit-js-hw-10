// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")

function handleSubmit(e) {
      e.preventDefault();
     const delay = Number(form.elements.delay.value);   
    const state = form.elements.state.value;
    
   const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
   });
    promise
        .then(value => iziToast.success({
    message: `${value}`
        }))
    .catch(error=>iziToast.error({
    message: `${error}`
        }))
}

form.addEventListener("submit",handleSubmit)