{
  class Ticket {
    constructor(route, date, seat) {
      this.route = route;
      this.date = date;
      this.seat = seat;
    }

    print() {
      console.log(this);
    }
  }

  let route = [
    ["Msk-SPb", 7000],
    ["SPb- Msk", 7000],
    ["Msk-Tver", 4500],
    ["Tver-Msk", 4500],
  ];

  for (let i = 0; i < route.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = route[i][0];
    document.getElementById("route").appendChild(option);
  }

  var routeOrder;
  var dateOrder;
  var modal = document.getElementById("message");
  var btn = document.getElementById("orderButton");
  var btnOrder = document.getElementById("close");
  var price = 0;

  function getSeats(number) {
    let seats = new Array();

    for (let i = 0; i < 4; i++) {
      let cell = document.createElement("td");
      let div = document.createElement("div");
      let cb = document.createElement("input");
      let label = document.createElement("label");

      cell.setAttribute("class", "cell");

      cb.setAttribute("type", "checkbox");
      cb.setAttribute("id", "seat" + (i + number));
      cb.setAttribute("name", "checkbox");

      if (Math.random() > 0.75) cb.setAttribute("disabled", "true");
      else cb.setAttribute("onclick", "setPrice(seat" + (i + number) + ")");

      label.setAttribute("for", "checkbox");
      label.innerHTML = i + number;

      div.appendChild(cb);
      div.appendChild(label);
      cell.appendChild(div);
      seats.push(cell);
    }

    return seats;
  }

  function setPrice(cbId) {
    let index;
    let str = document.getElementById("orderLabel").innerHTML;
    let str1 = str.substring(14);

    for (let i = 0; i < 4; i++) if (route[i][0] == routeOrder) index = i;
    if (document.getElementById(cbId.id).checked)
      str1 = parseInt(str1) + route[index][1];
    else str1 = parseInt(str1) - route[index][1];
    str = str.substring(0, 14) + str1;
    document.getElementById("orderLabel").innerHTML = str;
  }

  function getCoupe(number) {
    let seats = getSeats(number);
    let coupe = document.createElement("table");

    coupe.setAttribute("class", "coupe");
    for (let i = 0; i < 2; i++) {
      let row = document.createElement("tr");
      row.appendChild(seats[i]);
      row.appendChild(seats[i + 2]);
      coupe.appendChild(row);
    }

    return coupe;
  }

  function getCarriage() {
    let carriage = document.createElement("table");
    let row = document.createElement("tr");

    carriage.setAttribute("class", "coupe");
    carriage.setAttribute("id", "carriage");
    for (let i = 1; i < 28; i += 4) {
      let cell = document.createElement("td");

      cell.appendChild(getCoupe(i));
      row.appendChild(cell);
    }
    carriage.appendChild(row);
    carriage.style.marginTop = "10px";

    return carriage;
  }

  function drawCarriage() {
    if (document.getElementById("seats") != null)
      document.getElementById("seats").remove();

    let divSeats = document.createElement("div");
    divSeats.setAttribute("id", "seats");
    divSeats.appendChild(getCarriage());
    divSeats.appendChild(drawOrderBlock());

    document.getElementById("container").appendChild(divSeats);
    routeOrder = document.getElementById("route").value;
    dateOrder = document.getElementById("date").value;
  }

  function drawOrderBlock() {
    let div = document.createElement("div");
    div.style.width = "100%";
    div.style.display = "flex";
    div.style.justifyContent = "right";
    div.style.marginTop = "10px";

    let button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Сделать заказ");
    button.setAttribute("onclick", "order()");
    button.setAttribute("name", "orderButton");
    button.setAttribute("id", "orderButton");

    let label = document.createElement("label");
    label.setAttribute("for", "orderButton");
    label.innerHTML = "Цена билетов: " + price;
    label.style.marginRight = "10px";
    label.setAttribute("id", "orderLabel");

    div.appendChild(label);
    div.appendChild(button);

    return div;
  }

  function order() {
    let seatsChecked = document.getElementsByTagName("input");
    let seats = new Array();

    for (let i = 0; i < seatsChecked.length; i++)
      if (seatsChecked[i].checked) seats.push(seatsChecked[i]);
    drawTableTicketsBooked(seats);
    drawModalCloseButton();
    modal.style.display = "block";
  }

  function drawTableTicketsBooked(seats) {
    let table = document.createElement("table");

    table.setAttribute("class", "coupe");
    table.setAttribute("id", "ticketsBooked");
    for (let i = 0; i < seats.length + 1; i++) {
      if (i == 0) {
        drawTableTicketsBookedHeader(table);
      } else {
        drawTableTicketsBookedData(table, seats, i);
      }
    }
    document.getElementById("modal-content").appendChild(table);
  }

  function drawTableTicketsBookedHeader(table) {
    let row = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.setAttribute("class", "cell");
    cell1.innerHTML = "Направление";

    let cell2 = document.createElement("td");
    cell2.innerHTML = "Дата";
    cell2.setAttribute("class", "cell");

    let cell3 = document.createElement("td");
    cell3.innerHTML = "Места";
    cell3.setAttribute("class", "cell");

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    table.appendChild(row);
  }

  function drawTableTicketsBookedData(table, seats, index) {
    let row = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.innerHTML = routeOrder;
    cell1.setAttribute("class", "cell");

    let cell2 = document.createElement("td");
    cell2.innerHTML = dateOrder;
    cell2.setAttribute("class", "cell");

    let cell3 = document.createElement("td");
    cell3.innerHTML = seats[index - 1].id.substring(4);
    cell3.setAttribute("class", "cell");

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    table.appendChild(row);
  }

  function drawModalCloseButton() {
    let button = document.createElement("input");

    button.setAttribute("type", "button");
    button.setAttribute("value", "ОК");
    button.setAttribute("onclick", "closeModal()");
    button.setAttribute("id", "close");
    button.style.marginTop = "10px";
    document.getElementById("modal-content").appendChild(button);
  }

  function closeModal() {
    document.getElementById("close").remove();
    document.getElementById("ticketsBooked").remove();
    document.getElementById("message").style.display = "none";
    document.getElementById("seats").remove();
  }
}
