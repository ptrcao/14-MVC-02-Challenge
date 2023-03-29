// Get the Delete button element
const deleteButton = document.querySelector('button[data-postid].del-button');

// Add a click event listener to the Delete button
deleteButton.addEventListener('click', async (event) => {
  const postId = event.target.getAttribute('data-postid');

  try {
    const response = await fetch(`/posts/${postId}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      // Reload the page to update the UI
      window.location.reload();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (err) {
    console.error(err);
    // Handle the error
  }
});
