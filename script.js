let player1 = { name: '', score: 0 };
let player2 = { name: '', score: 0 };
let currentRound = 1;
let categories = {}; 
let availableCategories = []; 
let currentQuestions = [];
let currentQuestionIndex = 0;


const screens = document.querySelectorAll('.screen');
const setupScreen = document.getElementById('setup-screen');
const categoryScreen = document.getElementById('category-screen');
const gameplayScreen = document.getElementById('gameplay-screen');
const summaryScreen = document.getElementById('summary-screen');
const resultScreen = document.getElementById('result-screen');

const p1NameInput = document.getElementById('player1-name');
const p2NameInput = document.getElementById('player2-name');
const setupError = document.getElementById('setup-error');
const categorySelect = document.getElementById('category-select');
const nextRoundBtn = document.getElementById('next-round-btn');





function showScreen(screenId) {
    screens.forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'flex';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



async function init() {
    try {
        const response = await fetch('https://the-trivia-api.com/v2/categories');
        const data = await response.json();
        
        
        categories = data;
        availableCategories = Object.keys(data);
        populateCategoryDropdown();
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
}

function populateCategoryDropdown() {
    categorySelect.innerHTML = '';
    availableCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}



document.getElementById('start-game-btn').addEventListener('click', () => {
    const name1 = p1NameInput.value.trim();
    const name2 = p2NameInput.value.trim();

    if (!name1 || !name2) {
        setupError.textContent = 'Both player names must be entered.';
        return;
    }
    if (name1 === name2) {
        setupError.textContent = 'Player names must be unique.';
        return;
    }

    player1.name = name1;
    player2.name = name2;
    player1.score = 0;
    player2.score = 0;
    currentRound = 1;

    document.getElementById('p1-display').textContent = player1.name;
    document.getElementById('p2-display').textContent = player2.name;
    document.getElementById('p1-score').textContent = '0';
    document.getElementById('p2-score').textContent = '0';

    showScreen('category-screen');
});

document.getElementById('start-round-btn').addEventListener('click', async () => {
    const selectedCategory = categorySelect.value;
    if (!selectedCategory){
        return;
    }
        

    const categorySlug = categories[selectedCategory][0]; // Using the first tag as the category slug
    
    // Fetch 6 questions: 2 Easy, 2 Medium, 2 Hard
    try {
        document.getElementById('start-round-btn').disabled = true;
        document.getElementById('start-round-btn').textContent = 'Loading...';

        const [easy, medium, hard] = await Promise.all([
            fetchQuestions(categorySlug, 'easy', 2),
            fetchQuestions(categorySlug, 'medium', 2),
            fetchQuestions(categorySlug, 'hard', 2)
        ]);

        
        currentQuestions = [
            easy[0], easy[1],
            medium[0], medium[1],
            hard[0], hard[1]
        ];

        // Validate we got enough questions
        if (currentQuestions.some(q => !q)) {
            alert('Could not fetch enough questions for this category. Please try another.');
            document.getElementById('start-round-btn').disabled = false;
            document.getElementById('start-round-btn').textContent = 'Start Round';
            return;
        }

        // Remove category from available
        availableCategories = availableCategories.filter(c => c !== selectedCategory);
        populateCategoryDropdown();
 

        currentQuestionIndex = 0;
        setupQuestion();
        showScreen('gameplay-screen');
        
        // Reset button state for next time
        document.getElementById('start-round-btn').disabled = false;
        document.getElementById('start-round-btn').textContent = 'Start Round';

    } catch (error) {
        console.error('Error starting round:', error);
        alert('An error occurred. Please check your connection.');
        document.getElementById('start-round-btn').disabled = false;
        document.getElementById('start-round-btn').textContent = 'Start Round';
    }
});

async function fetchQuestions(category, difficulty, limit) {
    const url = `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}&limit=${limit}`;
    const response = await fetch(url);
    return await response.json();
}

function setupQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const difficultyMap = ['Easy', 'Easy', 'Medium', 'Medium', 'Hard', 'Hard'];
    const playerTurn = currentQuestionIndex % 2 === 0 ? player1 : player2;

    document.getElementById('gameplay-round').textContent = `Round ${currentRound}`;
    document.getElementById('gameplay-category').textContent = question.category.replace(/_/g, ' ');
    document.getElementById('gameplay-difficulty').textContent = difficultyMap[currentQuestionIndex];
    document.getElementById('current-turn').textContent = `${playerTurn.name}'s Turn`;
    document.getElementById('question-text').textContent = question.question.text;

    const options = shuffleArray([question.correctAnswer, ...question.incorrectAnswers]);
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(opt, question.correctAnswer, btn);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('feedback-msg').textContent = '';
    document.getElementById('next-btn').disabled = true;
}

function handleAnswer(selected, correct, clickedBtn) {
    const optionsButtons = document.querySelectorAll('.option-btn');
    optionsButtons.forEach(btn => btn.disabled = true);

    const isCorrect = selected === correct;
    const playerTurn = currentQuestionIndex % 2 === 0 ? player1 : player2;

    if (isCorrect) {
        clickedBtn.classList.add('correct');
        document.getElementById('feedback-msg').textContent = 'Correct!';
        document.getElementById('feedback-msg').style.color = '#28a745';
        
        // Scoring
        let points = 0;
        if (currentQuestionIndex < 2) points = 10;
        else if (currentQuestionIndex < 4) points = 15;
        else points = 20;

        playerTurn.score += points;
        updateScores();
    } else {
        clickedBtn.classList.add('wrong');
        document.getElementById('feedback-msg').textContent = `Wrong! The correct answer was: ${correct}`;
        document.getElementById('feedback-msg').style.color = '#dc3545';
        
        // Highlight the correct answer
        optionsButtons.forEach(btn => {
            if (btn.textContent === correct) btn.classList.add('correct');
        });
    }

    document.getElementById('next-btn').disabled = false;
}

function updateScores() {
    document.getElementById('p1-score').textContent = player1.score;
    document.getElementById('p2-score').textContent = player2.score;
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < 6) {
        setupQuestion();
    } else {
        showRoundSummary();
    }
});

function showRoundSummary() {
    showScreen('summary-screen');
    nextRoundBtn.disabled = availableCategories.length === 0;
}

document.getElementById('next-round-btn').addEventListener('click', () => {
    currentRound++;
    document.getElementById('round-title').textContent = `Round ${currentRound}`;
    showScreen('category-screen');
});

document.getElementById('end-game-btn').addEventListener('click', showFinalResult);

function showFinalResult() {
    showScreen('result-screen');
    document.getElementById('final-p1-name').textContent = player1.name;
    document.getElementById('final-p1-score').textContent = player1.score;
    document.getElementById('final-p2-name').textContent = player2.name;
    document.getElementById('final-p2-score').textContent = player2.score;

    let message = '';
    if (player1.score > player2.score) {
        message = `${player1.name} Wins!`;
    } else if (player2.score > player1.score) {
        message = `${player2.name} Wins!`;
    } else {
        message = "It's a Draw!";
    }
    document.getElementById('winner-declaration').textContent = message;
}

document.getElementById('restart-btn').addEventListener('click', () => {
    location.reload();
});


init();