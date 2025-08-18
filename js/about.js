// About page specific JavaScript functionality
console.log('About.js file loaded!');
alert('About.js is loading...');

// Simple test function
window.testChess = function() {
    alert('Test function called!');
    console.log('Test function executed');
    
    // Try to call the actual chess function
    try {
        if (typeof window.openChessGame === 'function') {
            alert('openChessGame function exists, calling it...');
            window.openChessGame();
        } else {
            alert('openChessGame function does not exist!');
        }
    } catch (e) {
        alert('Error calling chess function: ' + e.message);
    }
};

let currentFactIndex = 0;
const totalFacts = 5;

// Chess game variables
let chessBoard = [];
let selectedSquare = null;
let currentPlayer = 'white';
let gameHistory = [];
let isGameActive = true;

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

// ===== CHESS GAME FUNCTIONALITY =====

// Make sure the function is globally available
window.openChessGame = function() {
    console.log('Chess game opening from window...');
    alert('Chess game starting from window!');
    
    // Basic fallback test
    if (typeof document === 'undefined') {
        alert('Document not available!');
        return;
    }
    
    const modal = document.getElementById('chessGameModal');
    if (!modal) {
        console.error('Chess modal not found!');
        alert('Chess modal not found! ID: chessGameModal');
        
        // Let's try to find any modal
        const allModals = document.querySelectorAll('[id*="chess"]');
        console.log('Found chess elements:', allModals.length);
        allModals.forEach(el => console.log('Element:', el.id, el.tagName));
        return;
    }
    
    console.log('Modal found, showing...');
    modal.style.display = 'block';
    
    try {
        initializeChessBoard();
        renderChessBoard();
        updateGameStatus("Your turn! Click a white piece to move.");
        currentPlayer = 'white';
        isGameActive = true;
    } catch (e) {
        console.error('Chess initialization error:', e);
        alert('Chess initialization error: ' + e.message);
    }
    
    try {
        playSound('click');
    } catch (e) {
        console.log('playSound error:', e);
    }
};

// Chess piece definitions
const pieces = {
    'white': {
        'king': '♔', 'queen': '♕', 'rook': '♖', 'bishop': '♗', 'knight': '♘', 'pawn': '♙'
    },
    'black': {
        'king': '♚', 'queen': '♛', 'rook': '♜', 'bishop': '♝', 'knight': '♞', 'pawn': '♟'
    }
};

// Initialize chess board
function initializeChessBoard() {
    chessBoard = [
        ['♜','♞','♝','♛','♚','♝','♞','♜'],
        ['♟','♟','♟','♟','♟','♟','♟','♟'],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        ['♙','♙','♙','♙','♙','♙','♙','♙'],
        ['♖','♘','♗','♕','♔','♗','♘','♖']
    ];
}

// Open chess game modal
function openChessGame() {
    console.log('Chess game opening...');
    alert('Chess game starting!'); // Temporary debug alert
    const modal = document.getElementById('chessGameModal');
    if (!modal) {
        console.error('Chess modal not found!');
        alert('Chess modal not found!');
        return;
    }
    modal.style.display = 'block';
    initializeChessBoard();
    renderChessBoard();
    updateGameStatus("Your turn! Click a white piece to move.");
    currentPlayer = 'white';
    isGameActive = true;
    try {
        playSound('click');
    } catch (e) {
        console.log('playSound error:', e);
    }
}

// Close chess game modal
window.closeChessGame = function() {
    const modal = document.getElementById('chessGameModal');
    modal.style.display = 'none';
    try {
        playSound('click');
    } catch (e) {
        console.log('playSound error:', e);
    }
};

