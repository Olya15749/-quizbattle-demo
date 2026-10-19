const questions = [
  { q: "Какой у меня цвет глаз?", answers: ["карие", "серые", "голубые", "зелёные"], correct: 1 },
  { q: "Сколько лет я живу в Португалии?", answers: ["4 года", "6 месяцев", "1 год", "всю жизнь"], correct: 0 },
  { q: "Мой любимый футболист?", answers: ["Роналдо", "Холанд", "Мбаппе", "Месси"], correct: 2 },
  { q: "Какой мой любимый цвет?", answers: ["белый", "изумрудный", "фиолетовый", "синий"], correct: 1 },
  { q: "Сколько мне лет?", answers: ["11", "15", "9", "13"], correct: 0 }
];

const А = "А";
let current = 0, score = 0, answered = false;
const $ = id => document.getElementById(id);
const welcome = $("welcome"), quiz = $("quiz"), result = $("result");

$("startBtn").addEventListener("click", startQuiz);
$("restartBtn").addEventListener("click", startQuiz);
$("nextBtn").addEventListener("click", nextQuestion);

function startQuiz() {
  current = 0; score = 0; answered = false;
  $("score").textContent = score;
  welcome.hidden = true; result.hidden = true; quiz.hidden = false;
  showQuestion();
}
function showQuestion() {
  answered = false;
  const item = questions[current];
  $("questionCount").textContent = `Вопрос ${current + 1} из ${questions.length}`;
  $("progressFill").style.width = `${(current / questions.length) * 100}%`;
  $("questionText").textContent = item.q;
  $("answers").innerHTML = "";
  $("feedback").className = "feedback";
  $("feedback").textContent = "";
  $("nextBtn").hidden = true;
  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = `answer a${index}`;
    button.innerHTML = `<span class="letter">${String.fromCharCode(А.charCodeAt(0) + index)}</span><span></span>`;
    button.lastElementChild.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index, button));
    $("answers").appendChild(button);
  });
}
function chooseAnswer(index, button) {
  if (answered) return;
  answered = true;
  const item = questions[current];
  const buttons = [...$("answers").querySelectorAll("button")];
  buttons.forEach(b => b.disabled = true);
  buttons[item.correct].classList.add("correct");
  buttons.forEach((b, i) => { if (i !== item.correct) b.classList.add("fade"); });
  if (index === item.correct) {
    score++;
    $("score").textContent = score;
    $("feedback").textContent = ["Супер! Ты угадал(а)! 🎉", "Правильно! Отлично знаешь меня! 🌟", "Точно в цель! 🎯"][Math.floor(Math.random() * 3)];
    $("feedback").style.background = "rgba(67, 217, 163, .16)";
  } else {
    button.classList.add("wrong");
    $("feedback").textContent = "Не совсем! Правильный ответ подсвечен зелёным 💚";
    $("feedback").style.background = "rgba(255, 143, 184, .14)";
  }
  $("feedback").classList.add("show");
  $("progressFill").style.width = `${((current + 1) / questions.length) * 100}%`;
  $("nextBtn").textContent = current === questions.length - 1 ? "Узнать результат 🏆" : "Следующий вопрос →";
  $("nextBtn").hidden = false;
}
function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else showResult();
}
function showResult() {
  quiz.hidden = true; result.hidden = false;
  $("finalScore").textContent = `${score} из ${questions.length}`;
  let emoji, copy;
  if (score === 5) {
    emoji = "👑"; copy = "ВАУ! Ты знаешь меня на все 100%! Настоящий эксперт по мне! 💖";
  } else if (score >= 3) {
    emoji = "🌟"; copy = "Очень даже хорошо! Ты многое обо мне знаешь — почти профи! 😎";
  } else if (score >= 1) {
    emoji = "😄"; copy = "Неплохо для начала! Теперь ты знаешь обо мне чуточку больше. Попробуй ещё раз!";
  } else {
    emoji = "🤭"; copy = "Ой-ой! Похоже, нам нужно больше общаться. Давай попробуем ещё раз!";
  }
  $("resultEmoji").textContent = emoji;
  $("resultCopy").textContent = copy;
}
