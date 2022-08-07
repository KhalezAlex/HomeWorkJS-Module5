{
  function addPost() {
    var post = document.createElement("div");
    post.setAttribute("class", "post");
    post.appendChild(postHeader());
    post.appendChild(postMessage());
    document.getElementById("board").appendChild(post);
  }

  function postHeader() {
    var postName = document.createElement("span");
    postName.innerHTML = document.getElementById("inputName").value;
    var postDate = document.createElement("span");
    postDate.innerHTML = getDate();
    var postHeader = document.createElement("div");
    postHeader.setAttribute("class", "postHeader");
    postHeader.appendChild(postName);
    postHeader.appendChild(postDate);
    return postHeader;
  }

  function postMessage() {
    var postMessage = document.createElement("p");
    postMessage.innerHTML = document.getElementById("textAreaMessage").value;
    var postText = document.createElement("div");
    postText.setAttribute("class", "postText");
    postText.appendChild(postMessage);
    return postText;
  }

  function getDate() {
    var date = new Date();
    date =
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      " " +
      date.getDate() +
      "." +
      date.getMonth() +
      "." +
      date.getFullYear();
    return date;
  }
}
