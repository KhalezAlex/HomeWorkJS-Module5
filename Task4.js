{
  let book0 = [
    "Books/CPP.png",
    "Язык программирования С++.",
    "Стивен Прата",
    22,
  ];
  let book1 = [
    "Books/HeadFirstAndroid.png",
    "Head first. Программирование для Android.",
    "Дэвид Гриффитс",
    42,
  ];
  let book2 = [
    "Books/JS.png",
    "JavaScript. Полное руководство.",
    "Дэвид Флэнаган",
    30,
  ];
  let book3 = ["Программирование на Python.", "Марк Лутс", 52];
  let book4 = [
    "Scala, профессиональное программирование.",
    "Мартин Одерски",
    82,
  ];
  let book5 = ["Изучаем Java.", "Берт Бэйтс", 67];

  let books = new Array();
  books.push(book0);
  books.push(book1);
  books.push(book2);

  function setItem(index) {
    let item = document.createElement("div");
    item.setAttribute("class", "item");

    let image = new Image();
    image.setAttribute("src", books[index][0]);
    item.appendChild(image);

    let bookName = document.createElement("p");
    bookName.setAttribute("class", "bookName");
    bookName.innerHTML = books[index][1];
    item.appendChild(bookName);

    let author = document.createElement("p");
    author.setAttribute("class", "author");
    author.innerHTML = books[index][2];
    item.appendChild(author);

    let price = document.createElement("p");
    price.setAttribute("class", "price");
    price.innerHTML = books[index][3] + "$";
    item.appendChild(price);

    let button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("id", "button" + index);
    button.setAttribute("class", "button");
    button.setAttribute("value", "Select");
    button.setAttribute("onclick", "addItem(" + index + ")");
    item.appendChild(button);

    return item;
  }

  function setShowcase() {
    for (let i = 0; i < books.length; i++)
      document.getElementById("showcase").appendChild(setItem(i));
  }

  function addItem(index) {
    document.getElementById("bookName").setAttribute("value", books[index][1]);
  }
  setShowcase();

  var modal = document.getElementById("message");
  var btn = document.getElementById("buyButton");
  var span = document.getElementById("close");

  btn.onclick = function () {
    document.getElementById("hello").innerHTML =
      document.getElementById("customer").value + ", спасибо за заказ!";
    document.getElementById("orderDetails").innerHTML =
      "Книга " +
      '"' +
      document.getElementById("bookName").value +
      '" будет доставлена ' +
      document.getElementById("delDate").value +
      " по адресу: " +
      document.getElementById("delAdress").value;
    if (document.getElementById("orderComment").value != "")
      document.getElementById("comment").innerHTML =
        "Комментарий к заказу: " +
        document.getElementById("orderComment").value;
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };
}
