// There are two buttons, one to trigger the edit option
// and a second to actually submit the edit

// https://stackoverflow.com/a/4238971
function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined"
          && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
  }
}



const editCommentHandler = async (event) => {
    event.preventDefault();

    const commentId = event.target.getAttribute('data-commentid');
    const commentContentEl = document.querySelector(`#card-text-${commentId}`);
    const commentContent = commentContentEl.innerText;

    commentContentEl.setAttribute('contenteditable', 'true');
    placeCaretAtEnd(commentContentEl)

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

  // document.querySelectorAll('.edit-button').forEach((button) => {
  //   button.addEventListener('click', editCommentHandler);
  // });


  



  
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


// const editButton = document.querySelector('[data-commentId]');
// editButton.addEventListener('click', editCommentHandler);

document.addEventListener('DOMContentLoaded', () => {

document.querySelector('#comments-section').addEventListener("click", function(e){
  const target = e.target;
  if (target.matches("button[data-commentId]")){
    // target.addEventListener('click', editCommentHandler);
    editCommentHandler(e); // Call the editCommentHandler function
  }
})

});