// Render the chess board
function renderChessBoard() {
    const boardElement = document.getElementById('gameChessBoard');
    boardElement.innerHTML = '';
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = `chess-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
            square.dataset.row = row;
            square.dataset.col = col;
            square.onclick = () => handleSquareClick(row, col);
            
            if (chessBoard[row][col]) {
                const piece = document.createElement('div');
                piece.className = 'chess-piece-game';
                piece.textContent = chessBoard[row][col];
                square.appendChild(piece);
            }
            
            boardElement.appendChild(square);
        }
    }
}

// Handle square clicks
function handleSquareClick(row, col) {
    if (!isGameActive || currentPlayer !== 'white') return;
    
    const piece = chessBoard[row][col];
    
    if (selectedSquare) {
        // Try to move piece
        if (isValidMove(selectedSquare.row, selectedSquare.col, row, col)) {
            makeMove(selectedSquare.row, selectedSquare.col, row, col);
            selectedSquare = null;
            clearHighlights();
            
            if (currentPlayer === 'black') {
                setTimeout(() => makeAIMove(), 500);
            }
        } else {
            // Select new piece or deselect
            selectedSquare = null;
            clearHighlights();
            if (piece && isPieceWhite(piece)) {
                selectSquare(row, col);
            }
        }
    } else {
        // Select piece
        if (piece && isPieceWhite(piece)) {
            selectSquare(row, col);
        }
    }
}

// Select a square
function selectSquare(row, col) {
    selectedSquare = { row, col };
    const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    square.classList.add('selected');
    playSound('hover');
}

// Clear highlights
function clearHighlights() {
    document.querySelectorAll('.chess-square').forEach(square => {
        square.classList.remove('selected', 'valid-move');
    });
}

// Check if piece is white
function isPieceWhite(piece) {
    return '♔♕♖♗♘♙'.includes(piece);
}

// Check if piece is black
function isPieceBlack(piece) {
    return '♚♛♜♝♞♟'.includes(piece);
}

// Basic move validation
function isValidMove(fromRow, fromCol, toRow, toCol) {
    if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return false;
    if (fromRow === toRow && fromCol === toCol) return false;
    
    const piece = chessBoard[fromRow][fromCol];
    const target = chessBoard[toRow][toCol];
    
    // Can't capture own piece
    if (target && isPieceWhite(piece) === isPieceWhite(target)) return false;
    
    // Basic piece movement (simplified)
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    
    if (piece === '♙') { // White pawn
        if (fromCol === toCol) {
            if (fromRow === 6 && toRow === 4 && !target && !chessBoard[5][toCol]) return true;
            if (toRow === fromRow - 1 && !target) return true;
        } else if (colDiff === 1 && toRow === fromRow - 1 && target && isPieceBlack(target)) {
            return true;
        }
    } else if (piece === '♟') { // Black pawn
        if (fromCol === toCol) {
            if (fromRow === 1 && toRow === 3 && !target && !chessBoard[2][toCol]) return true;
            if (toRow === fromRow + 1 && !target) return true;
        } else if (colDiff === 1 && toRow === fromRow + 1 && target && isPieceWhite(target)) {
            return true;
        }
    } else if ('♖♜'.includes(piece)) { // Rook
        return (rowDiff === 0 || colDiff === 0) && isPathClear(fromRow, fromCol, toRow, toCol);
    } else if ('♗♝'.includes(piece)) { // Bishop
        return rowDiff === colDiff && isPathClear(fromRow, fromCol, toRow, toCol);
    } else if ('♕♛'.includes(piece)) { // Queen
        return (rowDiff === 0 || colDiff === 0 || rowDiff === colDiff) && isPathClear(fromRow, fromCol, toRow, toCol);
    } else if ('♔♚'.includes(piece)) { // King
        return rowDiff <= 1 && colDiff <= 1;
    } else if ('♘♞'.includes(piece)) { // Knight
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }
    
    return false;
}

// Check if path is clear for sliding pieces
function isPathClear(fromRow, fromCol, toRow, toCol) {
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
    
    let row = fromRow + rowStep;
    let col = fromCol + colStep;
    
    while (row !== toRow || col !== toCol) {
        if (chessBoard[row][col]) return false;
        row += rowStep;
        col += colStep;
    }
    
    return true;
}

// Make a move
function makeMove(fromRow, fromCol, toRow, toCol) {
    const piece = chessBoard[fromRow][fromCol];
    const captured = chessBoard[toRow][toCol];
    
    chessBoard[toRow][toCol] = piece;
    chessBoard[fromRow][fromCol] = null;
    
    renderChessBoard();
    
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    
    if (captured) {
        playSound('success');
        updateGameStatus(captured ? `Captured ${captured}! ` : '' + (currentPlayer === 'white' ? "Your turn!" : "AI is thinking..."));
    } else {
        playSound('click');
        updateGameStatus(currentPlayer === 'white' ? "Your turn!" : "AI is thinking...");
    }
}

// Simple AI move
function makeAIMove() {
    if (!isGameActive || currentPlayer !== 'black') return;
    
    const possibleMoves = [];
    
    // Find all possible AI moves
    for (let fromRow = 0; fromRow < 8; fromRow++) {
        for (let fromCol = 0; fromCol < 8; fromCol++) {
            const piece = chessBoard[fromRow][fromCol];
            if (piece && isPieceBlack(piece)) {
                for (let toRow = 0; toRow < 8; toRow++) {
                    for (let toCol = 0; toCol < 8; toCol++) {
                        if (isValidMove(fromRow, fromCol, toRow, toCol)) {
                            const moveValue = evaluateMove(fromRow, fromCol, toRow, toCol);
                            possibleMoves.push({
                                from: { row: fromRow, col: fromCol },
                                to: { row: toRow, col: toCol },
                                value: moveValue
                            });
                        }
                    }
                }
            }
        }
    }
    
    if (possibleMoves.length > 0) {
        // Sort by move value and pick the best one
        possibleMoves.sort((a, b) => b.value - a.value);
        const bestMove = possibleMoves[0];
        
        makeMove(bestMove.from.row, bestMove.from.col, bestMove.to.row, bestMove.to.col);
    } else {
        updateGameStatus("Game Over! No valid moves for AI.");
        isGameActive = false;
    }
}

// Evaluate move value for AI
function evaluateMove(fromRow, fromCol, toRow, toCol) {
    const target = chessBoard[toRow][toCol];
    let value = Math.random() * 10; // Add some randomness
    
    // Prioritize captures
    if (target) {
        const pieceValues = { '♙': 1, '♘': 3, '♗': 3, '♖': 5, '♕': 9, '♔': 100 };
        value += pieceValues[target] || 1;
    }
    
    // Prefer center control
    if (toRow >= 2 && toRow <= 5 && toCol >= 2 && toCol <= 5) {
        value += 2;
    }
    
    return value;
}

// Start new game
window.newGame = function() {
    initializeChessBoard();
    renderChessBoard();
    currentPlayer = 'white';
    isGameActive = true;
    selectedSquare = null;
    gameHistory = [];
    updateGameStatus("New game started! Your turn!");
    try {
        playSound('success');
    } catch (e) {
        console.log('playSound error:', e);
    }
};

// Undo move (simplified)
window.undoMove = function() {
    updateGameStatus("Undo feature coming soon!");
    try {
        playSound('click');
    } catch (e) {
        console.log('playSound error:', e);
    }
};

// Get hint
window.getHint = function() {
    const hints = [
        "Control the center squares early!",
        "Develop your knights before bishops",
        "Castle early to keep your king safe",
        "Don't move the same piece twice in opening",
        "Look for tactics like forks and pins!",
        "Connect your rooks",
        "Think before you move!"
    ];
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    updateGameStatus(`💡 Hint: ${randomHint}`);
    try {
        playSound('click');
    } catch (e) {
        console.log('playSound error:', e);
    }
};

// Update game status
function updateGameStatus(message) {
    const statusElement = document.getElementById('gameStatus');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('chessGameModal');
    if (event.target === modal) {
        closeChessGame();
    }
}