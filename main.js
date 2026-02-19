// Store answers
const userAnswers = {};

// Current question tracking
let currentQuestion = 1;
const totalQuestions = 3;

// Function to navigate between pages
function nextPage(currentPageId, nextPageId) {
  document.getElementById(currentPageId).classList.remove('active');
  document.getElementById(nextPageId).classList.add('active');
  
  // Add confetti effect on welcome page
  if (nextPageId === 'welcome') {
    createConfetti();
  }
  
  // Initialize game when reaching game page
  if (nextPageId === 'game') {
    initGame();
  }
}

// Save answer and move to next question
function saveAnswer(question, answer) {
  userAnswers[question] = answer;
  
  // Move to next question or page
  if (question === 'q1') {
    nextPage('question1', 'question2');
  } else if (question === 'q2') {
    nextPage('question2', 'question3');
  }
  // q3 is handled directly in the button onclick
}

// Initialize the moving "No" button
document.addEventListener('DOMContentLoaded', function() {
  const noBtn = document.getElementById('no-btn');
  
  noBtn.addEventListener('mouseover', function() {
    // Move the button to a random position
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    
    // Keep button within visible area
    const safeX = Math.min(Math.max(x, 50), window.innerWidth - 150);
    const safeY = Math.min(Math.max(y, 50), window.innerHeight - 100);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = safeX + 'px';
    noBtn.style.top = safeY + 'px';
  });
  
  // If somehow clicked, act like "Yes" was clicked
  noBtn.addEventListener('click', function() {
    saveAnswer('q3', 'Yes (tried to say No but I caught you!)');
    nextPage('question3', 'memory');
  });
});

// Confetti effect
function createConfetti() {
  const confettiCount = 100;
  const container = document.getElementById('welcome');
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Random properties
    const size = Math.random() * 10 + 5;
    const colors = ['#ff6b9d', '#9d65c9', '#5d54a4', '#f9c5d1', '#f3a0c3'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.background = color;
    confetti.style.position = 'absolute';
    confetti.style.top = '-10px';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = '1';
    
    // Animation
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    
    // Add to container
    container.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    0% { transform: translateY(-10px) rotate(0deg); }
    100% { transform: translateY(100vh) rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Balloon game
let balloonCount = 0;
const requiredBalloons = 5;

function initGame() {
  balloonCount = 0;
  updateScore();
  
  // Clear any existing balloons
  const container = document.getElementById('balloon-container');
  container.innerHTML = '';
  
  // Create balloons
  createBalloons();
}

function createBalloons() {
  const container = document.getElementById('balloon-container');
  const colors = ['#ff6b9d', '#9d65c9', '#5d54a4', '#f3a0c3', '#fdcb6e'];
  
  // Create 10 balloons
  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    // Random properties
    const left = Math.random() * 90 + 5; // 5-95%
    const delay = Math.random() * 5; // 0-5s delay
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    balloon.style.left = `${left}%`;
    balloon.style.backgroundColor = color;
    balloon.style.animationDelay = `${delay}s`;
    
    // Pop event
    balloon.addEventListener('click', function() {
      popBalloon(balloon);
    });
    
    container.appendChild(balloon);
  }
}

function popBalloon(balloon) {
  // Pop animation
  balloon.style.transform = 'scale(1.5)';
  balloon.style.opacity = '0';
  
  // Play pop sound
  const popSound = new Audio('data:audio/wav;base64,UklGRl9vAAAXRklNQVRFWEFGSUZNQTEuMiBzcGVjaWZpY2F0aW9uAABJTkZPSVNGVA0KAABJTkZPSVNGVENvcHlyaWdodCCpIDIwMDQgYnkgTWFyY28gVHJldmlzYW4AAExJU1R+AAAASU5GT0lDUkQNAAAASU5GT0lDT1BZcmlnaHQgqSAyMDA0IGJ5IE1hcmNvIFRyZXZpc2FuAElORk9JTkFNUG9wAElORk9JQVJUTWFyY28gVHJldmlzYW4ASU5GT0lDT00ASU5GT0lTRlQNAAAAZGF0YSB2AAAA5/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf49/j3+Pf ```
  )
  // Remove after 1 second
  setTimeout(() => {
    balloon.remove();
  }, 1000);
  
  // Increment count
  balloonCount++;
  updateScore();
  
  // Check if game is complete
  if (balloonCount >= requiredBalloons) {
    setTimeout(() => {
      nextPage('game', 'final');
      displayAnswers();
    }, 1500);
  }
}

function updateScore() {
  document.getElementById('score').textContent = `Balloons: ${balloonCount}/${requiredBalloons}`;
}

// Display user answers on final page
function displayAnswers() {
  const answersList = document.getElementById('answers-list');
  answersList.innerHTML = '';
  
  // Create list items for each answer
  for (const [question, answer] of Object.entries(userAnswers)) {
    const li = document.createElement('li');
    
    let questionText = '';
    if (question === 'q1') {
      questionText = 'Your favorite color';
    } else if (question === 'q2') {
      questionText = 'Your favorite thing about us';
    } else if (question === 'q3') {
      questionText = 'Going on a date';
    }
    
    li.textContent = `${questionText}: ${answer}`;
    answersList.appendChild(li);
  }
}

// Restart the experience
function restart() {
  // Reset answers
  Object.keys(userAnswers).forEach(key => delete userAnswers[key]);
  
  // Go back to landing page
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById('landing').classList.add('active');
  
  // Reset balloon count
  balloonCount = 0;
}