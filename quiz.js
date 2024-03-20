
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextBtn');
const backButton = document.getElementById('backBtn');
const resultElement = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = '';

  currentQuestion.options.forEach((option, index) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = option;
    input.addEventListener('click', () => checkAnswer(option));
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
    resultElement.textContent = "Incorrect. The correct answer is: " + currentQuestion.answer;
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    resultElement.textContent = '';
  } else {
    showScore();
  }
}
function prevQuestion() {
  currentQuestionIndex--;
  if (currentQuestionIndex >=0 && currentQuestionIndex < questions.length) {
    showQuestion();
    resultElement.textContent = '';
  } else {
    showScore();
  }
}

function showScore() {
  questionElement.textContent = '';
  optionsElement.innerHTML = '';
  nextButton.style.display = 'none';
  resultElement.textContent = "Your score: " + score + " out of " + questions.length;
}

showQuestion();
nextButton.addEventListener('click', nextQuestion);
backButton.addEventListener('click', prevQuestion);

