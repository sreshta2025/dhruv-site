// About page specific JavaScript functionality

let currentFactIndex = 0;
const totalFacts = 5;

// Avatar customization
const expressions = ['😊', '😄', '🤔', '😎', '🤗', '😇', '🧠', '🎯'];
let currentExpression = 0;

function changeExpression() {
    playSound('click');
    const smileElement = document.getElementById('smile');
    if (smileElement) {
        currentExpression = (currentExpression + 1) % expressions.length;
        smileElement.textContent = expressions[currentExpression];
        smileElement.style.animation = 'none';
        smileElement.offsetHeight; // Trigger reflow
        smileElement.style.animation = 'popIn 0.5s ease-out';
    }
}

function toggleHat() {
    playSound('click');
    const hatElement = document.getElementById('hat');
    if (hatElement) {
        if (hatElement.style.opacity === '1') {
            hatElement.style.opacity = '0';
            hatElement.style.transform = 'translateX(-50%) scale(0)';
        } else {
            hatElement.style.opacity = '1';
            hatElement.style.transform = 'translateX(-50%) scale(1)';
            hatElement.style.animation = 'popIn 0.5s ease-out';
        }
    }
}

function toggleGlasses() {
    playSound('click');
    const glassesElement = document.getElementById('glasses');
    if (glassesElement) {
        if (glassesElement.style.opacity === '1') {
            glassesElement.style.opacity = '0';
            glassesElement.style.transform = 'translateX(-50%) scale(0)';
        } else {
            glassesElement.style.opacity = '1';
            glassesElement.style.transform = 'translateX(-50%) scale(1)';
            glassesElement.style.animation = 'popIn 0.5s ease-out';
        }
    }
}

// Chess board interaction
function initializeChessBoard() {
    const chessBoard = document.getElementById('chessBoard');
    if (chessBoard) {
        const pieces = chessBoard.querySelectorAll('.chess-piece');
        pieces.forEach((piece, index) => {
            piece.addEventListener('click', function() {
                playSound('click');
                
                // Animate piece movement
                piece.style.transform = 'scale(1.2) rotate(360deg)';
                piece.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    piece.style.transform = '';
                }, 500);
                
                // Show chess tip
                showChessTip();
            });
        });
    }
}

