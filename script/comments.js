// https://node-hnapi.herokuapp.com/item/37788454

let detailsList = []
let commentsData = []
  // Display the top-level comments
  const commentsContainer = document.querySelector('.comment-items');
async function fetchComments() {
    const id = localStorage.getItem("id")
    const url = `https://node-hnapi.herokuapp.com/item/${id}`
    const response = await fetch(url)
    const detail = await response.json()
    
    detailsList.push(detail)
    commentsData = detailsList
    console.log(commentsData[0])
    displayDetails()
    //displayComments(commentsData[0], commentsContainer);
}

function displayDetails() {
    const commentItems = document.querySelector(".comment-items")
    const detail = document.querySelector(".story-detail")
    const title = document.createElement("h2")
    const publishedBy = document.createElement("p")
    title.textContent = `${detailsList[0].title}`
    publishedBy.textContent = `Published by ${detailsList[0].user} ${detailsList[0].time_ago}`
    detail.appendChild(publishedBy)
    detail.appendChild(title)

    displayComments(commentsData[0], commentsContainer);
}

function createCommentElement(commentData) {
    const commentElement = document.createElement('li');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `<p>${commentData.content}</p>`;
  
    if (commentData.comments && commentData.comments.length > 0) {
      const nestedCommentsContainer = document.createElement('ul');
      nestedCommentsContainer.classList.add('comment-list');
      commentData.comments.forEach(nestedCommentData => {
        const user = document.createElement('p');
        user.textContent = `${nestedCommentData.user} ${nestedCommentData.time_ago}`
        const nestedCommentElement = createCommentElement(nestedCommentData);
        nestedCommentsContainer.appendChild(user);
        nestedCommentsContainer.appendChild(nestedCommentElement);
      });
      
      commentElement.appendChild(nestedCommentsContainer);
    }
  
    return commentElement;
  }
  
  function displayComments(data, container) {
    data.comments.forEach(commentData => {
      const user = document.createElement('p');
      user.textContent = `${commentData.user}`
      const commentElement = createCommentElement(commentData);
      container.appendChild(user);
      container.appendChild(commentElement);
  
      // recursion
      if (commentData.comments && commentData.comments.length > 0) {
        const nestedCommentsContainer = commentElement.querySelector('ul');
        displayComments(commentData, nestedCommentsContainer);
      }
    });
  }

fetchComments()