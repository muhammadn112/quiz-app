const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextBtn");
const backButton = document.getElementById("backBtn");
const startOverButton = document.getElementById("startOverBtn");
const resultElement = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;
let timer;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  startOverButton.style.display = "none";

  let timeLeft = 30; 
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer); 
      checkAnswer(); 
    } else {
      resultElement.textContent = "Time Remaining: " + timeLeft + " seconds";
      timeLeft--;
    }
  }, 1000); 

  currentQuestion.options.forEach((option, index) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = option;
    input.addEventListener("click", () => checkAnswer(option));
    label.textContent = option;
    label.appendChild(input);
    optionsElement.appendChild(label);
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    score++;
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent =
      "Incorrect. The correct answer is: " + currentQuestion.answer;
  }
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    resultElement.textContent = "";
  } else {
    showScore();
  }
}
function prevQuestion() {
  0;
  currentQuestionIndex--;
  if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
    showQuestion();
    resultElement.textContent = "";
  } else {
    showScore();
  }
}

function showScore() {
  questionElement.textContent = "";
  optionsElement.innerHTML = "";
  nextButton.style.display = "none";
  backButton.style.display = "none";
  startOverButton.style.display = "inline";

  clearInterval(timer);

  startOverButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    resultElement.textContent = "";
    nextButton.style.display = "inline";
    backButton.style.display = "inline";
  });

  resultElement.textContent =
    "Your score: " + score + " out of " + questions.length;
}

showQuestion();
nextButton.addEventListener("click", nextQuestion);
backButton.addEventListener("click", prevQuestion);
