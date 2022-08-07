{
  class Group {
    constructor(id, students) {
      this.id = id;
      this.students = students;
    }
  }

  class Lesson {
    constructor(id, group, topic, list) {
      this.id = id;
      this.group = group;
      this.topic = topic;
      this.list = list;
    }
  }

  let gr1 = [
    "Косарев Дмитрий",
    "Селиванова Кристина",
    "Маркова Наталья",
    "Рябинин Константин",
  ];
  let gr2 = [
    "Державина Инна",
    "Болдакова Наталья",
    "Миронов Олег",
    "Митяев Дмитрий",
  ];
  let gr3 = [
    "Корытов Николай",
    "Шумская Валентина",
    "Ошкина Зинаида",
    "Фридберг Тимофей",
  ];

  let group1 = new Group("2001", gr1);
  let group2 = new Group("2002", gr2);
  let group3 = new Group("2003", gr3);
  let groups = new Array();
  groups.push(group1);
  groups.push(group2);
  groups.push(group3);

  let lessons = new Array();

  for (let i = 0; i < groups.length; i++) {
    let optionGroups = document.createElement("option");
    optionGroups.innerHTML = groups[i].id;
    document.getElementById("groupSelect").appendChild(optionGroups);
    let optionLessons = document.createElement("option");
    optionLessons.innerHTML = i + 1;
    document.getElementById("lessonSelect").appendChild(optionLessons);
  }

  function setTopic() {
    let setTopic = document.createElement("div");
    let labelTopic = document.createElement("label");
    labelTopic.setAttribute("for", "topic");
    labelTopic.innerHTML = "Тема:";
    labelTopic.style.margin = "5px";
    let topic = document.createElement("input");
    topic.setAttribute("type", "text");
    topic.setAttribute("name", "topic");
    topic.setAttribute("id", "topic");
    topic.style.width = "334px";
    topic.style.margin = "5px";
    setTopic.appendChild(labelTopic);
    setTopic.appendChild(topic);
    return setTopic;
  }

  function setTable(groupId) {
    let table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].id == groupId) {
        for (let j = 0; j < groups[i].students.length + 1; j++) {
          let row = document.createElement("tr");
          let cellStud = document.createElement("td");
          let cellCheck = document.createElement("td");
          if (j == 0) {
            cellStud.innerHTML = "Имя";
            cellCheck.innerHTML = "Посещаемость";
          } else {
            cellStud.innerHTML = groups[i].students[j - 1];
            let input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("class", "checkbox");
            cellCheck.appendChild(input);
          }
          row.appendChild(cellStud);
          row.appendChild(cellCheck);
          table.appendChild(row);
        }
      }
    }
    return table;
  }

  function setLesson() {
    let lessonId = document.getElementById("lessonSelect").value;
    let groupId = document.getElementById("groupSelect").value;

    let div = document.createElement("div");
    div.setAttribute("id", "setLesson");
    div.appendChild(setTopic());
    div.appendChild(setTable(groupId));
    let button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Save");
    button.setAttribute("class", "button");
    button.setAttribute(
      "onclick",
      "addLesson(" + lessonId + ", " + groupId + ")"
    );
    div.appendChild(button);

    document.getElementById("container").appendChild(div);
  }

  function addLesson(lessonId, groupId) {
    let topic = document.getElementById("topic").value;
    let arrayOfCB = document.getElementsByClassName("checkbox");
    let arrayOfPresence = new Array();
    for (let i = 0; i < arrayOfCB.length; i++)
      arrayOfPresence.push(arrayOfCB[i].checked);
    let lesson = new Lesson(lessonId, groupId, topic, arrayOfPresence);
    if (lessons.length < 3) {
      lessons.push(lesson);
      if (document.getElementById("lessonsInfo").hidden) {
        document.getElementById("lessonsInfo").hidden = false;
      }
      let option = document.createElement("option");
      option.innerHTML = lessonId;
      document.getElementById("lessonDone").appendChild(option);
    }

    document.getElementById("setLesson").remove();
  }

  function showInfo() {
    if (document.getElementById("infoDiv") != null)
      document.getElementById("infoDiv").remove();
    let lessonId = document.getElementById("lessonDone").value;
    let infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "container");
    infoDiv.setAttribute("id", "infoDiv");
    let index;
    for (let i = 0; i < lessons.length; i++)
      if (lessons[i].id == lessonId) index = i;
    for (let i = 0; i < groups.length; i++)
      if (groups[i].id == lessons[index].group) index = i;
    let lessonTopic = document.createElement("p");
    lessonTopic.innerHTML = "Тема урока: " + lessons[index].topic + ".";
    infoDiv.appendChild(lessonTopic);

    let table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    for (let j = 0; j < groups[index].students.length + 1; j++) {
      let row = document.createElement("tr");
      let cellStud = document.createElement("td");
      let cellCheck = document.createElement("td");
      if (j == 0) {
        cellStud.innerHTML = "Имя";
        cellCheck.innerHTML = "Присутствовал";
      } else {
        cellStud.innerHTML = groups[index].students[j - 1];
        if (lessons[index].list[j - 1] == true) cellCheck.innerHTML = "YES";
        else cellCheck.innerHTML = "X";
      }
      row.appendChild(cellStud);
      row.appendChild(cellCheck);
      table.appendChild(row);
    }
    infoDiv.appendChild(table);

    document.body.appendChild(infoDiv);
  }
}
