// There are two buttons, one to trigger the edit option
// and a second to actually submit the edit




const editCommentHandler = async (event) => {
    event.preventDefault();

    const commentId = event.target.getAttribute('data-commentid');
    const commentContentEl = document.querySelector(`#card-text-${commentId}`);
    const commentContent = commentContentEl.innerText;

    commentContentEl.setAttribute('contenteditable', 'true');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', async () => {
      const newCommentContent = commentContentEl.innerText;

      // const formData = new FormData();
      // formData.append('comment_content',newCommentContent)

      const response = await fetch(`/edit-comment/comment/${commentId}/edit-comment`, {
        method: 'PUT',
        body: JSON.stringify({
          comment_content: newCommentContent,
        }),
        // body: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update comment');
      }
    });

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
      commentContentEl.innerText = commentContent;
      commentContentEl.removeAttribute('contenteditable');
      commentContentEl.parentNode.removeChild(saveButton);
      commentContentEl.parentNode.removeChild(cancelButton);
    });

    event.target.parentNode.insertBefore(saveButton, event.target);
    event.target.parentNode.insertBefore(cancelButton, event.target);
  };

  document.querySelectorAll('.edit-button').forEach((button) => {
    button.addEventListener('click', editCommentHandler);
  });



  
// document.addEventListener('click', (e) => {
//   if (e.target && e.target.matches('[data-commentId]')) {
//     const commentId = e.target.getAttribute('data-commentId');
//     // Make API call with commentId
//     fetch(`/comment/${commentId}/edit-comment`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle response data
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
// });


const editButton = document.querySelector('[data-commentId]');
editButton.addEventListener('click', editCommentHandler);