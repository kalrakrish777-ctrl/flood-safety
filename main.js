const allQuestions = [
    { question: "How much water is needed per person per day in an emergency kit?", options: ["Half a gallon", "1 gallon", "2 gallons", "5 gallons"], correct: 1 },
    { question: "How many inches of moving flood water can sweep a car away?", options: ["6 inches", "8 inches", "12 inches", "18 inches"], correct: 2 },
    { question: "How quickly can mold begin growing after a flood?", options: ["Within 24-48 hours", "Within 1 week", "Within 2 weeks", "Within 1 month"], correct: 0 },
    { question: "What should you do FIRST when returning home after a flood?", options: ["Start cleaning immediately", "Open all windows", "Turn on all lights", "Return only when authorities say it's safe"], correct: 3 },
    { question: "How much bleach should you use per gallon of water to clean surfaces?", options: ["Half a cup", "1 cup", "2 cups", "A few drops"], correct: 1 },
    { question: "How much running water can knock a person down?", options: ["2 inches", "4 inches", "6 inches", "10 inches"], correct: 2 },
    { question: "What should you include in your family communication plan?", options: ["Only phone numbers", "Meeting points and emergency contacts", "Only email addresses", "Social media passwords"], correct: 1 },
    { question: "Why should you avoid bridges over fast-moving water?", options: ["They might be closed", "Traffic is heavy", "They can collapse from water force", "They're hard to see"], correct: 2 },
    { question: "What is a key step to protect important documents before a flood?", options: ["Hide them under your bed", "Place them in waterproof bags or cloud storage", "Give them to your neighbor", "Put them in the freezer"], correct: 1 },
    { question: "What should you do if you smell gas after a flood?", options: ["Open windows", "Turn on lights", "Leave immediately and call the gas company", "Light a candle"], correct: 2 },
    { question: "What does signing up for emergency alerts help you do?", options: ["Get discounts", "Receive early warning notifications", "Find new friends", "Win prizes"], correct: 1 },
    { question: "Why is flood water dangerous even after the rain stops?", options: ["It attracts snakes", "Flooding can continue for hours", "It makes roads slippery", "It attracts mosquitoes"], correct: 1 },
    { question: "What protective gear should you wear when cleaning after a flood?", options: ["Swimsuit and sandals", "Boots, gloves, and masks", "Just gloves", "Nothing special"], correct: 1 },
    { question: "Where should you move electrical panels, furnaces, and water heaters?", options: ["Basement", "Attic", "Higher floors", "Garage"], correct: 2 },
    { question: "Why is documenting flood damage important?", options: ["For social media", "For insurance claims", "To show friends", "To remember the event"], correct: 1 }
];

let selectedQuestions = [];
let correctAnswers = 0;

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function generateQuiz() {
    const container = document.getElementById('quiz-container');
    const results = document.getElementById('quiz-results');
    
    if (!container) return;
    
    correctAnswers = 0;
    
    selectedQuestions = shuffleArray(allQuestions).slice(0, 5);
    container.innerHTML = '';
    results.classList.remove('show');

    selectedQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.dataset.correct = q.correct;

        const optionsHTML = q.options.map((opt, i) => 
            `<label><input type="radio" name="q${index}" value="${i}"> ${opt}</label>`
        ).join('');

        questionDiv.innerHTML = `
            <h3>Question ${index + 1}</h3>
            <p>${q.question}</p>
            <div class="quiz-options">${optionsHTML}</div>
            <button class="check-btn" onclick="checkAnswer(${index})">Check Answer</button>
            <div class="feedback"></div>
        `;
        container.appendChild(questionDiv);
    });
}

function checkAnswer(questionNum) {
    const question = document.querySelector(`.quiz-question:nth-child(${questionNum + 1})`);
    if (!question) return;
    
    const correct = parseInt(question.dataset.correct);
    const selected = document.querySelector(`input[name="q${questionNum}"]:checked`);
    const labels = question.querySelectorAll('label');
    const feedback = question.querySelector('.feedback');
    const button = question.querySelector('.check-btn');

    if (!selected) {
        feedback.textContent = "Please select an answer first!";
        feedback.className = "feedback show incorrect";
        return;
    }

    labels.forEach(label => label.classList.add('disabled'));
    button.disabled = true;

    const selectedIndex = parseInt(selected.value);

    if (selectedIndex === correct) {
        selected.parentElement.classList.add('correct');
        feedback.textContent = "Correct! Great job!";
        feedback.className = "feedback show correct";
        correctAnswers++;
    } else {
        selected.parentElement.classList.add('incorrect');
        labels[correct].classList.add('correct');
        feedback.textContent = "Incorrect. The correct answer is highlighted.";
        feedback.className = "feedback show incorrect";
    }

    const answeredCount = document.querySelectorAll('.check-btn:disabled').length;
    if (answeredCount === 5) {
        showResults();
    }
}

function showResults() {
    const results = document.getElementById('quiz-results');
    const scoreEl = document.getElementById('score');
    const messageEl = document.getElementById('score-message');

    if (!results || !scoreEl || !messageEl) return;

    scoreEl.textContent = correctAnswers;

    const messages = [
        "Keep learning! Read through the tips again.",
        "Good start! Review the sections to improve.",
        "Good job! You're getting there.",
        "Great work! You know your flood safety well.",
        "Excellent! Almost perfect!",
        "Perfect score! You're a flood safety expert!"
    ];
    messageEl.textContent = messages[correctAnswers];

    results.classList.add('show');
}

document.addEventListener('DOMContentLoaded', function() {
    const restartBtn = document.getElementById('restart-quiz');
    if (restartBtn) {
        restartBtn.addEventListener('click', generateQuiz);
    }
    
    if (document.getElementById('quiz-container')) {
        generateQuiz();
    }
});
