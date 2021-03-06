//global variables
var startCountdown;
var questionCounter = 0;
var time = 75;
var highscores;
//DOM variables
var startPage = document.getElementById('start-page');
var startButton = document.getElementById('start-quiz');
var submitButton = document.getElementById('submit');
var clearButton = document.getElementById('clear-high-scores');
var questionsEl = document.getElementById('questions-container');
var questionTitleEl = document.getElementById('question-title');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var initialsEl = document.getElementById('initials');
var finalScoreEl = document.getElementById('final-score');
var goBackButton = document.getElementById('back');
// Array of quiz questions
const questions = [
    {
        questionTitle: "Commonly used data types DO NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "3. alerts"
    },
    {
        questionTitle: "The condition in an if / else statement is enclosed with ____",
        answers: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correctAnswer: "3. parenthesis"
    },
    {
        questionTitle: "Arrays in JavaScript can be used to store ____",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "4. all of the above"
    },
    {
        questionTitle: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commas", "2. curlybrackets", "3. quotes", "4. parenthesis"],
        correctAnswer: "4. parenthesis"
    },
    {
        questionTitle: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "4. console.log"
    }
];
// Timer
var counter = 5;
var countdown = function () {
    if (time <= 0 || questionCounter > 4) {

        endQuiz();
    } else {
        time--;
        timerEl.textContent = time;
    }
}
var startQuiz = function () {
    startCountdown = setInterval(countdown, 1000);
    grabQuestion();
}
// Fx that will grab the questions and put them on the screen
var grabQuestion = function () {
    document.getElementById("start-page").classList.add("hidden")
    document.getElementById("high-score").classList.add("hidden")
    document.getElementById("questions-container").classList.remove("hidden")
    var currentQuestion = questions[questionCounter];
    questionTitleEl.textContent = currentQuestion.questionTitle;
    choicesEl.textContent = '';
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var choicesButton = document.createElement("button")
        choicesButton.textContent = currentQuestion.answers[i]
        choicesButton.setAttribute("value", currentQuestion.answers[i])
        choicesButton.onclick = answerCheck
        choicesEl.appendChild(choicesButton)
        choicesButton.classList.add("show", "auto");
    }
}
// Answer check fx
var answerCheck = function () {
    var currentQuestion = questions[questionCounter].correctAnswer;
    var guessAnswer = this.value;
    document.getElementById("feedback").classList.remove("hidden")
    if (currentQuestion === guessAnswer) {
        document.getElementById("feedback").textContent = "correct"
    } else {
        document.getElementById("feedback").textContent = "wrong"
        time = time - 10;
    }
    if (questionCounter === questions.length - 1) {
        endQuiz();
        finalScoreEl.textContent = time;
        return;
    }
    questionCounter++
    grabQuestion();
}
// End quiz fx
var endQuiz = function () {
    clearInterval(startCountdown);
    document.getElementById("end-page").classList.remove("hidden")
    document.getElementById("feedback").classList.add("hidden")
    document.getElementById("questions-container").classList.add("hidden")
    document.getElementById("high-score").classList.add("hidden")
    timerEl.textContent = time;
}
// Fx to save score and enter initials
var saveHighScore = function () {
    var enterInitials = initialsEl.value.trim();
    if (initials !== '') {
        highscores = JSON.parse(localStorage.getItem('scores')) || [];
        var newScore = {
            initials: enterInitials,
            score: time
        };
        highscores.push(newScore);
        highscores.sort(function (a, b) { return b.score - a.score })
        localStorage.setItem('scores', JSON.stringify(highscores));
    }
    getGame(highscores);
};
// Get scores fx
var getGame = function (storageScores) {
    document.getElementById("high-score").classList.remove("hidden")
    document.getElementById("end-page").classList.add("hidden")
    var backButton = document.getElementById('back');
    backButton = document.createElement("button");
    document.getElementById("list").classList.remove("hidden")
    var list = document.getElementById("list")
    for (let index = 0; index < highscores.length && index < 3; index++) {
        var scoreEl = document.createElement("li");
        scoreEl.innerHTML = "initials: " + storageScores[index].initials + " score: " + storageScores[index].score
        document.getElementById("list").append(scoreEl);
    }
    clearInterval();
}
// Clear scores 
var clearScores = function () {
    localStorage.removeItem('scores');
    document.getElementById("list").innerHTML = "";
}
// Reset quiz to start it over
var resetQuiz = function () {
    document.getElementById("end-page").classList.add("hidden")
    document.getElementById("feedback").classList.add("hidden")
    document.getElementById("questions-container").classList.add("hidden")
    document.getElementById("high-score").classList.add("hidden")
    document.getElementById("start-page").classList.remove("hidden")
    document.getElementById("list").innerHTML = "";
    questionCounter = 0;
    time = 75;
    timerEl.textContent = 0;
    clearInterval();
    initialsEl.value = "";
}
// Listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveHighScore);
clearButton.addEventListener("click", clearScores);
goBackButton.addEventListener("click", resetQuiz);






