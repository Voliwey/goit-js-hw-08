import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'selectedFilters';
const formEl = document.querySelector('.feedback-form');

initForm();

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(evt) {
    evt.preventDefault();

    const email = formEl.elements.email.value;
    const message = formEl.elements.message.value;

    if (!email || !message) {
        return alert("Пожалуйста, заполните все поля формы.");
    }

    const formData = {
        email,
        message,
    };

    console.log(formData);

    evt.currentTarget.reset();

    localStorage.removeItem(LOCALSTORAGE_KEY);
}


function onFormInput(evt) {
    let permanentFilters = localStorage.getItem(LOCALSTORAGE_KEY);

    permanentFilters = permanentFilters ? JSON.parse(permanentFilters) : {};
    permanentFilters[evt.target.name] = evt.target.value;

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(permanentFilters));
}


function initForm() {
    let permanentFilters = localStorage.getItem(LOCALSTORAGE_KEY);

    if (permanentFilters) {
        permanentFilters = JSON.parse(permanentFilters);

        Object.entries(permanentFilters).forEach(([name, value]) => {
            formEl.elements[name].value = value;
        });
    }
}

