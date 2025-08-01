/* ================================================
   DHRUV'S SPACE ADVENTURE - INTERACTIVE JAVASCRIPT
   Space-themed, Game-like, Modern Functionality
   ================================================ */

// Global variables
let currentFactIndex = 0;
let factRotationInterval;
let musicEnabled = false;
let surpriseUnlocked = false;

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeStarfield();
    initializeCursor();
    initializeInteractions();
    initializeTabs();
    initializeModal();
    initializeGuestbook();
    initializeScrollEffects();
    
    // Easter egg: Unlock surprise after 5 seconds
    setTimeout(() => {
        surpriseUnlocked = true;
        console.log('🎉 Surprise unlocked! Click the surprise button! 🎉');
    }, 5000);
});

// ===== NAVIGATION SYSTEM =====
function initializeNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== STARFIELD ANIMATION =====
function initializeStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    
    // Create additional twinkling stars
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = getRandomStarColor();
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s linear infinite`;
        star.style.animationDelay = Math.random() * 2 + 's';
        starfield.appendChild(star);
    }
}

function getRandomStarColor() {
    const colors = [
        'rgba(112, 161, 215, 0.8)',
        'rgba(161, 222, 147, 0.6)',
        'rgba(247, 244, 139, 0.7)',
        'rgba(244, 124, 124, 0.5)',
        '#FFFFFF'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ===== CUSTOM CURSOR =====
function initializeCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (!cursor || !cursorTrail) {
        console.log('Custom cursor elements not found, using default cursor');
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    // Show cursors initially
    cursor.style.opacity = '1';
    cursorTrail.style.opacity = '0.8';
    
    // Hide default cursor only if custom cursor is working
    document.body.style.cursor = 'none';
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursor.style.opacity = '1';
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorTrail.style.opacity = '0';
    });
    
    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorTrail.style.opacity = '0.8';
    });
    
    // Smooth trail animation
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('button, a, .about-card, .interest-card, .dream-card, .pill, .power, .book-card, .weekend-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = '#F7F48B';
            cursor.style.borderColor = '#70A1D7';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = '#70A1D7';
            cursor.style.borderColor = '#F7F48B';
        });
    });
    
    console.log('✨ Custom cursor initialized!');
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractions() {
    // Music toggle
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
    
    // Surprise button
    const surpriseBtn = document.getElementById('surpriseBtn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', triggerSurprise);
    }
    
    // Power hover effects
    const powers = document.querySelectorAll('.power');
    powers.forEach(power => {
        power.addEventListener('mouseenter', () => {
            power.style.transform = 'scale(1.1) rotate(5deg)';
            playSound('hover');
        });
        
        power.addEventListener('mouseleave', () => {
            power.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Book card interactions
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('click', () => {
            const bookTitle = card.querySelector('h4').textContent;
            showBookQuote(bookTitle);
        });
    });
    
    // Initialize rotating fun facts
    initializeFunFactsRotation();
}

function toggleMusic() {
    musicEnabled = !musicEnabled;
    const musicIcon = document.querySelector('.music-icon');
    
    if (musicEnabled) {
        musicIcon.textContent = '🎵';
        playBackgroundMusic();
        showNotification('🎵 Space music activated!');
    } else {
        musicIcon.textContent = '🔇';
        stopBackgroundMusic();
        showNotification('🔇 Music paused');
    }
}

function playBackgroundMusic() {
    // Create and play a simple background tone
    // In a real implementation, you'd load an audio file
    console.log('🎵 Playing cosmic background music...');
}

function stopBackgroundMusic() {
    console.log('🔇 Music stopped');
}

function triggerSurprise() {
    if (!surpriseUnlocked) {
        showNotification('🚀 Surprise not unlocked yet! Explore more...');
        return;
    }
    
    const modal = document.getElementById('surpriseModal');
    if (modal) {
        modal.classList.add('active');
        startFunFactsCarousel();
        playSound('surprise');
        
        // Add sparkle effect
        createSparkleEffect();
    }
}

function createSparkleEffect() {
    const sparkles = ['✨', '⭐', '🌟', '💫', '🎆'];
    
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.fontSize = '2rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10001';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.animation = `sparkle-fall 3s ease-out forwards`;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
}

// Add sparkle animation to CSS dynamically
const sparkleCSS = `
@keyframes sparkle-fall {
    0% { 
        opacity: 1; 
        transform: translateY(0) rotate(0deg) scale(1); 
    }
    100% { 
        opacity: 0; 
        transform: translateY(200px) rotate(360deg) scale(0.5); 
    }
}`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// ===== TABS SYSTEM =====
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Play tab switch sound
            playSound('tab');
            
            // Add visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ===== MODAL SYSTEM =====
function initializeModal() {
    const modal = document.getElementById('surpriseModal');
    const closeBtn = document.querySelector('.close-surprise');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSurprise);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeSurprise();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeSurprise();
        }
    });
}

function closeSurprise() {
    const modal = document.getElementById('surpriseModal');
    if (modal) {
        modal.classList.remove('active');
        stopFunFactsCarousel();
    }
}

function startFunFactsCarousel() {
    const facts = document.querySelectorAll('.fun-fact');
    if (facts.length === 0) return;
    
    let currentIndex = 0;
    
    // Show first fact
    facts[currentIndex].classList.add('active');
    
    factRotationInterval = setInterval(() => {
        // Hide current fact
        facts[currentIndex].classList.remove('active');
        
        // Move to next fact
        currentIndex = (currentIndex + 1) % facts.length;
        
        // Show next fact
        facts[currentIndex].classList.add('active');
    }, 3000);
}

function stopFunFactsCarousel() {
    if (factRotationInterval) {
        clearInterval(factRotationInterval);
        factRotationInterval = null;
    }
    
    // Hide all facts
    const facts = document.querySelectorAll('.fun-fact');
    facts.forEach(fact => fact.classList.remove('active'));
}

// ===== GUESTBOOK SYSTEM =====
function initializeGuestbook() {
    const form = document.getElementById('guestbookForm');
    
    if (form) {
        form.addEventListener('submit', handleGuestbookSubmission);
    }
    
    // Load existing messages (in a real app, this would be from a database)
    loadSampleMessages();
}

function handleGuestbookSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const message = formData.get('message');
    const planet = formData.get('planet') || 'Earth';
    
    if (name && message) {
        addMessageToGuestbook(name, message, planet);
        e.target.reset();
        showNotification('🚀 Message sent to space station!');
        playSound('success');
    }
}

function addMessageToGuestbook(name, message, planet) {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;
    
    const messageCard = document.createElement('div');
    messageCard.className = 'message-card';
    messageCard.innerHTML = `
        <div class="message-header">
            <span class="visitor-name">🚀 ${name}</span>
            <span class="visitor-planet">From: ${planet}</span>
        </div>
        <div class="message-content">
            "${message}"
        </div>
    `;
    
    // Add to the top of the container
    messagesContainer.insertBefore(messageCard, messagesContainer.firstChild);
    
    // Animate in
    messageCard.style.opacity = '0';
    messageCard.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        messageCard.style.transition = 'all 0.5s ease';
        messageCard.style.opacity = '1';
        messageCard.style.transform = 'translateY(0)';
    }, 100);
}

function loadSampleMessages() {
    const sampleMessages = [
        { name: 'Space Captain Alex', message: "Hey Dhruv! Your website is so cool! I love cricket too and Wings of Fire is amazing! Keep being awesome! 🌟", planet: 'Planet Awesome' }
    ];
    
    // Don't add samples if there are already messages
    const messagesContainer = document.getElementById('messagesContainer');
    if (messagesContainer && messagesContainer.children.length <= 1) {
        sampleMessages.forEach(msg => {
            // Don't add if it's the sample message already in HTML
            if (!messagesContainer.querySelector('.sample')) {
                addMessageToGuestbook(msg.name, msg.message, msg.planet);
            }
        });
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Parallax effect for floating elements
    window.addEventListener('scroll', handleParallaxScroll);
    
    // Reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const elementsToObserve = document.querySelectorAll('.about-card, .interest-card, .dream-card, .weekend-card, .book-card');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function handleParallaxScroll() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-planets, .floating-emojis, .cosmic-particles');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showBookQuote(bookTitle) {
    const quotes = {
        'Wings of Fire': "🐉 Dragons are the coolest creatures ever! They're brave, magical, and each one is unique!",
        'Dog Man Series': "🐕 Dog Man teaches us that being different makes you special and heroic!",
        'The Wild Robot': "🤖 Robots can have hearts too, and nature is the best teacher of all!",
        'Last Kids on Earth': "🧟 Even in tough times, friendship and courage can save the day!"
    };
    
    const quote = quotes[bookTitle] || `📚 ${bookTitle} is an amazing book that takes me on incredible adventures!`;
    showNotification(quote);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #70A1D7, #A1DE93);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 2rem;
        box-shadow: 0 0 20px rgba(112, 161, 215, 0.4);
        z-index: 10000;
        font-weight: 600;
        font-family: 'Space Grotesk', sans-serif;
        max-width: 300px;
        word-wrap: break-word;
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 3s forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Add notification animations to CSS
const notificationCSS = `
@keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
}