function showChessTip() {
    const tips = [
        "Control the center squares early in the game! 🎯",
        "Develop your knights before bishops! ♞",
        "Castle early to keep your king safe! 🏰",
        "Don't bring your queen out too early! 👑",
        "Always look for checks, captures, and threats! ⚡",
        "Connect your rooks for maximum power! 🔗",
        "Think about your opponent's threats! 🤔",
        "Practice tactical puzzles daily! 🧩"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    showMessage(randomTip, 'info');
}

// Cricket game
function playCricket() {
    playSound('click');
    
    const bat = document.getElementById('cricketBat');
    const ball = document.getElementById('cricketBall');
    
    if (bat && ball) {
        // Animate cricket bat swing
        bat.classList.add('swinging');
        
        setTimeout(() => {
            // Animate ball movement
            ball.classList.add('hit');
            playSound('success');
            
            // Show score
            showMessage('🏏 Great shot! You scored 6 runs!', 'success');
            
            // Reset animations
            setTimeout(() => {
                bat.classList.remove('swinging');
                ball.classList.remove('hit');
                ball.style.opacity = '1';
                ball.style.transform = 'translateX(0) translateY(0)';
            }, 1000);
        }, 300);
    }
}

// YouTube channel functions
function visitYouTube() {
    playSound('click');
    showMessage('🎬 Opening RoyalIQFun channel! Thanks for your support!', 'success');
    
    // In a real implementation, this would open the YouTube channel
    setTimeout(() => {
        // window.open('https://youtube.com/channel/YOUR_CHANNEL_ID', '_blank');
        showMessage('YouTube channel would open here! 📺', 'info');
    }, 1000);
}

// Rubik's cube solver
function solveCube() {
    playSound('click');
    
    const cube = document.getElementById('rubiksCube');
    const cubeFace = cube.querySelector('.cube-face');
    
    if (cubeFace) {
        cubeFace.classList.add('solving');
        
        // Animate cube squares changing colors
        const squares = cubeFace.querySelectorAll('.cube-square');
        const colors = ['red', 'white', 'blue', 'yellow', 'green', 'orange'];
        
        squares.forEach((square, index) => {
            setTimeout(() => {
                square.className = `cube-square ${colors[index % colors.length]}`;
            }, index * 200);
        });
        
        setTimeout(() => {
            playSound('success');
            showMessage('🧩 Cube solved! That was amazing!', 'success');
            
            // Reset cube
            setTimeout(() => {
                cubeFace.classList.remove('solving');
                resetCube();
            }, 1000);
        }, 2000);
    }
}

function resetCube() {
    const squares = document.querySelectorAll('.cube-square');
    const originalColors = ['red', 'white', 'blue', 'yellow', 'green', 'orange', 'red', 'white', 'blue'];
    
    squares.forEach((square, index) => {
        square.className = `cube-square ${originalColors[index]}`;
    });
}

// Fun facts carousel
function nextFact() {
    playSound('click');
    
    const currentCard = document.querySelector('.fact-card.active');
    const allCards = document.querySelectorAll('.fact-card');
    const indicators = document.querySelectorAll('.indicator');
    
    if (currentCard) {
        currentCard.classList.remove('active');
    }
    
    currentFactIndex = (currentFactIndex + 1) % totalFacts;
    
    if (allCards[currentFactIndex]) {
        allCards[currentFactIndex].classList.add('active');
    }
    
    // Update indicators
    indicators.forEach(indicator => indicator.classList.remove('active'));
    if (indicators[currentFactIndex]) {
        indicators[currentFactIndex].classList.add('active');
    }
}

function previousFact() {
    playSound('click');
    
    const currentCard = document.querySelector('.fact-card.active');
    const allCards = document.querySelectorAll('.fact-card');
    const indicators = document.querySelectorAll('.indicator');
    
    if (currentCard) {
        currentCard.classList.remove('active');
    }
    
    currentFactIndex = (currentFactIndex - 1 + totalFacts) % totalFacts;
    
    if (allCards[currentFactIndex]) {
        allCards[currentFactIndex].classList.add('active');
    }
    
    // Update indicators
    indicators.forEach(indicator => indicator.classList.remove('active'));
    if (indicators[currentFactIndex]) {
        indicators[currentFactIndex].classList.add('active');
    }
}

// Auto-rotate facts
function startFactRotation() {
    setInterval(() => {
        nextFact();
    }, 5000); // Change fact every 5 seconds
}

// Initialize about page features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chess board
    initializeChessBoard();
    
    // Start fact rotation
    startFactRotation();
    
    // Add click handlers for indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            playSound('click');
            
            // Remove active class from all cards and indicators
            document.querySelectorAll('.fact-card').forEach(card => card.classList.remove('active'));
            document.querySelectorAll('.indicator').forEach(ind => ind.classList.remove('active'));
            
            // Set active fact
            currentFactIndex = index;
            document.querySelectorAll('.fact-card')[index].classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Add hover effects to hobby cards
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.hobby-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.hobby-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
    
    // Add click effects to achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('click', function() {
            playSound('click');
            
            // Create celebration effect
            const badge = this.querySelector('.achievement-badge');
            if (badge) {
                badge.style.animation = 'none';
                badge.offsetHeight; // Trigger reflow
                badge.style.animation = 'bounce 0.5s ease';
            }
            
            // Show achievement details
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            showMessage(`🏆 ${title}: ${description}`, 'success');
        });
    });
    
    // Add progress bar animations
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 500);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Add personality trait animations
    const traits = document.querySelectorAll('.trait');
    traits.forEach((trait, index) => {
        trait.addEventListener('click', function() {
            playSound('click');
            
            this.style.transform = 'scale(1.2)';
            this.style.background = 'linear-gradient(45deg, #3b82f6, #8b5cf6)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.background = '';
            }, 500);
            
            // Show personality message
            const traitMessages = {
                'Creative': '🎨 I love making art and inventing new games!',
                'Smart': '🧠 I enjoy solving puzzles and learning new things!',
                'Friendly': '😊 I love making new friends and helping others!',
                'Curious': '🔍 I always ask questions and explore new ideas!',
                'Funny': '😄 I love making people laugh with jokes and stories!'
            };
            
            const traitText = this.textContent.split(' ')[1]; // Get trait name without emoji
            const message = traitMessages[traitText] || `${this.textContent} That's me!`;
            showMessage(message, 'info');
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            previousFact();
        } else if (e.key === 'ArrowRight') {
            nextFact();
        } else if (e.key === 'Enter' && e.target.classList.contains('action-btn')) {
            e.target.click();
        }
    });
    
    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });
    
    function handleGesture() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next fact
            nextFact();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous fact
            previousFact();
        }
    }
    
    // Add particle effects for goals
    const goalCards = document.querySelectorAll('.goal-card');
    goalCards.forEach(card => {
        card.addEventListener('click', function() {
            playSound('click');
            createGoalParticles(this);
        });
    });
});

function createGoalParticles(element) {
    const particles = ['⭐', '🎯', '🚀', '💫', '✨'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            animation: goalParticle 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
    }
}

// Add goal particle animation
const goalParticleStyle = document.createElement('style');
goalParticleStyle.textContent = `
    @keyframes goalParticle {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(goalParticleStyle);