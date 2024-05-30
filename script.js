document.addEventListener("DOMContentLoaded", () => {
  fetchData(); // Fetch data and filter questions
});

const fetchData = async () => {
  const response = await fetch("quiz.json");
  const json = await response.json();
  filterTheData(json.results);
};

// Search
document.querySelector(".serach-btn").addEventListener("click", () => {
  const searchBox = document.querySelector(".serach-info-box");
  const searchQuery = searchBox.value.toLowerCase();
  const dtaElem = document.querySelector(".quiz-container");
  const options = dtaElem.querySelectorAll("option");

  let matchFound = false;

  options.forEach((option) => {
    if (option.value.toLowerCase() === searchQuery) {
      dtaElem.value = option.value;
      matchFound = true;
    }
  });

  if (!matchFound) {
    alert("QUIzz ONLY AVAILABLE FOR HTML, CSS, JS, PYTHON, AND JAVA");
  }

  searchBox.value = "";
});

// ---------------------------------------------------------------------------------------



// Checking
const updateStartButtonState = () => {
  const categoryElement = document.querySelector(".quiz-container");
  const difficultyElement = document.querySelector(".mode-of-test");
  const startBtn = document.getElementById("startBtn");
  if (
    categoryElement.value === "Any Category" ||
    difficultyElement.value === "Any Difficulty"
  ) {
    startBtn.disabled = true;
    startBtn.style.opacity = "0.5";
  } else {
    startBtn.disabled = false;
    startBtn.style.opacity = "1";
  }
};
document.querySelector(".quiz-container").addEventListener("click", updateStartButtonState);
document.querySelector(".mode-of-test").addEventListener("change", updateStartButtonState);
updateStartButtonState();

// ---------------------------------------------------------------------------------------------------------



document.querySelector(".submitBtn").addEventListener("click", () => {
  const main = document.querySelector(".one-box");
  main.style.display = "none";

  const guide = document.querySelector(".guide-line-card");
  guide.style.display = "block";

  const body = document.querySelector(".bodyBOX");
  body.style.backgroundColor = "#252B48";
  body.style.color = "white";
});

document.querySelector(".guide-exit").addEventListener("click", () => {
  const guide = document.querySelector(".guide-line-card");
  guide.style.display = "none";

  const main = document.querySelector(".one-box");
  main.style.display = "block";

  const body = document.querySelector(".bodyBOX");
  body.style.backgroundColor = "white";
  body.style.color = "black";
});

document.querySelector(".guide-con").addEventListener("click", () => {
  const guide = document.querySelector(".guide-line-card");
  guide.style.display = "none";

  const submit = document.querySelector(".hidden-box");
  submit.style.display = "block";

  const body = document.querySelector(".bodyBOX");
  body.style.backgroundColor = "white";
  body.style.color = "black";
  fetchData();
});


// ------------------------------------------------------------------------------


const filterTheData = (data) => {
  const categoryElement = document.querySelector(".quiz-container");
  const difficultyElement = document.querySelector(".mode-of-test");
  const selectedCategory = categoryElement.value;
  const selectedDifficulty = difficultyElement.value;

  const filteredData = data.filter((dta) => dta.category === selectedCategory);
  console.log(filteredData);

  const difficultyLevels = filteredData[0].difficulty_levels;
  console.log(difficultyLevels);

  const filteredQuestions = difficultyLevels[selectedDifficulty] || [];
  console.log(filteredQuestions);
  showQuestions(filteredQuestions);
};


// ---------------------------------------------------------------------------------------------------------


const time_element = document.querySelector(".timerSpan");
let current_question_number = 0;
let score = 0;
const total_time = 15;
let sec = total_time;
let time;
let questions = [];

function timer() {
  time_element.innerHTML = sec;
  sec--;
  if (sec < 0) {
    sec = total_time;
    clearInterval(time);
    current_question_number++;
    if (current_question_number < questions.length) {
      displayQuestion();
    } else {
      alert("Quiz completed!");
      document.querySelector(".btnEnd").style.display = "block";
      document.querySelector(".btnNext").style.display = "none";
    }
  }
}

