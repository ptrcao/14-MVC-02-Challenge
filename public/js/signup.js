const form = document.querySelector('#signup-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();



//   const username = document.querySelector('#username').value;
//   const email = document.querySelector('#email').value;
//   const password = document.querySelector('#password').value;
//   const confirmPassword = document.querySelector('#confirm_password').value;

const formData = new FormData(form);
console.log(formData)
  if (formData.get('password') !== formData.get('confirm_password')) {
    const errorContainer = document.querySelector('#error-container');
    errorContainer.innerHTML = 'Passwords do not match';
    return;
  }

let json = await convertFD2JSON(formData)
console.log('json: ', json)
  fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify({ username, email, password, confirm_password: confirmPassword }),
    // headers: {
    // 'Content-Type': 'multipart/form-data',
    // },
    body: json,
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
