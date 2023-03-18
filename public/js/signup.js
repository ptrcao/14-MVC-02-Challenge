const form = document.querySelector('#signup-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirm_password').value;

  if (password !== confirmPassword) {
    const errorContainer = document.querySelector('#error-container');
    errorContainer.innerHTML = 'Passwords do not match';
    return;
  }

  fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, confirm_password: confirmPassword }),
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
      if (data.message === 'Email is already registered') {
        errorContainer.innerHTML = 'Email is already registered';
      } else {
        errorContainer.innerHTML = data.message;
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
