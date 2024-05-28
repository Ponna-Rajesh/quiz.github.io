const fetchData = async () => {
    const response = await fetch("quiz.json");
    const json = await response.json();
    filterTheData(json.results)
} 

document.querySelector(".submitBtn").addEventListener("click", () => {
  const main = document.querySelector(".one-box")
  main.style.display = "none"


  const guide = document.querySelector(".guide-line-card")
  guide.style.display = "block"

  const body = document.querySelector(".bodyBOX")
  body.style.backgroundColor ="#252B48"
  body.style.color ="white"

 
})


document.querySelector(".guide-exit").addEventListener("click", () => {

  const guide = document.querySelector(".guide-line-card")
  guide.style.display = "none"

  const main = document.querySelector(".one-box")
  main.style.display = "block"

  const body = document.querySelector(".bodyBOX")
  body.style.backgroundColor ="white"
  body.style.color ="black"

})

document.querySelector(".guide-con").addEventListener("click", () => {
  
  const guide = document.querySelector(".guide-line-card")
  guide.style.display = "none"

  const submit =  document.querySelector(".hidden-box")
  submit.style.display = "block"

  const body = document.querySelector(".bodyBOX")
  body.style.backgroundColor ="white"
  body.style.color ="black"
  fetchData()

})

document.querySelector(".btnEnd").addEventListener("click", () => {
  const submit =  document.querySelector(".hidden-box")
  submit.style.display = "none"

  const res =  document.querySelector(".result-wrap")
      res.style.display = "block"
})

document.querySelector(".startAgain").addEventListener("click", () => {
  const main = document.querySelector(".one-box")
  main.style.display = "block"

  const submit =  document.querySelector(".hidden-box")
  submit.style.display = "none"

  const res =  document.querySelector(".result-wrap")
      res.style.display = "none"

      location.reload()
})




//CHECking....
const updateStartButtonState = () => {
  const categoryElement = document.querySelector(".quiz-container");
  const difficultyElement = document.querySelector(".mode-of-test");
  const startBtn = document.getElementById("startBtn");
  if (categoryElement.value === "Any Category" || difficultyElement.value === "Any Difficulty" ) {
      startBtn.disabled = true;
      startBtn.style.opacity = "0.5";
  } else {
      startBtn.disabled = false;
      startBtn.style.opacity = "1";
  }

};
document.querySelector(".quiz-container").addEventListener("click", updateStartButtonState);
document.querySelector(".mode-of-test").addEventListener("click", updateStartButtonState);
updateStartButtonState();


//Filtered the data what we clicked in Home Page
const filterTheData = (data) => {
  const categoryElement = document.querySelector(".quiz-container");
  const difficultyElement = document.querySelector(".mode-of-test");
  const selectedCategory = categoryElement.value;
  const selectedDifficulty = difficultyElement.value;

  const filteredData = data.filter(dta => dta.category === selectedCategory);
  console.log(filteredData);

    const difficultyLevels = filteredData[0].difficulty_levels;
    console.log(difficultyLevels);

    const filteredQuestions = difficultyLevels[selectedDifficulty] || [];
    console.log(filteredQuestions)
    showQuestions(filteredQuestions)

}


// QUESTIONS 

function showQuestions(questions) {
  if (questions.length === 0) {
      alert("No questions available for the selected category and difficulty.");
      return;
  }

  let currentQuestionIndex = 0;

  function displayQuestion() {
      if (currentQuestionIndex >= questions.length) {
          alert("Quiz completed!");
          document.querySelector(".btnEnd").style.display = "block" 
          document.querySelector(".btnNext").style.display = "none" 
          return;
      }

      const questionData = questions[currentQuestionIndex];
      const questionElement = document.querySelector('.question');
      const choicesElement = document.querySelector('.choices');

      questionElement.innerText = questionData.question;
      choicesElement.innerHTML = '';

      const answers = [...questionData.incorrect_answers, questionData.correct_answer];
      answers.sort(() => Math.random() - 0.5); // Shuffle the answers

      answers.forEach(answer => {
          const li = document.createElement('li');
          const label = document.createElement('label');
          const input = document.createElement('input');
          input.type = 'radio';
          input.name = 'answer';
          input.value = answer;

          label.appendChild(input);
          label.appendChild(document.createTextNode(answer));
          li.appendChild(label);
          choicesElement.appendChild(li);
      });

      currentQuestionIndex++;
  }

  document.querySelector('.submit-button').addEventListener('click', displayQuestion);

  // Initial call to show the first question
  displayQuestion();
}

document.querySelector('.filter-button').addEventListener('click', filterTheData);



//Search
document.querySelector(".serach-btn").addEventListener('click', () => {
    const searchBox = document.querySelector('.serach-info-box');
    const searchQuery = searchBox.value.toLowerCase();
    const selectElement = document.querySelector(".quiz-container");
    const options = selectElement.querySelectorAll('option');

    let matchFound = false;

    options.forEach(option => {
        if (option.value.toLowerCase() === searchQuery) {
            selectElement.value = option.value;
            matchFound = true;
        }
    });

    if (!matchFound) {
        alert("QUIZ ONLY AVAILABLE FOR HTML, CSS, JS, PYTHON, AND JAVA");
    }

    searchBox.value = ""; 
});


//Caluclator
function clearDisplay() {
    document.getElementById('display').value = '';
  }
  
  function appendValue(value) {
    document.getElementById('display').value += value;
  }
  
  function calculate() {
    let display = document.getElementById('display');
    try {
      display.value = eval(display.value);
    } catch (error) {
      display.value = 'Error';
    }
  }
  












  

