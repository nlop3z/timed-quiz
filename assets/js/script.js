//global variables
var startCountdown;
var questionCounter = 0;
var time = 75;
//DOM variables
var startPage = document.getElementById('start-page');
var startButton = document.getElementById('start-quiz');
var submitButton = document.getElementById('submit');
var questionsEl = document.getElementById('questions-container');
var questionTitleEl = document.getElementById('question-title');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var initialsEl = document.getElementById('initials');


//array of quiz questions
const questions = [
    {
        questionTitle: "Commonly used data types DO NOT include:",
        answers: ["1. strings","2. booleans","3. alerts","4. numbers"],
        correctAnswer: "3. alerts"
    },
    {
        questionTitle: "The condition in an if / else statement is enclosed with ____",
        answers: ["1. quotes","2. curly brackets","3. parenthesis","4. square brackets"],
        correctAnswer: "3. parenthesis"
    },
    {
        questionTitle: "Arrays in JavaScript can be used to store ____",
        answers: ["1. numbers and strings", "2. other arrays","3. booleans","4. all of the above"],
        correctAnswer: "4. all of the above"
    },
    {
        questionTitle: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commas","2. curlybrackets","3. quotes","4. parenthesis"],
        correctAnswer: "4. parenthesis"
    },
    {
        questionTitle: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. JavaScript","2. terminal/bash","3. for loops","4. console.log"],
        correctAnswer: "4. console.log"
    }
];

//Timer that counts down
var counter = 5;
var questionCounter = 0;
var countdown = function() {
    if (time <= 0 || questionCounter > 4) {
        clearInterval(countdown);
        endQuiz();
    } else {
        time--;
        timerEl.textContent = time;
    }
}

var startQuiz = function () {
    startCountdown = setInterval(countdown, 1000);
    //console.log("start")
    grabQuestion();
}

var grabQuestion = function () {
    document.getElementById("start-page").classList.add("hidden")
    document.getElementById("high-score").classList.add("hidden")
    var currentQuestion = questions[questionCounter];
    questionTitleEl.textContent = currentQuestion.questionTitle;
    choicesEl.textContent = '';
    console.log(currentQuestion.answers.length);
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var choicesButton = document.createElement("button")
        choicesButton.textContent = currentQuestion.answers[i]
        choicesButton.setAttribute("value", currentQuestion.answers[i])
        choicesButton.onclick=answerCheck
        choicesEl.appendChild(choicesButton)
        choicesButton.classList.add ("show","auto");
        console.log(choicesButton);

    }
}

//answer check fx
var answerCheck = function () {
    var currentQuestion = questions[questionCounter].correctAnswer;
    var guessAnswer = this.value;
    //console.log(guessAnswer)
    document.getElementById("feedback").classList.remove("hidden")
    if (currentQuestion === guessAnswer) {
        document.getElementById("feedback").textContent = "correct"
    } else {
        document.getElementById("feedback").textContent = "wrong"
        time=time-10;
    } 
    if (questionCounter===questions.length - 1){
    endQuiz();
    return;
}
    questionCounter++
    grabQuestion();
}

//end quiz fx
var endQuiz = function (){
    document.getElementById("end-page").classList.remove("hidden")
    document.getElementById("feedback").classList.add("hidden")
    document.getElementById("questions-container").classList.add("hidden")
    document.getElementById("high-score").classList.add("hidden")
}


//fx to save score and enter initials
var saveHighScore = function () {
    var enterInitials = initialsEl.value.trim();
    if (initials !== '') {
        var highscores = JSON.parse(localStorage.getItem('scores')) || [];
        var newScore = {
            initials: enterInitials,
            score: time
        };
        highscores.push(newScore);
        localStorage.setItem('scores', JSON.stringify(highscores));
    }
    getGame();
};

//restart game and get scores fx
var getGame = function() {
    document.getElementById("high-score").classList.remove("hidden")
    document.getElementById("end-page").classList.add("hidden")
    var backButton = document.getElementById('back');
    backButton = document.createElement("button");
}

//Listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveHighScore);





