// Main JavaScript functionality for Dhruv's Amazing World

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize stats counter
    initializeStatsCounter();
    
    // Initialize sound effects
    initializeSoundEffects();
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize animations when elements come into view
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.feature-card, .access-card, .hobby-card, .achievement-card, .goal-card').forEach(el => {
        observer.observe(el);
    });
}

// Stats counter animation
function initializeStatsCounter() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
            
            // Add celebration animation
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        }
    }, 16);
}

// Sound effects system
let soundEnabled = true;
const sounds = {
    click: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUIBSuQ2eybTwkNUKzj67BdGAg7k9n1unEiBC13yO2WPAUPh8XynmAQBld4z+NaGBYqAB8iMjRBNGIRQiZfEjouKzMzOCssNBkyRBo0GEglZg5qGnEqTAsJRWUaXE1EHuHsHMDUDc2FfGsZEzCIWApSBJiNgJkCJkYMLxCJCQVQKCJBSRUOJDUFCUJLRkBfTloDGSM8NjMuUSQnOy8vMjRLCTAZXUVLFRQJTCQgIVJAOCk8OzJDTTAKMgwIUBEQHjlhF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiA='),
    success: new Audio('data:audio/wav;base64,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'),
    error: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUIBSuQ2eybTwkNUKzj67BdGAg7k9n1unEiBC13yO2WPAUPh8XynmAQBld4z+NaGBYqAB8iMjRBNGIRQiZfEjouKzMzOCssNBkyRBo0GEglZg5qGnEqTAsJRWUaXE1EHuHsHMDUDc2FfGsZEzCIWApSBJiNgJkCJkYMLxCJCQVQKCJBSRUOJDUFCUJLRkBfTloDGSM8NjMuUSQnOy8vMjRLCTAZXUVLFRQJTCQgIVJAOCk8OzJDTTAKMgwIUBEQHjlhF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLiFlF1o0NDUDlHAQJEMkGEgcQzJTLxwLQSJhRABRgmYPGQp5IkEQaBRrBRJANmNDFiELIxNRJBQQHWcBYCFDLkkCABokKylSAiIjLzgQYCcjIlE9BZhpCkCMWgEhKXgIYyxkGnoCUB0wQzUoIzgJKzAYLg==')
};

function initializeSoundEffects() {
    // Set volume for all sounds
    Object.values(sounds).forEach(sound => {
        sound.volume = 0.3;
    });
}

function playSound(soundName) {
    if (soundEnabled && sounds[soundName]) {
        sounds[soundName].currentTime = 0;
        sounds[soundName].play().catch(e => {
            // Ignore audio play errors (common in some browsers)
        });
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundButton = document.getElementById('soundToggle');
    if (soundButton) {
        soundButton.textContent = soundEnabled ? '🔊' : '🔇';
    }
}

// Homepage specific functions
function startAdventure() {
    playSound('click');
    // Add sparkle effect
    createSparkles();
    
    // Navigate to learning page after animation
    setTimeout(() => {
        window.location.href = 'pages/learning.html';
    }, 1000);
}

function showDailyChallenge() {
    playSound('click');
    const challengeSection = document.querySelector('.daily-features');
    if (challengeSection) {
        challengeSection.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight the brain buster card
        const brainBusterCard = document.querySelector('.brain-buster');
        if (brainBusterCard) {
            brainBusterCard.style.transform = 'scale(1.05)';
            brainBusterCard.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.3)';
            
            setTimeout(() => {
                brainBusterCard.style.transform = '';
                brainBusterCard.style.boxShadow = '';
            }, 2000);
        }
    }
}

function checkAnswer(button, isCorrect) {
    playSound('click');
    
    // Disable all option buttons
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(btn => {
        btn.disabled = true;
    });
    
    if (isCorrect) {
        button.classList.add('correct');
        playSound('success');
        showCelebration();
        
        // Show encouraging message
        setTimeout(() => {
            showMessage('🎉 Awesome! You got it right!', 'success');
        }, 500);
    } else {
        button.classList.add('incorrect');
        playSound('error');
        
        // Show the correct answer
        allOptions.forEach(btn => {
            if (btn.getAttribute('onclick').includes('true')) {
                btn.classList.add('correct');
            }
        });
        
        setTimeout(() => {
            showMessage('Good try! The correct answer is 17. Keep practicing!', 'info');
        }, 500);
    }
    
    // Reset after 3 seconds
    setTimeout(() => {
        allOptions.forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.disabled = false;
        });
    }, 3000);
}

function showIdiomExample() {
    playSound('click');
    showMessage('Example: "Break a leg in your school play tonight!" means "Good luck in your school play tonight!"', 'info');
}

function showMoreFacts() {
    playSound('click');
    const facts = [
        'A group of flamingos is called a "flamboyance"! 🦩',
        'Honey never spoils! Archaeologists have found honey in ancient Egyptian tombs that\'s still edible! 🍯',
        'A day on Venus is longer than its year! 🪐',
        'Bananas are berries, but strawberries aren\'t! 🍌',
        'The shortest war in history lasted only 38-45 minutes! ⚔️'
    ];
    
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    showMessage(randomFact, 'info');
}

function showMessage(text, type = 'info') {
    // Create message element
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.textContent = text;
    
    // Style the message
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-width: 300px;
        animation: slideInRight 0.5s ease-out;
        font-weight: 600;
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 4 seconds
    setTimeout(() => {
        message.style.animation = 'slideInRight 0.5s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 500);
    }, 4000);
}

function createSparkles() {
    const sparkleCount = 20;
    const colors = ['#fbbf24', '#3b82f6', '#ec4899', '#22c55e', '#8b5cf6'];
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = '✨';
        
        sparkle.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            animation: sparkleFloat 2s ease-out forwards;
        `;
        
        // Random position
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }
}

function showCelebration() {
    createSparkles();
    
    // Add celebration styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                transform: translateY(0) scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: translateY(-100px) scale(1) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-200px) scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes celebrate {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // Remove style after animation
    setTimeout(() => {
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 3000);
}

// Scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Space bar for start adventure
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const startButton = document.querySelector('.btn-primary');
        if (startButton && startButton.textContent.includes('Start Adventure')) {
            startButton.click();
        }
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const currentPage = window.location.pathname;
        const pages = ['index.html', 'about.html', 'learning.html', 'quizzes.html', 'youtube.html', 'friends.html'];
        
        // Navigation logic would go here
    }
});

// Add custom cursor for interactive elements
document.addEventListener('mousemove', (e) => {
    const interactiveElements = document.querySelectorAll('.btn, .access-card, .feature-card, .option-btn');
    let isOverInteractive = false;
    
    interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && 
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            isOverInteractive = true;
        }
    });
    
    document.body.style.cursor = isOverInteractive ? 'pointer' : 'default';
});

// Add page transition effects
function initializePageTransitions() {
    // Add fade-in effect to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
    
    // Add fade-out effect to links
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
    });
}

// Initialize page transitions
initializePageTransitions();

// Performance optimization - lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
lazyLoadImages();

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Adjust any layout calculations here
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile-specific adjustments
        document.body.classList.add('mobile-layout');
    } else {
        document.body.classList.remove('mobile-layout');
    }
});