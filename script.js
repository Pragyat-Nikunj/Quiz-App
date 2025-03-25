document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const quizContainer = document.getElementById("quiz-container");
    const questionContainer = document.getElementById("quiz-card");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("answer-list");
    const resultContainer = document.getElementById("result-screen");
    const scoreDisplay = document.getElementById("score-text");

     const questions = [
       {
         question: "What is the capital of France?",
         choices: ["Paris", "London", "Berlin", "Madrid"],
         answer: "Paris", // 'Paris' is the correct answer
         marks: 4,
       },
       {
         question: "Which planet is known as the Red Planet?",
         choices: ["Venus", "Mars", "Jupiter", "Saturn"],
         answer: "Mars", // 'Mars' is the correct answer
         marks: 6,
       },
       {
         question: "What is the largest ocean on Earth?",
         choices: [
           "Atlantic Ocean",
           "Indian Ocean",
           "Arctic Ocean",
           "Pacific Ocean",
         ],
         answer: "Pacific Ocean", // 'Pacific Ocean' is the correct answer
         marks: 8,
       },
     ];
     let totalMarks = questions.reduce((sum, choice) => sum + choice.marks, 0)
     let currentQuestionIndex = 0;
     let score = 0;
     let choiceSelected = null;
     let answerSelected = false;

     startBtn.addEventListener('click', startQuiz);
     nextBtn.addEventListener('click', nextQuestion)
     restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add("hidden");
        startQuiz();
     })
     
     function startQuiz() {
        startBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        showQuestion();
     }
     function showQuestion() {
        choiceSelected = null;
        answerSelected = false;
        nextBtn.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = ``; //clear previous choices
        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.classList.add("choice-item");
            li.addEventListener('click', () => selectAnswer(li, choice));
            choicesList.appendChild(li);
        })
        startTimer();
     }

     function selectAnswer(selectedLi, choice) {
      if (choiceSelected) {
         choiceSelected.classList.remove("highlight");
      }
        choiceSelected = selectedLi;
        answerSelected = choice;
        selectedLi.classList.add("highlight");
        nextBtn.classList.remove("hidden");
     }
     function nextQuestion() {
       if (answerSelected && answerSelected === questions[currentQuestionIndex].answer) {
         score += questions[currentQuestionIndex].marks;
       }
       currentQuestionIndex++;
       if (currentQuestionIndex < questions.length) {
         showQuestion();
       } else {
         showResult();
       }
     }
     function showResult() {
        quizContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${totalMarks}`;
     }  
})