@keyframes fadeInUp {
    from { 
        opacity: 0; 
        transform: translateY(30px); 
    }
    to { 
        opacity: 1; 
        transform: translateY(0); 
    }
}
`;

const notificationStyle = document.createElement('style');
notificationStyle.textContent = notificationCSS;
document.head.appendChild(notificationStyle);

function playSound(soundType) {
    // In a real implementation, you'd use actual audio files
    // For now, we'll use console logs and visual feedback
    switch (soundType) {
        case 'hover':
            console.log('🔊 Hover sound: *boop*');
            break;
        case 'click':
            console.log('🔊 Click sound: *beep*');
            break;
        case 'tab':
            console.log('🔊 Tab switch: *whoosh*');
            break;
        case 'surprise':
            console.log('🔊 Surprise sound: *ta-da!*');
            break;
        case 'success':
            console.log('🔊 Success sound: *ding*');
            break;
        default:
            console.log('🔊 Generic sound effect');
    }
}

function initializeFunFactsRotation() {
    // This could be expanded to rotate facts in the hero section or elsewhere
    console.log('🎲 Fun facts system initialized');
}

// ===== GLOBAL HELPER FUNCTIONS =====
// These functions are called by onclick handlers in HTML

window.scrollToSection = scrollToSection;

window.triggerSurprise = triggerSurprise;

window.closeSurprise = closeSurprise;

window.toggleMusic = function() {
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.click();
    }
};

// ===== EASTER EGGS & SPECIAL EFFECTS =====

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerKonamiEasterEgg();
        konamiCode = [];
    }
});

function triggerKonamiEasterEgg() {
    showNotification('🎮 KONAMI CODE ACTIVATED! You found the secret! 🦁⚡');
    
    // Turn Dhruv into a temporary elemental lion
    const astronaut = document.querySelector('.astronaut-body');
    if (astronaut) {
        const originalContent = astronaut.textContent;
        astronaut.textContent = '🦁⚡';
        astronaut.style.fontSize = '10rem';
        astronaut.style.animation = 'dream-bounce 0.5s ease-in-out infinite';
        
        setTimeout(() => {
            astronaut.textContent = originalContent;
            astronaut.style.fontSize = '8rem';
            astronaut.style.animation = 'gentle-float 4s ease-in-out infinite';
        }, 5000);
    }
    
    // Add special effects
    createElementalEffects();
}

function createElementalEffects() {
    const elements = ['🔥', '💧', '🌪️', '🌍', '⚡'];
    
    for (let i = 0; i < 20; i++) {
        const effect = document.createElement('div');
        effect.textContent = elements[Math.floor(Math.random() * elements.length)];
        effect.style.position = 'fixed';
        effect.style.fontSize = '3rem';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '10001';
        effect.style.left = Math.random() * window.innerWidth + 'px';
        effect.style.top = Math.random() * window.innerHeight + 'px';
        effect.style.animation = `elemental-float 4s ease-out forwards`;
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 4000);
    }
}

// Add elemental effects animation
const elementalCSS = `
@keyframes elemental-float {
    0% { 
        opacity: 1; 
        transform: translateY(0) rotate(0deg) scale(1); 
    }
    50% {
        opacity: 0.8;
        transform: translateY(-100px) rotate(180deg) scale(1.2);
    }
    100% { 
        opacity: 0; 
        transform: translateY(-200px) rotate(360deg) scale(0.5); 
    }
}`;

const elementalStyle = document.createElement('style');
elementalStyle.textContent = elementalCSS;
document.head.appendChild(elementalStyle);

// ===== PERFORMANCE OPTIMIZATION =====

// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(handleParallaxScroll, 16)); // ~60fps
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// ===== INITIALIZATION COMPLETE =====
console.log('🚀 Dhruv\'s Space Adventure - All systems online! 🌟');
console.log('💡 Try the Konami Code for a special surprise! ↑↑↓↓←→←→BA');
console.log('🎵 Click the music button to enable space tunes!');
console.log('✨ Click the surprise button after 5 seconds for fun facts!');

// Add a fun loading message
if (document.readyState === 'loading') {
    console.log('🌌 Loading space adventure...');
} else {
    console.log('🎯 Space adventure ready to explore!');