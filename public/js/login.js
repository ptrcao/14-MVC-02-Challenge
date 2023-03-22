const form = document.querySelector('#login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // const email = document.querySelector('#email').value;
  // const password = document.querySelector('#password').value;

  const formData = new FormData(form);

  fetch('/login', {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    body: formData,
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = '/';
      } else {
        return res.json();
      }
    })
    .then((data) => {
      const errorContainer = document.querySelector('#error-container');
      errorContainer.innerHTML = data.message;
    })
    .catch((err) => {
      console.error(err);
    });
});