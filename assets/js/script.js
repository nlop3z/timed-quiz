//global variables
var startCountdown;
var questionCounter = 0;
var playerScore = 0;

//array of quiz questions
const quizQuestions = [
    {  
    question: "Commonly used data types DO NOT include:",
    answers: {
        a: "strings",
        b: "booleans",
        c: "alerts",
        d: "numbers"
    },
    correctAnswer: "c"
},
{
    question: "The condition in an if / else statement is enclosed with ____",
    answers: {
        a: "quotes",
        b: "curly brackets",
        c: "parenthesis",
        d: "square brackets"
    },
    correctAnswer: "c"
},
{   
    question: "Arrays in JavaScript can be used to store ____",
    answers: {
        a: "numbers and strings",
        b: "other arrays",
        c: "booleans",
        d: "all of the above",
    },
    correctAnswer: "d"
},
{   
    question: "String values must be enclosed within ____ when being assigned to variables.",
    answers: {
        a: "commas",
        b: "curly brackets",
        c: "quotes",
        d: "parenthesis"
    },
},
{   
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: {
        a: "JavaScript",
        b: "terminal/bash",
        c: "for loops",
        d: "console.log"
    },
    correctAnswer: "d"
}
];
// var that will store output
var buildQuiz = function() {
    const output = [];
}

//Timer that counts down from 5
var counter = 5;
var questionCounter = 0;
var countdown = function () {
    console.log(counter);
    counter--;
    if (counter ===0) {
        clearInterval(startCountdown);
        };
    };

var quizButtons = document.querySelector("questions-container")
var startButton = document.querySelector("#start-quiz");
var startQuiz = function() {
startCountdown = setInterval(countdown, 5000);
    console.log("start")
    quizQuestions [questionCounter]
    
}

startButton.addEventListener("click",startQuiz);
//quizButtons.addEventListener("click",);




