const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
//   const title = formData.get('title');
//   const content = formData.get('content');

const json = convertFD2JSON(formData);

  try {
    const response = await fetch('/new-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json,
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const post = await response.json();
    window.location.href = `/post/${post.id}`;
  } catch (error) {
    console.error(error);
  }
});
