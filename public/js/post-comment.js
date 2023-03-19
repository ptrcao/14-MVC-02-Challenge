const commentForm = document.querySelector('#comment-form');
const commentsSection = document.querySelector('#comments-section');

const hiddenPostIdFromForm = document.querySelector('input[name="postId"]').value;


commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const commentFormData = new FormData(commentForm);
//   const commentFormData = new FormData(document.querySelector('#comment-commentForm'));
//   commentFormData.append('postId', postId);

// console.log('commentFormData: ', commentFormData)
// console.log('stringifiedFormData: ', JSON.stringify(commentFormData))
// You cannot console.log a form Object directly, you must use an iterative method.  Source https://www.youtube.com/watch?v=EnWqnyUZ65Y

for (item of commentFormData){
    console.log(item[0],item[1])
}

  // Make POST request to insert new comment
  fetch(`/post/${hiddenPostIdFromForm}/new-comment`, {
    method: 'POST',
    body: commentFormData,
  })
  .then((res) => {
    if (res.ok) {
        window.location.href = `/post/${hiddenPostIdFromForm}/`;
    } else {
        return res.json();
      }
    })
//   .then(data => {
//     // Create new comment element
//     const newComment = document.createElement('div');
//     newComment.classList.add('comment');
//     newComment.innerHTML = `
//       <div class="comment-info">
//         <p class="comment-author">${data.author}</p>
//         <p class="comment-date">${data.date}</p>
//       </div>
//       <p class="comment-text">${data.comment}</p>
//     `;
//     // Add new comment to top of comments section
//     commentsSection.prepend(newComment);
//   })
  .catch(err => console.error(err));
});
