{
  var question0 = ["Столица Австралии", "Канберра", "Сидней", 1];
  var question1 = ["Столица США", "Вашингтон", "Нью-Йорк", 1];
  var question2 = ["Местонахождение города Санкт-Петербург", "СССР", "США", 2];
  var question3 = [
    "Город- цель большинства крестовых походов",
    "Иерусалим",
    "Константинополь",
    1,
  ];
  var question4 = ["Столица Бразилии", "Рио-де-Жанейро", "Бразилиа", 2];
  var question5 = [
    "В этом государстве не течёт река Миссиссиппи",
    "США",
    "Бразилия",
    2,
  ];
  var question6 = [
    "Название этого города переводится, как <<город>>",
    "Агора",
    "Медина",
    2,
  ];
  var questions = new Array();
  questions.push(question0);
  questions.push(question1);
  questions.push(question2);
  questions.push(question3);
  questions.push(question4);
  questions.push(question5);
  questions.push(question6);

  let score = 0;
  let index = 0;

  function start() {
    document.getElementById("buttonStart").remove();
    setQuestion(index);
  }
  function setQuestion(index) {
    let form = document.createElement("form");
    form.setAttribute("class", "quiz");
    form.setAttribute("id", "quiz");
    form.appendChild(writeQuestion(index));
    form.appendChild(drawAnswers(index));
    form.appendChild(drawButton());
    document.body.appendChild(form);
  }
  function writeQuestion(index) {
    let question = document.createElement("span");
    question.setAttribute("class", "question");
    question.innerHTML = index + 1 + ") " + questions[index][0];
    return question;
  }
  function drawAnswers(index) {
    let answers = document.createElement("div");
    answers.setAttribute("class", "answers");
    answers.appendChild(drawAnswerOptions(index, 1));
    answers.appendChild(drawAnswerOptions(index, 2));
    return answers;
  }
  function drawAnswerOptions(indexQuestion, indexOption) {
    let answer = document.createElement("div");
    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "answer");
    radio.setAttribute("id", "answer");
    radio.setAttribute("value", indexOption);
    let label = document.createElement("label");
    label.setAttribute("for", "answer");
    label.innerHTML = questions[indexQuestion][indexOption];
    answer.appendChild(radio);
    answer.appendChild(label);
    return answer;
  }
  function drawButton() {
    let button = document.createElement("input");
    button.setAttribute("type", "button");
    if (index == 6) button.value = "Конец!";
    else button.value = "Следующий вопрос";
    button.setAttribute("onclick", "nextQuestion()");
    return button;
  }
  function nextQuestion() {
    let radio = document.getElementsByName("answer");
    for (let i = 0; i < radio.length; i++) {
      if (radio[questions[index][3] - 1].checked) score++;
    }
    index++;
    document.body.lastChild.remove();
    if (index < questions.length) setQuestion(index);
    else
      alert(
        "Вы ответили на " +
          score / 2 +
          " вопросов и набрали " +
          score +
          " баллов."
      );
  }
}
