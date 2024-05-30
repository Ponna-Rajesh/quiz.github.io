
document.addEventListener("DOMContentLoaded", () => {
  fetchData(); // Fetch data and filter questions
  findAnswer(); // Attach event listeners to choices
});

const fetchData = async () => {
    const response = await fetch("quiz.json");
    const json = await response.json();
    filterTheData(json.results)
} 


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

// -----------------------------------------------------------------------------------------------------------------


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
document.querySelector(".mode-of-test").addEventListener("change", updateStartButtonState);
updateStartButtonState();


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


// ---------------------------------------------------------------------------------------------------------------------------------

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



// --------------------------------------------------------------------------------------------------------------------------------------------

function showQuestions(questions) {

  console.log(questions)
  let currentQuestionIndex = 0;

  function displayQuestion() {
      if (currentQuestionIndex === questions.length){
          alert("Quiz completed!")
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
          li.textContent = answer;
          li.className = "list-choices"
          choicesElement.appendChild(li); 
      });

      currentQuestionIndex++;
      findAnswer([questionData]); 

  }
  
  document.querySelector('.submit-button').addEventListener('click', displayQuestion);

  document.querySelector('.btnNext').addEventListener('click', () => {
      const choicesElements = document.querySelectorAll('.choices li');
        choicesElements.forEach(choice => {
            choice.style.pointerEvents = 'auto'; 
            choice.style.backgroundColor = ''; 
            choice.style.color = ''; 
        });
    });
  
  displayQuestion(); 
}

// -------------------------------------------------------------------------------------------------------------------

let crtAns = 0

function findAnswer(question) {
  console.log(question);
  const choicesElements = document.querySelectorAll('.choices li'); // Select all the choice elements


  choicesElements.forEach(choiceElement => {
      choiceElement.addEventListener('click', (event) => {
          const selectedAnswer = event.target.textContent;
          const correctAnswer = question[0].correct_answer;

          // Disable further clicks
          choicesElements.forEach(choice => {
              choice.style.pointerEvents = 'none';
          });

          document.querySelector(".btnNext").addEventListener("click", ()=>{
            choicesElements.forEach(choice => {
              choice.style.pointerEvents = 'auto';
          });
          
          })

          if (selectedAnswer === correctAnswer) {
              event.target.style.backgroundColor = "#28a745";
              event.target.style.color = "white";
              crtAns++
              endCode(crtAns)
              console.log("Correct Answer");
          } else {
              event.target.style.backgroundColor = "red";
              event.target.style.color = "white";
              console.log("Incorrect Answer");

              // Highlight the correct answer
              choicesElements.forEach(choice => {
                  if (choice.textContent === correctAnswer) {
                      choice.style.backgroundColor = "#28a745";
                      choice.style.color = "white";
                  }
              });
          }
          
      });
  });

}

// -------------------------------------------------------------------------------------------------------------------------------


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



// -----------------------------------------------------------------------------------------------------------------------------------------

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
  

//----------------------------------------------------------------------------------------------------------------------------
function endCode(e) {
  const cardRes = document.querySelector('.updatingInJs');
  cardRes.innerHTML = ` 
      <div class="Marks">Marks: <span>${e}</span> / <span>5</span> </div>
      <div class="Percentage">${(100 * e) / 5}%</div>
      <h3 class="Thanks">Thanks for Giving a Quiz</h3>
      <div class="end">END..</div>
  `
}