function showQuestions(questionsList) {
  questions = questionsList;
  current_question_number = 0;
  displayQuestion();
}

function displayQuestion() {
  if (current_question_number >= questions.length) {
    alert("Quiz completed!");
    document.querySelector(".btnEnd").style.display = "block";
    document.querySelector(".btnNext").style.display = "none";
    return;
  }

  const qunDta = questions[current_question_number];
  const qunElem = document.querySelector(".question");
  const choicesElem = document.querySelector(".choices");

  qunElem.innerText = qunDta.question;
  choicesElem.innerHTML = "";
  const answers = [...qunDta.incorrect_answers, qunDta.correct_answer];
  answers.sort(() => Math.random() - 0.5);


  answers.forEach((answer) => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.className = "list-choices";
    choicesElem.appendChild(li);
  });

  

  sec = total_time;
  clearInterval(time);
  time = setInterval(timer, 1000);

  findAnswer(qunDta);
}


// --------------------------------------------------------------------------------------------------------------------

let crtAns = 0;

function findAnswer(question) {
  const choicesElements = document.querySelectorAll(".choices li");

  choicesElements.forEach((choiceElement) => {
    choiceElement.addEventListener("click", (event) => {
      const selectedAnswer = event.target.textContent;
      const correctAnswer = question.correct_answer;

      choicesElements.forEach((choice) => {
        choice.style.pointerEvents = "none";
      });




      document.querySelector(".btnNext").addEventListener("click", () => {
        choicesElements.forEach((choice) => {
          choice.style.pointerEvents = "auto";
        });
      });



      if (selectedAnswer === correctAnswer) {
               event.target.style.backgroundColor = "#28a745";
        event.target.style.color = "white";
               crtAns++;
        endCode(crtAns);
        console.log("Correct Answer");
      } else {
        event.target.style.backgroundColor = "red";
        event.target.style.color = "white";
        console.log("Incorrect Answer");
       
    choicesElements.forEach((choice) => {
          if (choice.textContent === correctAnswer) {
            choice.style.backgroundColor = "#28a745";
            choice.style.color = "white";
          }
        });
      }

// ---------------------------------------------------------------

      setTimeout(() => {
        current_question_number++;
        if (current_question_number < questions.length) {
          displayQuestion();
        } else {
          alert("Quiz completed!");
          document.querySelector(".btnEnd").style.display = "block";
          document.querySelector(".btnNext").style.display = "none";
        }
      }, 2000); 
    });
  });
}

// ------------------------------------------------------------------------------------------------

document.querySelector(".btnEnd").addEventListener("click", () => {
  const submit = document.querySelector(".hidden-box");
  submit.style.display = "none";

  const res = document.querySelector(".result-wrap");
  res.style.display = "block";
});

document.querySelector(".startAgain").addEventListener("click", () => {
  const main = document.querySelector(".one-box");
  main.style.display = "block";

  const submit = document.querySelector(".hidden-box");
  submit.style.display = "none";

  const res = document.querySelector(".result-wrap");
  res.style.display = "none";

  location.reload();
});


// --------------------------------------------------------------------------------------------------------

// Calculator
function clearDisplay() {
  document.getElementById("display").value = "";
}

function appendValue(value) {
  document.getElementById("display").value += value;
}

function calculate() {
  let display = document.getElementById("display");
 
    display.value = eval(display.value);
 
}

// ------------------------------------------------------------------------------------------------------------------

function endCode(e) {
  const cardRes = document.querySelector(".updatingInJs");
  cardRes.innerHTML = `
      <div class="Marks">Marks: <span>${e}</span> / <span>5</span> </div>
      <div class="Percentage">${(100 * e) / 5}%</div>
      <h3 class="Thanks">Thanks for Giving a Quiz</h3>
      <div class="end">END..</div>
  `;
}
