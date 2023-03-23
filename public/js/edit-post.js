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
  
  
  
  const editPostHandler = async (event) => {
      event.preventDefault();
  
      const postId = event.target.getAttribute("data-postid");
      const postContentEl = document.querySelector(`#post-content`);
      const postContent = postContentEl.innerText;
  
      postContentEl.setAttribute('contenteditable', 'true');
      placeCaretAtEnd(postContentEl)
  
      const editButtonParent = event.target.parentNode;

      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.addEventListener('click', async () => {
        const newPostContent = postContentEl.innerText;
  
        // const formData = new FormData();
        // formData.append('comment_content',newPostContent)
  
        const response = await fetch(`/post/${postId}/edit-post`, {
          method: 'PUT',
          body: JSON.stringify({
            comment_content: newPostContent,
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
        postContentEl.innerText = postContent;
        postContentEl.removeAttribute('contenteditable');
        editButtonParent.removeChild(saveButton);
        editButtonParent.removeChild(cancelButton);
      });
  
      event.target.parentNode.insertBefore(saveButton, event.target);
      event.target.parentNode.insertBefore(cancelButton, event.target);
    };
  
    // document.querySelectorAll('.edit-button').forEach((button) => {
    //   button.addEventListener('click', editPostHandler);
    // });
  
  
    
  
  
  
    
  // document.addEventListener('click', (e) => {
  //   if (e.target && e.target.matches('[data-postId]')) {
  //     const postId = e.target.getAttribute('data-postId');
  //     // Make API call with postId
  //     fetch(`/comment/${postId}/edit-comment`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Handle response data
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // });
  
  
  // const editButton = document.querySelector('[data-postId]');
  // editButton.addEventListener('click', editPostHandler);
  
  document.addEventListener('DOMContentLoaded', () => {
  
  document.querySelector('button[data-postid]').addEventListener("click", function(e){

      editPostHandler(e); // Call the editPostHandler function

  })
  
  });