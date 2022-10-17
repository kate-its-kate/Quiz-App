// quiz data

const quizData = [
  {
    question: "What is the smallest planet in our solar system?",
    answers: ["Venus", "Jupiter", "Mercury", "Earth"],
    correct: 3,
  },
  {
    question: "Name the Coffee shop in US sitcom Friends:",
    answers: ["Friends", "Central Perk", "Coffee with Friends", "Central Park"],
    correct: 4,
  },
  {
    question: "What is the capital of New Zealand?",
    answers: ["Rotorua", "Auckland", "Queenstown", "Wellington"],
    correct: 4,
  },
  {
    question:
      "What was the old name for a Snickers bar before it changed in 1990?",
    answers: ["Marathon bars", "Mars bars", "Speed bars", "Run bars"],
    correct: 1,
  },
  {
    question: "What is the currency of Denmark?",
    answers: ["Euro", "Dollar", "Pound", "Krone"],
    correct: 4,
  },
  {
    question: "What band was Harry Styles in before his solo career?",
    answers: ["One Direction", "White Eskimo", "The boys", "None"],
    correct: 1,
  },
  {
    question: "How many permanent teeth does a dog have?",
    answers: ["42", "34", "32", "27"],
    correct: 1,
  },
  {
    question: "Which color pill does Neo swallow in The Matrix?",
    answers: ["Green", "Blue", "Red", "White"],
    correct: 3,
  },
  {
    question:
      "What does Bridget Jones name her baby in the film series’s third instalment?",
    answers: ["William", "Ben", "Richard", "Robert"],
    correct: 1,
  },
  {
    question: "Gouda is a popular cheese originating from which country?",
    answers: ["Hungary", "Austria", "France", "Netherlands"],
    correct: 4,
  },
];

// question vars

const questionEl = document.querySelector("#question");
const questionList = document.querySelector("#list");
const submitBtn = document.querySelector(".quiz__btn");

// answers vars

const answers = document.querySelectorAll(".quiz-question__answer");

// game vars

let score = 0;
let questionIndex = 0;

clearPage();
shopQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  questionEl.innerHTML = "";
  questionList.innerHTML = "";
}

function shopQuestion() {
  submitBtn.innerHTML = `Submit`;

  // question text

  const questionTemplate = `<p class="quiz-question__text" id="question">%question text%</p>`;
  const questionTitle = questionTemplate.replace(
    "%question text%",
    quizData[questionIndex]["question"]
  );

  questionEl.innerHTML = questionTitle;

  // answers

  let answerNumber = 1;

  for (item of quizData[questionIndex]["answers"]) {
    const answerTemplate = `
    <li class="quiz-question__item">
      <label>
          <input class="quiz-question__answer" type="radio" value="${answerNumber}" name="answer">
          <span class="quiz-question__answer__text">%answer%</span>
      </label>
    </li>
  `;
    const answerText = answerTemplate.replace("%answer%", item);
    questionList.innerHTML += answerText;

    answerNumber++;
  }
}

function checkAnswer() {
  const checkedAnswer = questionList.querySelector(
    ".quiz-question__answer:checked"
  );

  if (!checkedAnswer) {
    submitBtn.blur();
    return;
  }

  const userAnswer = parseInt(checkedAnswer.value);

  if (quizData[questionIndex]["correct"] === userAnswer) score++;

  if (questionIndex !== quizData.length - 1) {
    questionIndex++;
    clearPage();
    shopQuestion();
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {
  const scoreMessage = document.querySelector(".quiz__score");
  const goodScore = `High five!🔥 You've got ${score} out of 10 !`;
  const badScore = `Not bad!🌞 You've got ${score} out of 10 !`;
  const noScore = `You've got ${score} out of 10. Better luck next time.`;

  if (score > 5) {
    scoreMessage.innerHTML = goodScore;
  } else if (score > 0 && score < 5) {
    scoreMessage.innerHTML = badScore;
  } else {
    scoreMessage.innerHTML = noScore;
  }
  submitBtn.blur();
  submitBtn.innerHTML = `Try again`;
  submitBtn.onclick = () => history.go();
}
