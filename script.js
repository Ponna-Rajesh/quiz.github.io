const fetchData = async () => {
    const response = await fetch("quiz.json");
    const json = await response.json();
    return json.results;
} 
 

document.querySelector(".serach-btn").addEventListener('click',  () =>{
    const serachBox = document.querySelector('.serach-info-box')
   const searchQuery = serachBox.value
   fetchData().then(data => {
    const allCategories = data.map(dta => dta.category);
    updateCategories(searchQuery, allCategories);
    serachBox.value= ""
});
})

const updateCategories = (query, allCategories) => {
    const filteredCategories = filterCategories(query, allCategories);
    const selectElement = document.querySelector(".quiz-container");

    selectElement.innerHTML = "";

    filteredCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        selectElement.appendChild(option);
    });


    const exactMatch = allCategories.some(category => category.toLowerCase() === query.toLowerCase());
    if (!exactMatch) {
        alert("QUIZ ONLY AVAILABLE FOR HTML CSS JS PYTHON AND JAVA");
        const selectElement = document.querySelector(".quiz-container");
        const option = document.createElement("option");
        option.textContent = "Any Category"
        selectElement.appendChild(option); 
    }
};

const filterCategories = (query, categories) => {
    return categories.filter(category => category.toLowerCase().includes(query.toLowerCase()));
};

fetchData().then(data =>{
    const selectElement = document.querySelector(".quiz-container");
    data.forEach((dta) => {
        const option = document.createElement("option");
        option.value = dta.category;
        option.textContent = dta.category;
        selectElement.appendChild(option);
    });
})


document.querySelector(".submitBtn").addEventListener("click", () => {
    const main = document.querySelector(".one-box")
    main.style.display = "none"

    const submit =  document.querySelector(".hidden-box")
    submit.style.display = "block"
})

//
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
  