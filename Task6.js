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

  function getSeats(number) {
    let seats = new Array();
    for (let i = 0; i < 4; i++) {
      let cell = document.createElement("td");
      cell.setAttribute("class", "cell");

      let div = document.createElement("div");
      let cb = document.createElement("input");
      cb.setAttribute("type", "checkbox");
      cb.setAttribute("id", "seat" + (i + number));
      cb.setAttribute("name", "checkbox");
      if (Math.random() > 0.75) cb.setAttribute("disabled", "true");
      div.appendChild(cb);
      let label = document.createElement("label");
      label.setAttribute("for", "checkbox");
      label.innerHTML = i + number;
      div.appendChild(label);
      cell.appendChild(div);
      seats.push(cell);
    }
    return seats;
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
    carriage.setAttribute("class", "coupe");
    let row = document.createElement("tr");
    for (let i = 1; i < 28; i += 4) {
      let cell = document.createElement("td");
      cell.appendChild(getCoupe(i));
      row.appendChild(cell);
    }
    carriage.appendChild(row);
    return carriage;
  }
  var routeOrder;
  var dateOrder;

  function showCarriage() {
    routeOrder = document.getElementById("route").value;
    dateOrder = document.getElementById("date").value;
    document.body.appendChild(getCarriage());
    let button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Сделать заказ");
    button.setAttribute("onclick", "order()");
    button.setAttribute("name", "orderButton");
    button.setAttribute("id", "orderButton");
    document.body.appendChild(button);
  }

  var modal = document.getElementById("message");
  var btn = document.getElementById("orderButton");
  var btnColseOrder = document.getElementById("close");

  function order() {
    let seatsBooked = 0;
    let seatsChecked = document.getElementsByTagName("input");
    let seats = new Array();
    for (let i = 0; i < seatsChecked.length; i++) {
      if (seatsChecked[i].checked) {
        seatsBooked++;
        seats.push(seatsChecked[i]);
      }
    }
    let totalPrice = seatsBooked * routeOrder[1];
    for (let i = 0; i < route.length; i++) {
      if (route[i][0] == routeOrder) {
        totalPrice = seatsBooked * route[i][1];
      }
    }
    let table = document.createElement("table");
    table.setAttribute("class", "coupe");
    for (let i = 0; i < seats.length + 1; i++) {
      if (i == 0) {
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
      } else {
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        cell1.innerHTML = routeOrder;
        cell1.setAttribute("class", "cell");
        let cell2 = document.createElement("td");
        cell2.innerHTML = dateOrder;
        cell2.setAttribute("class", "cell");

        let cell3 = document.createElement("td");
        cell3.innerHTML = seats[i - 1].id.substring(4);
        cell3.setAttribute("class", "cell");
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        table.appendChild(row);
      }
    }
    document.getElementById("message").appendChild(table);
    modal.style.display = "block";
  }
}
