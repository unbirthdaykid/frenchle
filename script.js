var tabs = document.getElementsByClassName('tab');
var navItems = document.getElementsByClassName('nav-item');
    
function changeTab(index) {
    // hide all tabs
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
        navItems[i].classList.remove('active');
    }

    // show the selected tab
    tabs[index].style.display = 'block';
    navItems[index].classList.add('active');
}

// activate the first tab by default
changeTab(0);


// --------------------------------------------------------------------------------------------------
let selectedAnswers = {};

function selectAnswer(element, choiceIndex) {
    const questionDiv = element.closest('.question');
    const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(questionDiv);

    selectedAnswers[questionIndex] = choiceIndex;

    const circles = questionDiv.querySelectorAll('.circle');
    circles.forEach(circle => circle.classList.remove('selected'));
    element.querySelector('.circle').classList.add('selected');
}

function submitQuiz() {
    let score = 0;

    const questions = document.querySelectorAll('.question');
    questions.forEach((questionDiv, index) => {
        const correctAnswer = parseInt(questionDiv.getAttribute('data-answer'));
        const answerButtons = questionDiv.querySelectorAll('.answer-btn');
        
        if (selectedAnswers[index] === correctAnswer) {
            score++;
            answerButtons[correctAnswer].classList.add('user-correct');
        } else if (selectedAnswers[index] !== undefined) {
            answerButtons[selectedAnswers[index]].classList.add('user-wrong');
        }

        questionDiv.querySelector('.answer').style.display = 'block';
    });

    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}/${questions.length}`;  // Updated this line
    scoreElement.classList.add('score-style'); 
}

