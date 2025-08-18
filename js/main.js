/* ================================================
   DHRUV'S SPACE ADVENTURE - INTERACTIVE JAVASCRIPT
   Space-themed, Game-like, Modern Functionality
   ================================================ */

console.log('🚀 Main.js loading...');
console.log('📄 Current page:', window.location.pathname);

// Error handling for script loading
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    console.error('At line:', e.lineno, 'column:', e.colno);
});

// Global variables
let currentFactIndex = 0;
let factRotationInterval;
let musicEnabled = false;
let surpriseUnlocked = false;
let currentTheme = 'dark'; // Track current theme: 'dark', 'earth', 'countryside'

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeStarfield();
    initializeDarkMode();
    initializeInteractions();
    initializeTabs();
    initializeModal();
    initializeGuestbook();
    initializeScrollEffects();
    initializeChessGame();
    
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
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
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
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }
    
    // Handle navigation links and close mobile menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu when link is clicked
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
            
            const href = this.getAttribute('href');
            
            // If it's a hash link (same page), handle scrolling
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
            
            // Close mobile menu for all navigation
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
    
    // Update active nav link on page load and scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    // For separate pages, set active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        // Handle different cases
        if ((currentPage === 'index.html' || currentPage === '') && linkHref === 'index.html') {
            link.classList.add('active');
        } else if (linkHref === currentPage) {
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


// Create sparkles at specific position (for click effects)
function createSparklesAtPosition(x, y) {
    const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '🎆', '💥'];
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.transform = 'translate(-50%, -50%)';
        
        // Random direction and distance for burst effect
        const angle = (Math.PI * 2 * i) / 8;
        const distance = Math.random() * 100 + 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        sparkle.style.animation = `sparkle-burst 0.8s ease-out forwards`;
        sparkle.style.setProperty('--end-x', endX + 'px');
        sparkle.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractions() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    console.log('🌙 Dark mode toggle element:', darkModeToggle);
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            console.log('🌙 Button clicked!');
            toggleDarkMode();
        });
        console.log('🌙 Dark mode event listener added!');
    } else {
        console.error('❌ Dark mode toggle button not found!');
    }
    
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

// ===== THEME SYSTEM =====
function initializeDarkMode() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('currentTheme') || 'dark';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateDarkModeIcon();
}

function toggleDarkMode() {
    console.log('🌙 toggleDarkMode called! Current theme:', currentTheme);
    const darkModeIcon = document.querySelector('.dark-mode-icon');
    
    // Cycle through themes: dark → earth → countryside → dark
    if (currentTheme === 'dark') {
        currentTheme = 'earth';
        document.documentElement.setAttribute('data-theme', 'earth');
        if (darkModeIcon) darkModeIcon.textContent = '☀️';
        showNotification('☀️ Welcome to the sunny side! 🌍');
        triggerSunRise();
    } else if (currentTheme === 'earth') {
        currentTheme = 'countryside';
        document.documentElement.setAttribute('data-theme', 'countryside');
        if (darkModeIcon) darkModeIcon.textContent = '🏙️';
        showNotification('🏙️ Peaceful city night! 🌃');
        triggerCityEffect();
    } else {
        currentTheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        if (darkModeIcon) darkModeIcon.textContent = '🌙';
        showNotification('🌙 Back to space exploration! 🌌');
    }
    
    localStorage.setItem('currentTheme', currentTheme);
    console.log('🌙 Switched to theme:', currentTheme);
    playSound('tab');
}

function updateDarkModeIcon() {
    const darkModeIcon = document.querySelector('.dark-mode-icon');
    if (darkModeIcon) {
        if (currentTheme === 'dark') {
            darkModeIcon.textContent = '🌙';
        } else if (currentTheme === 'earth') {
            darkModeIcon.textContent = '☀️';
        } else if (currentTheme === 'countryside') {
            darkModeIcon.textContent = '🏙️';
        }
    }
}

function triggerSunRise() {
    // Create sun rising animation
    const sun = document.createElement('div');
    sun.className = 'rising-sun';
    sun.innerHTML = '☀️';
    sun.style.cssText = `
        position: fixed;
        font-size: 4rem;
        bottom: -100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        pointer-events: none;
        animation: sun-rising 3s ease-out forwards;
    `;
    
    document.body.appendChild(sun);
    
    // Remove sun after animation
    setTimeout(() => {
        sun.remove();
    }, 3000);
    
    // Add sun rays effect
    setTimeout(() => {
        createSunRays();
    }, 2800);
}

function createSunRays() {
    const rayParticles = ['✨', '🌟', '💫'];
    
    for (let i = 0; i < 8; i++) {
        const ray = document.createElement('div');
        ray.textContent = rayParticles[Math.floor(Math.random() * rayParticles.length)];
        ray.style.position = 'fixed';
        ray.style.fontSize = '2rem';
        ray.style.top = '50%';
        ray.style.left = '50%';
        ray.style.pointerEvents = 'none';
        ray.style.zIndex = '9999';
        ray.style.transform = `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-100px)`;
        ray.style.animation = `sun-rays 2s ease-out forwards`;
        ray.style.animationDelay = (i * 0.1) + 's';
        
        document.body.appendChild(ray);
        
        setTimeout(() => {
            ray.remove();
        }, 2500);
    }
}

function triggerCityEffect() {
    // Create city atmosphere effects with floating particles
    const cityParticles = ['✨', '💫', '🌟', '⭐'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.textContent = cityParticles[Math.floor(Math.random() * cityParticles.length)];
        particle.style.cssText = `
            position: fixed;
            font-size: 1.2rem;
            left: ${Math.random() * 100}%;
            top: ${20 + Math.random() * 40}%;
            pointer-events: none;
            z-index: 9999;
            color: #60A5FA;
            animation: city-atmosphere 5s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    // Add some warm window light effects
    for (let i = 0; i < 6; i++) {
        const light = document.createElement('div');
        light.textContent = '💡';
        light.style.cssText = `
            position: fixed;
            font-size: 1rem;
            left: ${10 + Math.random() * 80}%;
            bottom: ${30 + Math.random() * 20}%;
            pointer-events: none;
            z-index: 9998;
            color: #FFC107;
            animation: city-lights-flicker 3s ease-in-out infinite;
            animation-delay: ${Math.random() * 1}s;
        `;
        
        document.body.appendChild(light);
        
        setTimeout(() => {
            light.remove();
        }, 3000);
    }
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
}

@keyframes sparkle-burst {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
    100% {
        opacity: 0;
        transform: translate(calc(var(--end-x) - 50%), calc(var(--end-y) - 50%)) scale(0.3) rotate(720deg);
    }
}

@keyframes rocket-landing {
    0% {
        top: -100px;
        transform: translateX(-50%) rotate(0deg);
        opacity: 1;
    }
    80% {
        top: calc(100vh - 150px);
        transform: translateX(-50%) rotate(10deg);
    }
    100% {
        top: calc(100vh - 120px);
        transform: translateX(-50%) rotate(0deg);
        opacity: 1;
    }
}

@keyframes dust-cloud {
    0% {
        opacity: 0;
        transform: translateY(0) scale(0.5);
    }
    50% {
        opacity: 1;
        transform: translateY(-30px) scale(1.2);
    }
    100% {
        opacity: 0;
        transform: translateY(-60px) scale(0.8);
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

window.toggleDarkMode = function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.click();
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
console.log('🌙 Dark mode toggle should be working now!');

// Test function for debugging
window.testDarkMode = function() {
    console.log('🧪 Testing dark mode...');
    const button = document.getElementById('darkModeToggle');
    console.log('Button element:', button);
    if (button) {
        console.log('Clicking button...');
        button.click();
    } else {
        console.error('Button not found!');
    }
};

// Add a fun loading message

// Debug function to test city theme
window.testCity = function() {
    console.log('🏙️ Testing city night theme...');
    document.documentElement.setAttribute('data-theme', 'countryside');
    console.log('Applied city night theme');
};

window.getCurrentTheme = function() {
    return document.documentElement.getAttribute('data-theme');
};
if (document.readyState === 'loading') {
    console.log('🌌 Loading space adventure...');
} else {
    console.log('🎯 Space adventure ready to explore!');
}

// ===== CHESS GAME FUNCTIONALITY =====

// Chess game variables
let chessBoard = [];
let selectedSquare = null;
let currentPlayer = 'white';
let gameHistory = [];
let isGameActive = true;

// Chess piece definitions
const chessPieces = {
    'white': {
        'king': '♔', 'queen': '♕', 'rook': '♖', 'bishop': '♗', 'knight': '♘', 'pawn': '♙'
    },
    'black': {
        'king': '♚', 'queen': '♛', 'rook': '♜', 'bishop': '♝', 'knight': '♞', 'pawn': '♟'
    }
};

// Initialize chess game
function initializeChessGame() {
    console.log('🔮 Initializing chess game...');
}

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
    const modal = document.getElementById('chessGameModal');
    if (!modal) {
        console.error('Chess modal not found!');
        showNotification('🔧 Chess game not available on this page');
        return;
    }
    modal.style.display = 'block';
    initializeChessBoard();
    renderChessBoard();
    updateGameStatus("🎯 Your turn! Click a white piece to move.");
    currentPlayer = 'white';
    isGameActive = true;
    playSound('click');
    showNotification('♟️ Chess battle begins! May the best mind win! 🧠⚡');
    
    // Add opening celebration
    createGameStartParticles();
}

// Close chess game modal
function closeChessGame() {
    const modal = document.getElementById('chessGameModal');
    if (modal) {
        modal.style.display = 'none';
        playSound('click');
    }
}

// Render the chess board
function renderChessBoard() {
    const boardElement = document.getElementById('gameChessBoard');
    if (!boardElement) return;
    
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
    if (square) {
        square.classList.add('selected');
        playSound('hover');
        showValidMoves(row, col);
    }
}

// Show valid moves for selected piece
function showValidMoves(fromRow, fromCol) {
    clearValidMoves();
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (isValidMove(fromRow, fromCol, row, col)) {
                const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                if (square) {
                    const targetPiece = chessBoard[row][col];
                    if (targetPiece && isPieceBlack(targetPiece)) {
                        square.classList.add('capture-move');
                    } else {
                        square.classList.add('valid-move');
                    }
                }
            }
        }
    }
}

// Clear valid move indicators
function clearValidMoves() {
    document.querySelectorAll('.chess-square').forEach(square => {
        square.classList.remove('valid-move', 'capture-move');
    });
}

// Clear highlights
function clearHighlights() {
    document.querySelectorAll('.chess-square').forEach(square => {
        square.classList.remove('selected', 'valid-move', 'capture-move');
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
    
    // Add to game history for human moves (AI moves are tracked in makeAIMove)
    if (currentPlayer === 'white') {
        gameHistory.push({
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
            piece: piece,
            captured: captured
        });
    }
    
    // Add moving animation to piece
    const fromSquare = document.querySelector(`[data-row="${fromRow}"][data-col="${fromCol}"] .chess-piece-game`);
    const toSquare = document.querySelector(`[data-row="${toRow}"][data-col="${toCol}"]`);
    
    if (fromSquare) {
        fromSquare.classList.add('moving');
        setTimeout(() => {
            if (fromSquare) fromSquare.classList.remove('moving');
        }, 500);
    }
    
    // Handle capture animation
    if (captured) {
        const capturedPiece = toSquare.querySelector('.chess-piece-game');
        if (capturedPiece) {
            capturedPiece.classList.add('captured');
            createCaptureParticles(toRow, toCol);
        }
        
        setTimeout(() => {
            chessBoard[toRow][toCol] = piece;
            chessBoard[fromRow][fromCol] = null;
            renderChessBoard();
            
            // Add new piece animation
            const newPiece = document.querySelector(`[data-row="${toRow}"][data-col="${toCol}"] .chess-piece-game`);
            if (newPiece) {
                newPiece.classList.add('new-piece');
                setTimeout(() => {
                    if (newPiece) newPiece.classList.remove('new-piece');
                }, 600);
            }
        }, 400);
    } else {
        chessBoard[toRow][toCol] = piece;
        chessBoard[fromRow][fromCol] = null;
        renderChessBoard();
        createMoveParticles(toRow, toCol);
        
        // Add new piece animation
        setTimeout(() => {
            const newPiece = document.querySelector(`[data-row="${toRow}"][data-col="${toCol}"] .chess-piece-game`);
            if (newPiece) {
                newPiece.classList.add('new-piece');
                setTimeout(() => {
                    if (newPiece) newPiece.classList.remove('new-piece');
                }, 600);
            }
        }, 50);
    }
    
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    
    if (captured) {
        playSound('success');
        updateGameStatus(`🎯 Captured ${captured}! ` + (currentPlayer === 'white' ? "Your turn!" : "AI is thinking..."));
        showNotification(`🔥 Great capture! You took ${captured}!`);
    } else {
        playSound('click');
        updateGameStatus(currentPlayer === 'white' ? "Your turn!" : "🤖 AI is thinking...");
    }
}

// Advanced AI move using minimax algorithm with opening book and tactics
function makeAIMove() {
    if (!isGameActive || currentPlayer !== 'black') return;
    
    updateGameStatus("🤖 AI is calculating the perfect move...");
    
    // Use setTimeout to allow UI to update before calculation
    setTimeout(() => {
        const startTime = Date.now();
        let bestMove = null;
        let moveSource = '';
        
        // First, check opening book
        const openingMove = getOpeningMove();
        if (openingMove && isValidMove(openingMove.from.row, openingMove.from.col, openingMove.to.row, openingMove.to.col)) {
            bestMove = openingMove;
            moveSource = 'opening book';
            showNotification("📚 AI playing from opening theory!");
        } else {
            // Check for tactical moves first
            const tacticalMoves = findTacticalMoves('black');
            if (tacticalMoves.length > 0) {
                // Sort tactical moves by bonus value
                tacticalMoves.sort((a, b) => (b.bonus || 0) - (a.bonus || 0));
                bestMove = tacticalMoves[0];
                moveSource = `tactical ${bestMove.tactical}`;
                showNotification(`⚡ AI found a ${bestMove.tactical}!`);
            } else {
                // Use minimax for regular moves
                bestMove = findBestMove(4); // Increased search depth to 4
                moveSource = 'deep calculation';
                showNotification("🧠 AI calculating strategic move...");
            }
        }
        
        const thinkTime = Date.now() - startTime;
        
        if (bestMove) {
            console.log(`🤖 AI selected ${moveSource} move in ${thinkTime}ms: ${bestMove.from.row},${bestMove.from.col} -> ${bestMove.to.row},${bestMove.to.col} (score: ${bestMove.score || 'N/A'})`);
            
            // Add move to game history before making it
            gameHistory.push({
                from: bestMove.from,
                to: bestMove.to,
                piece: chessBoard[bestMove.from.row][bestMove.from.col],
                captured: chessBoard[bestMove.to.row][bestMove.to.col]
            });
            
            makeMove(bestMove.from.row, bestMove.from.col, bestMove.to.row, bestMove.to.col);
            
            // Show confidence and move type
            const confidence = Math.min(100, Math.abs(bestMove.score || 50) + 30);
            showNotification(`✨ ${moveSource} • Confidence: ${confidence}%`);
        } else {
            updateGameStatus("🏁 Game Over! AI has no valid moves.");
            isGameActive = false;
            showNotification("🎉 Congratulations! You've defeated the AI!");
        }
    }, 200); // Slightly longer delay for more realistic thinking time
}

// ===== ADVANCED AI CHESS ENGINE =====

// Piece values for evaluation
const pieceValues = {
    '♙': 100, '♘': 320, '♗': 330, '♖': 500, '♕': 900, '♔': 20000,
    '♟': -100, '♞': -320, '♝': -330, '♜': -500, '♛': -900, '♚': -20000
};

// Piece-square tables for positional evaluation
const pieceSquareTables = {
    '♟': [ // Black pawn
        [0,  0,  0,  0,  0,  0,  0,  0],
        [50, 50, 50, 50, 50, 50, 50, 50],
        [10, 10, 20, 30, 30, 20, 10, 10],
        [5,  5, 10, 25, 25, 10,  5,  5],
        [0,  0,  0, 20, 20,  0,  0,  0],
        [5, -5,-10,  0,  0,-10, -5,  5],
        [5, 10, 10,-20,-20, 10, 10,  5],
        [0,  0,  0,  0,  0,  0,  0,  0]
    ],
    '♞': [ // Black knight
        [-50,-40,-30,-30,-30,-30,-40,-50],
        [-40,-20,  0,  0,  0,  0,-20,-40],
        [-30,  0, 10, 15, 15, 10,  0,-30],
        [-30,  5, 15, 20, 20, 15,  5,-30],
        [-30,  0, 15, 20, 20, 15,  0,-30],
        [-30,  5, 10, 15, 15, 10,  5,-30],
        [-40,-20,  0,  5,  5,  0,-20,-40],
        [-50,-40,-30,-30,-30,-30,-40,-50]
    ],
    '♝': [ // Black bishop
        [-20,-10,-10,-10,-10,-10,-10,-20],
        [-10,  0,  0,  0,  0,  0,  0,-10],
        [-10,  0,  5, 10, 10,  5,  0,-10],
        [-10,  5,  5, 10, 10,  5,  5,-10],
        [-10,  0, 10, 10, 10, 10,  0,-10],
        [-10, 10, 10, 10, 10, 10, 10,-10],
        [-10,  5,  0,  0,  0,  0,  5,-10],
        [-20,-10,-10,-10,-10,-10,-10,-20]
    ],
    '♜': [ // Black rook
        [0,  0,  0,  0,  0,  0,  0,  0],
        [5, 10, 10, 10, 10, 10, 10,  5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [-5,  0,  0,  0,  0,  0,  0, -5],
        [0,  0,  0,  5,  5,  0,  0,  0]
    ],
    '♛': [ // Black queen
        [-20,-10,-10, -5, -5,-10,-10,-20],
        [-10,  0,  0,  0,  0,  0,  0,-10],
        [-10,  0,  5,  5,  5,  5,  0,-10],
        [-5,  0,  5,  5,  5,  5,  0, -5],
        [0,  0,  5,  5,  5,  5,  0, -5],
        [-10,  5,  5,  5,  5,  5,  0,-10],
        [-10,  0,  5,  0,  0,  0,  0,-10],
        [-20,-10,-10, -5, -5,-10,-10,-20]
    ],
    '♚': [ // Black king
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-30,-40,-40,-50,-50,-40,-40,-30],
        [-20,-30,-30,-40,-40,-30,-30,-20],
        [-10,-20,-20,-20,-20,-20,-20,-10],
        [20, 20,  0,  0,  0,  0, 20, 20],
        [20, 30, 10,  0,  0, 10, 30, 20]
    ]
};

// Generate white piece tables by flipping black tables
const whiteTables = {};
Object.keys(pieceSquareTables).forEach(piece => {
    const whitePiece = {'♟': '♙', '♞': '♘', '♝': '♗', '♜': '♖', '♛': '♕', '♚': '♔'}[piece];
    whiteTables[whitePiece] = pieceSquareTables[piece].slice().reverse();
});
Object.assign(pieceSquareTables, whiteTables);

// Find best move using minimax with alpha-beta pruning
function findBestMove(depth) {
    const moves = generateAllMoves('black');
    if (moves.length === 0) return null;
    
    let bestMove = null;
    let bestScore = -Infinity;
    let alpha = -Infinity;
    let beta = Infinity;
    
    for (const move of moves) {
        // Make the move
        const originalPiece = chessBoard[move.to.row][move.to.col];
        chessBoard[move.to.row][move.to.col] = chessBoard[move.from.row][move.from.col];
        chessBoard[move.from.row][move.from.col] = null;
        
        // Evaluate the position
        const score = minimax(depth - 1, false, alpha, beta);
        
        // Undo the move
        chessBoard[move.from.row][move.from.col] = chessBoard[move.to.row][move.to.col];
        chessBoard[move.to.row][move.to.col] = originalPiece;
        
        if (score > bestScore) {
            bestScore = score;
            bestMove = { ...move, score };
        }
        
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break; // Alpha-beta pruning
    }
    
    return bestMove;
}

// Minimax algorithm with alpha-beta pruning
function minimax(depth, isMaximizing, alpha, beta) {
    if (depth === 0) {
        return evaluatePosition();
    }
    
    const moves = generateAllMoves(isMaximizing ? 'black' : 'white');
    
    if (moves.length === 0) {
        // No moves available - checkmate or stalemate
        if (isInCheck(isMaximizing ? 'black' : 'white')) {
            return isMaximizing ? -10000 + (3 - depth) : 10000 - (3 - depth);
        }
        return 0; // Stalemate
    }
    
    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const move of moves) {
            // Make move
            const originalPiece = chessBoard[move.to.row][move.to.col];
            chessBoard[move.to.row][move.to.col] = chessBoard[move.from.row][move.from.col];
            chessBoard[move.from.row][move.from.col] = null;
            
            const eval = minimax(depth - 1, false, alpha, beta);
            
            // Undo move
            chessBoard[move.from.row][move.from.col] = chessBoard[move.to.row][move.to.col];
            chessBoard[move.to.row][move.to.col] = originalPiece;
            
            maxEval = Math.max(maxEval, eval);
            alpha = Math.max(alpha, eval);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            // Make move
            const originalPiece = chessBoard[move.to.row][move.to.col];
            chessBoard[move.to.row][move.to.col] = chessBoard[move.from.row][move.from.col];
            chessBoard[move.from.row][move.from.col] = null;
            
            const eval = minimax(depth - 1, true, alpha, beta);
            
            // Undo move
            chessBoard[move.from.row][move.from.col] = chessBoard[move.to.row][move.to.col];
            chessBoard[move.to.row][move.to.col] = originalPiece;
            
            minEval = Math.min(minEval, eval);
            beta = Math.min(beta, eval);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

// Generate all possible moves for a color
function generateAllMoves(color) {
    const moves = [];
    const isWhite = color === 'white';
    
    for (let fromRow = 0; fromRow < 8; fromRow++) {
        for (let fromCol = 0; fromCol < 8; fromCol++) {
            const piece = chessBoard[fromRow][fromCol];
            if (!piece) continue;
            
            const pieceIsWhite = isPieceWhite(piece);
            if (pieceIsWhite !== isWhite) continue;
            
            for (let toRow = 0; toRow < 8; toRow++) {
                for (let toCol = 0; toCol < 8; toCol++) {
                    if (isValidMove(fromRow, fromCol, toRow, toCol)) {
                        moves.push({
                            from: { row: fromRow, col: fromCol },
                            to: { row: toRow, col: toCol },
                            piece: piece,
                            captured: chessBoard[toRow][toCol]
                        });
                    }
                }
            }
        }
    }
    
    return moves;
}

// Evaluate the current position
function evaluatePosition() {
    let score = 0;
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = chessBoard[row][col];
            if (!piece) continue;
            
            // Material value
            score += pieceValues[piece] || 0;
            
            // Positional value
            if (pieceSquareTables[piece]) {
                score += pieceSquareTables[piece][row][col];
            }
        }
    }
    
    // Additional strategic factors
    score += evaluateStrategicFactors();
    
    return score;
}

// Opening book - common opening moves
const openingBook = {
    // After 1.e4
    'e2e4': ['e7e5', 'c7c5', 'e7e6', 'c7c6', 'd7d6'],
    // After 1.d4
    'd2d4': ['d7d5', 'g8f6', 'f7f5', 'e7e6'],
    // After 1.Nf3
    'g1f3': ['d7d5', 'g8f6', 'c7c5'],
    // Responding to 1.e4 e5
    'e2e4,e7e5': ['g1f3', 'f1c4', 'd2d3'],
    // Sicilian Defense
    'e2e4,c7c5': ['g1f3', 'd2d4', 'f2f4'],
    // French Defense
    'e2e4,e7e6': ['d2d4', 'g1f3', 'f1d3'],
    // King's Indian Defense setup
    'd2d4,g8f6': ['c2c4', 'g1f3', 'b1c3']
};

// Check if we're in opening phase
function isOpeningPhase() {
    let piecesMoved = 0;
    const startingPositions = {
        '♜': [[0,0], [0,7]], '♞': [[0,1], [0,6]], '♝': [[0,2], [0,5]],
        '♛': [[0,3]], '♚': [[0,4]], '♟': [[1,0], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7]]
    };
    
    for (const [piece, positions] of Object.entries(startingPositions)) {
        for (const [row, col] of positions) {
            if (chessBoard[row][col] !== piece) {
                piecesMoved++;
            }
        }
    }
    
    return piecesMoved < 12; // Still in opening if less than 12 pieces moved
}

// Get opening book move
function getOpeningMove() {
    if (!isOpeningPhase()) return null;
    
    // Convert current position to move notation (simplified)
    const moveHistory = gameHistory.map(move => `${String.fromCharCode(97 + move.from.col)}${8 - move.from.row}${String.fromCharCode(97 + move.to.col)}${8 - move.to.row}`);
    const positionKey = moveHistory.join(',');
    
    const bookMoves = openingBook[positionKey];
    if (bookMoves && bookMoves.length > 0) {
        const randomMove = bookMoves[Math.floor(Math.random() * bookMoves.length)];
        return parseAlgebraicMove(randomMove);
    }
    
    return null;
}

// Parse algebraic notation to move object
function parseAlgebraicMove(algebraic) {
    if (algebraic.length !== 4) return null;
    
    const fromCol = algebraic.charCodeAt(0) - 97;
    const fromRow = 8 - parseInt(algebraic[1]);
    const toCol = algebraic.charCodeAt(2) - 97;
    const toRow = 8 - parseInt(algebraic[3]);
    
    if (fromRow < 0 || fromRow > 7 || fromCol < 0 || fromCol > 7 ||
        toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return null;
    
    return {
        from: { row: fromRow, col: fromCol },
        to: { row: toRow, col: toCol }
    };
}

// Detect tactical patterns
function findTacticalMoves(color) {
    const moves = generateAllMoves(color);
    const tacticalMoves = [];
    
    for (const move of moves) {
        // Check for forks (attacking multiple pieces)
        if (isForking(move)) {
            tacticalMoves.push({ ...move, tactical: 'fork', bonus: 200 });
        }
        
        // Check for pins
        if (isPinning(move)) {
            tacticalMoves.push({ ...move, tactical: 'pin', bonus: 150 });
        }
        
        // Check for discovered attacks
        if (isDiscoveredAttack(move)) {
            tacticalMoves.push({ ...move, tactical: 'discovery', bonus: 180 });
        }
        
        // Check for skewer
        if (isSkewer(move)) {
            tacticalMoves.push({ ...move, tactical: 'skewer', bonus: 160 });
        }
    }
    
    return tacticalMoves;
}

// Check if move creates a fork
function isForking(move) {
    // Simulate the move
    const originalPiece = chessBoard[move.to.row][move.to.col];
    chessBoard[move.to.row][move.to.col] = chessBoard[move.from.row][move.from.col];
    chessBoard[move.from.row][move.from.col] = null;
    
    // Count attacks from new position
    let attackCount = 0;
    const piece = chessBoard[move.to.row][move.to.col];
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const target = chessBoard[row][col];
            if (target && isPieceWhite(target) !== isPieceWhite(piece) && 
                isValidMove(move.to.row, move.to.col, row, col)) {
                attackCount++;
            }
        }
    }
    
    // Undo the move
    chessBoard[move.from.row][move.from.col] = chessBoard[move.to.row][move.to.col];
    chessBoard[move.to.row][move.to.col] = originalPiece;
    
    return attackCount >= 2;
}

// Check if move creates a pin
function isPinning(move) {
    // Simplified pin detection - check if moving piece creates line attack through enemy piece to valuable target
    const originalPiece = chessBoard[move.to.row][move.to.col];
    chessBoard[move.to.row][move.to.col] = chessBoard[move.from.row][move.from.col];
    chessBoard[move.from.row][move.from.col] = null;
    
    const piece = chessBoard[move.to.row][move.to.col];
    let isPin = false;
    
    // Check for rook, bishop, or queen creating pin
    if ('♜♝♛'.includes(piece) || '♖♗♕'.includes(piece)) {
        // Check all directions from new position
        const directions = piece === '♜' || piece === '♖' ? 
            [[0,1], [0,-1], [1,0], [-1,0]] : // Rook moves
            piece === '♝' || piece === '♗' ? 
            [[1,1], [1,-1], [-1,1], [-1,-1]] : // Bishop moves
            [[0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]]; // Queen moves
        
        for (const [dr, dc] of directions) {
            let enemyPiece = null;
            let valuableTarget = null;
            
            for (let i = 1; i < 8; i++) {
                const r = move.to.row + dr * i;
                const c = move.to.col + dc * i;
                if (r < 0 || r > 7 || c < 0 || c > 7) break;
                
                const targetPiece = chessBoard[r][c];
                if (targetPiece) {
                    if (!enemyPiece && isPieceWhite(targetPiece) !== isPieceWhite(piece)) {
                        enemyPiece = targetPiece;
                    } else if (enemyPiece && isPieceWhite(targetPiece) !== isPieceWhite(piece)) {
                        const values = { '♔': 1000, '♕': 900, '♛': 900, '♖': 500, '♜': 500 };
                        if (values[targetPiece] && values[targetPiece] > (values[enemyPiece] || 0)) {
                            isPin = true;
                        }
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    
    // Undo the move
    chessBoard[move.from.row][move.from.col] = chessBoard[move.to.row][move.to.col];
    chessBoard[move.to.row][move.to.col] = originalPiece;
    
    return isPin;
}

// Check for discovered attack
function isDiscoveredAttack(move) {
    // Check if moving piece reveals an attack from another piece
    const piece = chessBoard[move.from.row][move.from.col];
    chessBoard[move.from.row][move.from.col] = null; // Temporarily remove piece
    
    let discoveredAttack = false;
    
    // Check if any friendly piece now attacks an enemy piece
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const friendlyPiece = chessBoard[row][col];
            if (friendlyPiece && isPieceWhite(friendlyPiece) === isPieceWhite(piece)) {
                // Check if this piece can now attack valuable targets
                for (let tr = 0; tr < 8; tr++) {
                    for (let tc = 0; tc < 8; tc++) {
                        const target = chessBoard[tr][tc];
                        if (target && isPieceWhite(target) !== isPieceWhite(piece) &&
                            isValidMove(row, col, tr, tc)) {
                            const values = { '♔': 1000, '♕': 900, '♛': 900, '♖': 500, '♜': 500 };
                            if (values[target] && values[target] >= 500) {
                                discoveredAttack = true;
                            }
                        }
                    }
                }
            }
        }
    }
    
    // Restore piece
    chessBoard[move.from.row][move.from.col] = piece;
    
    return discoveredAttack;
}

// Check for skewer
function isSkewer(move) {
    // Similar to pin but valuable piece is in front
    const originalPiece = chessBoard[move.to.row][move.to.col];
    chessBoard[move.to.row][move.to.col] = chessBoard[move.from.row][move.from.col];
    chessBoard[move.from.row][move.from.col] = null;
    
    const piece = chessBoard[move.to.row][move.to.col];
    let isSkw = false;
    
    if ('♜♝♛'.includes(piece) || '♖♗♕'.includes(piece)) {
        const directions = piece === '♜' || piece === '♖' ? 
            [[0,1], [0,-1], [1,0], [-1,0]] :
            piece === '♝' || piece === '♗' ? 
            [[1,1], [1,-1], [-1,1], [-1,-1]] :
            [[0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]];
        
        for (const [dr, dc] of directions) {
            let valuableTarget = null;
            let lesserTarget = null;
            
            for (let i = 1; i < 8; i++) {
                const r = move.to.row + dr * i;
                const c = move.to.col + dc * i;
                if (r < 0 || r > 7 || c < 0 || c > 7) break;
                
                const targetPiece = chessBoard[r][c];
                if (targetPiece && isPieceWhite(targetPiece) !== isPieceWhite(piece)) {
                    const values = { '♔': 1000, '♕': 900, '♛': 900, '♖': 500, '♜': 500 };
                    if (!valuableTarget && values[targetPiece] && values[targetPiece] >= 500) {
                        valuableTarget = targetPiece;
                    } else if (valuableTarget && !lesserTarget) {
                        lesserTarget = targetPiece;
                        isSkw = true;
                        break;
                    } else if (targetPiece) {
                        break;
                    }
                }
            }
        }
    }
    
    // Undo the move
    chessBoard[move.from.row][move.from.col] = chessBoard[move.to.row][move.to.col];
    chessBoard[move.to.row][move.to.col] = originalPiece;
    
    return isSkw;
}

// Evaluate strategic factors
function evaluateStrategicFactors() {
    let score = 0;
    
    // Center control
    const centerSquares = [[3,3], [3,4], [4,3], [4,4]];
    centerSquares.forEach(([row, col]) => {
        const piece = chessBoard[row][col];
        if (piece) {
            if (isPieceWhite(piece)) {
                score -= 30; // White gets negative score (we're black)
            } else {
                score += 30; // Black gets positive score
            }
        }
    });
    
    // Piece development (not in starting position)
    score += evaluateDevelopment();
    
    // King safety
    score += evaluateKingSafety();
    
    // Pawn structure
    score += evaluatePawnStructure();
    
    // Tactical bonuses
    const tacticalMoves = findTacticalMoves('black');
    tacticalMoves.forEach(move => {
        score += move.bonus || 0;
    });
    
    return score;
}

// Evaluate piece development
function evaluateDevelopment() {
    let score = 0;
    
    // Check if knights and bishops are developed
    const blackKnights = ['♞'];
    const blackBishops = ['♝'];
    
    // Penalty for pieces still on back rank
    if (chessBoard[0][1] === '♞') score -= 20; // b8 knight
    if (chessBoard[0][6] === '♞') score -= 20; // g8 knight
    if (chessBoard[0][2] === '♝') score -= 15; // c8 bishop
    if (chessBoard[0][5] === '♝') score -= 15; // f8 bishop
    
    return score;
}

// Evaluate king safety
function evaluateKingSafety() {
    let score = 0;
    
    // Find kings
    let whiteKingPos = null;
    let blackKingPos = null;
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (chessBoard[row][col] === '♔') whiteKingPos = {row, col};
            if (chessBoard[row][col] === '♚') blackKingPos = {row, col};
        }
    }
    
    // Prefer castled position
    if (blackKingPos) {
        if (blackKingPos.col === 2 || blackKingPos.col === 6) {
            score += 40; // Castled king
        }
        
        // Penalty for exposed king
        if (blackKingPos.row > 2) {
            score -= 30;
        }
    }
    
    return score;
}

// Evaluate pawn structure
function evaluatePawnStructure() {
    let score = 0;
    
    // Count doubled pawns, isolated pawns, etc.
    const blackPawnCols = [];
    const whitePawnCols = [];
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (chessBoard[row][col] === '♟') blackPawnCols.push(col);
            if (chessBoard[row][col] === '♙') whitePawnCols.push(col);
        }
    }
    
    // Penalty for doubled pawns
    for (let col = 0; col < 8; col++) {
        const blackCount = blackPawnCols.filter(c => c === col).length;
        const whiteCount = whitePawnCols.filter(c => c === col).length;
        
        if (blackCount > 1) score -= (blackCount - 1) * 15;
        if (whiteCount > 1) score += (whiteCount - 1) * 15; // Good for us when white has doubled pawns
    }
    
    return score;
}

// Check if a color is in check
function isInCheck(color) {
    // Find the king
    let kingPos = null;
    const kingPiece = color === 'white' ? '♔' : '♚';
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (chessBoard[row][col] === kingPiece) {
                kingPos = { row, col };
                break;
            }
        }
        if (kingPos) break;
    }
    
    if (!kingPos) return false;
    
    // Check if any enemy piece can attack the king
    const enemyColor = color === 'white' ? 'black' : 'white';
    const enemyMoves = generateAllMoves(enemyColor);
    
    return enemyMoves.some(move => 
        move.to.row === kingPos.row && move.to.col === kingPos.col
    );
}

// Start new game
function newGame() {
    initializeChessBoard();
    renderChessBoard();
    currentPlayer = 'white';
    isGameActive = true;
    selectedSquare = null;
    gameHistory = [];
    updateGameStatus("New game started! Your turn!");
    playSound('success');
    showNotification('🔄 New chess game started!');
}

// Undo move (simplified)
function undoMove() {
    updateGameStatus("Undo feature coming soon!");
    playSound('click');
    showNotification('↶ Undo feature in development');
}

// Get hint
function getHint() {
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
    playSound('click');
    showNotification(`💡 ${randomHint}`);
}

// Update game status
function updateGameStatus(message) {
    const statusElement = document.getElementById('gameStatus');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const chessModal = document.getElementById('chessGameModal');
    const cricketModal = document.getElementById('cricketGameModal');
    
    if (event.target === chessModal) {
        closeChessGame();
    }
    if (event.target === cricketModal) {
        closeCricketGame();
    }
});

// ===== CRICKET GAME IMPLEMENTATION =====

console.log('🏏 Cricket game script loading...');

// Cricket game variables
let cricketScore = 0;
let ballsPlayed = 0;
let wicketsLost = 0;
let maxBalls = 6;
let maxWickets = 1;
let cricketGameActive = false;
let ballInMotion = false;
let timingGameActive = false;
let timingPointerPosition = 0;
let timingDirection = 1;
let gameStats = {
    totalRuns: 0,
    boundaries: 0,
    sixes: 0,
    dots: 0,
    catches: 0,
    fielderCatches: 0
};

// Fielder data
const fielderPositions = {
    'slip': { zone: 'close', catchChance: 0.7 },
    'point': { zone: 'side', catchChance: 0.6 },
    'cover': { zone: 'off', catchChance: 0.5 },
    'mid-off': { zone: 'off', catchChance: 0.6 },
    'mid-on': { zone: 'on', catchChance: 0.6 },
    'square-leg': { zone: 'leg', catchChance: 0.5 },
    'fine-leg': { zone: 'leg', catchChance: 0.4 },
    'long-off': { zone: 'off-boundary', catchChance: 0.3 },
    'long-on': { zone: 'on-boundary', catchChance: 0.3 },
    'third-man': { zone: 'behind', catchChance: 0.4 },
    'wicket-keeper': { zone: 'keeper', catchChance: 0.8 }
};

// ===== GOOGLE CRICKET DOODLE GAME =====

// Game state variables
let doodleGameActive = false;
let ballsRemaining = 6;
let totalScore = 0;
let snailBowling = false;
let ballInPlay = false;
let gameStarted = false;

// Open Google Cricket Doodle modal
function openCricketGame() {
    console.log('🦗 Opening Google Cricket Doodle...');
    const modal = document.getElementById('cricketGameModal');
    if (modal) {
        modal.style.display = 'block';
        resetDoodleGame();
        try {
            playSound('click');
        } catch (e) {
            console.log('Sound error:', e);
        }
        try {
            showNotification('🦗 Welcome to Google Cricket Doodle!');
        } catch (e) {
            console.log('Notification error:', e);
        }
    } else {
        console.error('Cricket modal not found!');
        alert('Cricket modal not found!');
    }
}

// Make function globally available
window.openCricketGame = openCricketGame;

// Close cricket game modal
function closeCricketGame() {
    const modal = document.getElementById('cricketGameModal');
    modal.style.display = 'none';
    doodleGameActive = false;
    gameStarted = false;
    // Remove all event listeners when closing
    document.removeEventListener('keydown', spacebarHandler);
    document.removeEventListener('touchstart', touchHandler);
    document.removeEventListener('click', clickHandler);
    try {
        playSound('click');
    } catch (e) {
        console.log('Sound error:', e);
    }
}

window.closeCricketGame = closeCricketGame;

// Reset/Initialize Google Doodle game
function resetDoodleGame() {
    doodleGameActive = false;
    ballsRemaining = 6;
    totalScore = 0;
    snailBowling = false;
    ballInPlay = false;
    gameStarted = false;
    
    // Update UI
    updateDoodleScore();
    updateGameStatus('Press SPACE when snail reaches the stumps!');
    
    // Reset animations
    resetAnimations();
    
    // Hide game over screen
    const gameOver = document.getElementById('gameOver');
    if (gameOver) gameOver.style.display = 'none';
}

// Start Google Doodle game
function startDoodleGame() {
    gameStarted = true;
    doodleGameActive = true;
    
    // Add keyboard and touch event listeners
    document.addEventListener('keydown', spacebarHandler);
    document.addEventListener('touchstart', touchHandler);
    document.addEventListener('click', clickHandler);
    
    // Hide start button
    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.style.display = 'none';
    
    // Show touch instructions on mobile
    if (isMobileDevice()) {
        updateGameStatus('Get ready! Snail is bowling... Tap to hit!');
    } else {
        updateGameStatus('Get ready! Snail is bowling... Press SPACE to hit!');
    }
    
    // Start the first bowl
    setTimeout(() => {
        bowlBallDoodle();
    }, 1000);
}

window.startDoodleGame = startDoodleGame;

// New game function
function newDoodleGame() {
    resetDoodleGame();
    
    // Show start button
    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.style.display = 'inline-block';
}

window.newDoodleGame = newDoodleGame;

// Device detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// Spacebar event handler
function spacebarHandler(event) {
    if (event.code === 'Space' && doodleGameActive && snailBowling && ballInPlay) {
        event.preventDefault();
        hitBall();
    }
}

// Touch event handler for mobile
function touchHandler(event) {
    if (doodleGameActive && snailBowling && ballInPlay) {
        event.preventDefault();
        hitBall();
    }
}

// Click event handler for all devices
function clickHandler(event) {
    // Only handle clicks on the cricket field area
    const cricketField = document.querySelector('.cricket-field');
    if (cricketField && cricketField.contains(event.target) && 
        doodleGameActive && snailBowling && ballInPlay) {
        event.preventDefault();
        hitBall();
    }
}

// Bowl ball (snail animation) - Doodle Cricket
function bowlBallDoodle() {
    if (!doodleGameActive || ballsRemaining <= 0) return;
    
    snailBowling = true;
    ballInPlay = true;
    
    const snail = document.getElementById('snailBowler');
    const ball = document.getElementById('cricketBall');
    
    if (snail) {
        snail.classList.add('bowling');
        if (isMobileDevice()) {
            updateGameStatus('🐌 Snail is bowling... TAP the field to hit!');
        } else {
            updateGameStatus('🐌 Snail is bowling... Press SPACE or CLICK field to hit!');
        }
    }
    
    // Show ball and animate it
    if (ball) {
        ball.classList.add('active');
        ball.style.animation = 'ballFly 2s ease-in-out forwards';
    }
    
    // Window for hitting (1.5 seconds)
    setTimeout(() => {
        if (snailBowling && ballInPlay) {
            // Missed the ball
            missedBall();
        }
    }, 1500);
    
    // Reset for next ball
    setTimeout(() => {
        resetForNextBall();
    }, 2500);
}

// Hit ball function
function hitBall() {
    if (!snailBowling || ballInPlay === false) return;
    
    ballInPlay = false;
    snailBowling = false;
    
    // Generate random runs (0-6)
    const runs = Math.floor(Math.random() * 7); // 0 to 6
    totalScore += runs;
    ballsRemaining--;
    
    // Animate cricket batter
    const batter = document.getElementById('cricketBatter');
    if (batter) {
        batter.classList.add('batting');
        setTimeout(() => batter.classList.remove('batting'), 500);
    }
    
    // Animate ball being hit
    const ball = document.getElementById('cricketBall');
    if (ball) {
        ball.style.animation = 'ballHit 1s ease-out forwards';
    }
    
    // Update score with animation
    updateDoodleScore();
    
    // Show result
    let resultText = '';
    if (runs === 0) {
        resultText = 'Dot ball!';
    } else if (runs === 1) {
        resultText = '1 run!';
    } else if (runs === 4) {
        resultText = '🎯 FOUR! Boundary!';
        createBoundaryEffect();
    } else if (runs === 6) {
        resultText = '🚀 SIX! Over the boundary!';
        createSixEffect();
    } else {
        resultText = `${runs} runs!`;
    }
    
    updateGameStatus(resultText);
    
    // Check if game over
    setTimeout(() => {
        if (ballsRemaining <= 0) {
            endDoodleGame();
        } else {
            // Next ball
            setTimeout(() => bowlBallDoodle(), 1500);
        }
    }, 1000);
}

// Missed ball
function missedBall() {
    ballInPlay = false;
    snailBowling = false;
    ballsRemaining--;
    
    updateDoodleScore();
    updateGameStatus('Missed! Better luck next time.');
    
    // Check if game over
    setTimeout(() => {
        if (ballsRemaining <= 0) {
            endDoodleGame();
        } else {
            // Next ball
            setTimeout(() => bowlBallDoodle(), 1500);
        }
    }, 1000);
}

// Update score display
function updateDoodleScore() {
    const scoreElement = document.getElementById('totalScore');
    const ballsElement = document.getElementById('ballsRemaining');
    
    if (scoreElement) {
        scoreElement.textContent = totalScore;
        scoreElement.style.animation = 'scoreUpdate 0.5s ease';
    }
    
    if (ballsElement) {
        ballsElement.textContent = ballsRemaining;
    }
}

// Update game status
function updateGameStatus(message) {
    const statusElement = document.getElementById('gameStatus');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

// Reset animations
function resetAnimations() {
    const snail = document.getElementById('snailBowler');
    const ball = document.getElementById('cricketBall');
    const batter = document.getElementById('cricketBatter');
    
    if (snail) snail.classList.remove('bowling');
    if (ball) {
        ball.classList.remove('active');
        ball.style.animation = '';
    }
    if (batter) batter.classList.remove('batting');
}

// Reset for next ball
function resetForNextBall() {
    resetAnimations();
    snailBowling = false;
    ballInPlay = false;
}

// End game
function endDoodleGame() {
    doodleGameActive = false;
    gameStarted = false;
    
    // Remove event listener
    document.removeEventListener('keydown', spacebarHandler);
    
    // Show game over screen
    const gameOver = document.getElementById('gameOver');
    const finalScore = document.getElementById('finalScore');
    const gameOverMessage = document.getElementById('gameOverMessage');
    
    if (gameOver) gameOver.style.display = 'block';
    if (finalScore) finalScore.textContent = `Final Score: ${totalScore} runs`;
    
    let message = '';
    if (totalScore >= 30) {
        message = '🏆 Excellent! You\'re a cricket champion!';
    } else if (totalScore >= 20) {
        message = '👏 Great job! Well played!';
    } else if (totalScore >= 10) {
        message = '👍 Good effort! Keep practicing!';
    } else {
        message = '🦗 Keep trying! Even crickets need practice!';
    }
    
    if (gameOverMessage) gameOverMessage.textContent = message;
    
    // Show start button again
    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.style.display = 'inline-block';
}

// Create boundary effect (4 runs)
function createBoundaryEffect() {
    const field = document.querySelector('.doodle-field');
    if (!field) return;
    
    for (let i = 0; i < 4; i++) {
        const star = document.createElement('div');
        star.textContent = '⭐';
        star.style.cssText = `
            position: absolute;
            font-size: 1.5rem;
            pointer-events: none;
            animation: fielderCatch 1s ease-out forwards;
            left: ${Math.random() * 80 + 10}%;
            top: ${Math.random() * 80 + 10}%;
            z-index: 100;
        `;
        field.appendChild(star);
        setTimeout(() => star.remove(), 1000);
    }
}

// Create six effect (6 runs)
function createSixEffect() {
    const field = document.querySelector('.doodle-field');
    if (!field) return;
    
    for (let i = 0; i < 6; i++) {
        const firework = document.createElement('div');
        firework.textContent = '🎆';
        firework.style.cssText = `
            position: absolute;
            font-size: 2rem;
            pointer-events: none;
            animation: fielderCatch 1.5s ease-out forwards;
            left: ${Math.random() * 70 + 15}%;
            top: ${Math.random() * 70 + 15}%;
            z-index: 100;
        `;
        field.appendChild(firework);
        setTimeout(() => firework.remove(), 1500);
    }
}

// Close cricket game modal
function closeCricketGame() {
    console.log('🏏 Closing cricket game...');
    const modal = document.getElementById('cricketGameModal');
    if (modal) {
        modal.style.display = 'none';
        resetCricketGame();
        try {
            playSound('click');
        } catch (e) {
            console.log('Sound error:', e);
        }
    }
}
window.closeCricketGame = closeCricketGame;

// Start a new cricket game
function newCricketGame() {
    cricketScore = 0;
    ballsPlayed = 0;
    wicketsLost = 0;
    cricketGameActive = true;
    ballInMotion = false;
    timingGameActive = false;
    gameStats = {
        totalRuns: 0,
        boundaries: 0,
        sixes: 0,
        dots: 0,
        catches: 0,
        fielderCatches: 0
    };
    
    updateScoreboard();
    hideGameResult();
    resetBallPosition();
    resetTimingGame();
    resetFielders();
    
    document.getElementById('bowlBtn').style.display = 'inline-block';
    document.getElementById('hitBtn').style.display = 'none';
    
    showNotification('🎯 New cricket game started! Good luck!');
}
window.newCricketGame = newCricketGame;

// Reset cricket game state
function resetCricketGame() {
    cricketGameActive = false;
    ballInMotion = false;
    timingGameActive = false;
    resetBallPosition();
    resetTimingGame();
}

// Bowl a ball
function bowlBall() {
    if (!cricketGameActive || ballInMotion) return;
    
    ballInMotion = true;
    document.getElementById('bowlBtn').style.display = 'none';
    document.getElementById('hitBtn').style.display = 'inline-block';
    
    // Start ball animation
    animateBall();
    
    // Start timing game
    startTimingGame();
    
    playSound('click');
}
window.bowlBall = bowlBall;

// Animate the ball from bowler to batsman
function animateBall() {
    const ball = document.getElementById('ball');
    const bowler = document.getElementById('bowler');
    const batsman = document.getElementById('batsman');
    
    ball.style.display = 'block';
    ball.classList.add('ball-moving');
    
    // Reset ball position to bowler
    ball.style.left = '20px';
    ball.style.top = '60%';
    ball.style.opacity = '1';
    
    // Animate to batsman
    setTimeout(() => {
        ball.style.left = '75%';
        ball.style.top = '60%';
    }, 100);
}

// Start the timing mini-game
function startTimingGame() {
    timingGameActive = true;
    timingPointerPosition = 0;
    timingDirection = 1;
    
    const pointer = document.getElementById('timingPointer');
    const zone = document.getElementById('timingZone');
    
    // Position the green zone randomly
    const zonePosition = Math.random() * 60 + 20; // 20% to 80%
    zone.style.left = zonePosition + '%';
    
    // Start pointer animation
    moveTimingPointer();
}

// Move the timing pointer back and forth
function moveTimingPointer() {
    if (!timingGameActive) return;
    
    const pointer = document.getElementById('timingPointer');
    
    timingPointerPosition += timingDirection * 2;
    
    if (timingPointerPosition >= 100) {
        timingPointerPosition = 100;
        timingDirection = -1;
    } else if (timingPointerPosition <= 0) {
        timingPointerPosition = 0;
        timingDirection = 1;
    }
    
    pointer.style.left = timingPointerPosition + '%';
    
    setTimeout(moveTimingPointer, 50);
}

// Hit the ball
function hitBall() {
    if (!timingGameActive || !ballInMotion) return;
    
    timingGameActive = false;
    ballInMotion = false;
    
    const zone = document.getElementById('timingZone');
    const zoneLeft = parseFloat(zone.style.left);
    const zoneWidth = 20; // Zone is 20% wide
    
    // Check if timing is good
    const isGoodTiming = timingPointerPosition >= zoneLeft && 
                        timingPointerPosition <= (zoneLeft + zoneWidth);
    
    let runs = 0;
    let result = '';
    let isCaught = false;
    
    if (isGoodTiming) {
        // Good timing - calculate runs based on exact timing
        const centerZone = zoneLeft + (zoneWidth / 2);
        const distanceFromCenter = Math.abs(timingPointerPosition - centerZone);
        const accuracy = 1 - (distanceFromCenter / (zoneWidth / 2));
        
        if (accuracy > 0.9) {
            runs = 6;
            result = 'SIX! 🚀';
        } else if (accuracy > 0.7) {
            runs = 4;
            result = 'FOUR! 🎯';
        } else if (accuracy > 0.4) {
            runs = Math.floor(Math.random() * 3) + 1;
            result = `${runs} Run${runs > 1 ? 's' : ''}! ✅`;
        } else {
            runs = 1;
            result = '1 Run! 👍';
        }
        
        // Check for fielder catch
        const ballDirection = getBallDirection(accuracy, timingPointerPosition);
        isCaught = checkFielderCatch(ballDirection, runs);
        
        if (isCaught) {
            // Ball was caught!
            wicketsLost++;
            runs = 0;
            result = 'CAUGHT! 🙌';
            gameStats.catches++;
            gameStats.fielderCatches++;
            animateWicket(); // Treat as wicket
        } else {
            // Ball not caught, runs scored
            if (runs === 6) {
                gameStats.sixes++;
                createSixEffect();
            } else if (runs === 4) {
                gameStats.boundaries++;
                createBoundaryEffect();
            }
            animateHit(runs);
        }
    } else {
        // Poor timing
        const missChance = Math.random();
        if (missChance < 0.3) {
            // Wicket!
            wicketsLost++;
            result = 'OUT! 😱';
            animateWicket();
        } else {
            // Dot ball
            runs = 0;
            result = 'Dot Ball 😐';
            gameStats.dots++;
        }
    }
    
    cricketScore += runs;
    ballsPlayed++;
    gameStats.totalRuns += runs;
    
    // Show result
    showShotResult(result);
    
    // Update scoreboard
    updateScoreboard();
    
    // Check if game is over
    if (wicketsLost >= maxWickets || ballsPlayed >= maxBalls) {
        endGame();
    } else {
        // Reset for next ball
        setTimeout(() => {
            resetForNextBall();
        }, 2000);
    }
}
window.hitBall = hitBall;

// Animate a successful hit
function animateHit(runs) {
    const ball = document.getElementById('ball');
    const batsman = document.getElementById('batsman');
    
    // Ball flies away
    ball.style.transition = 'all 1s ease-out';
    ball.style.left = '90%';
    ball.style.top = '20%';
    ball.style.opacity = '0.3';
    
    // Batsman celebrates
    batsman.style.transform = 'rotate(45deg) scale(1.2)';
    setTimeout(() => {
        batsman.style.transform = 'rotate(0deg) scale(1)';
    }, 1000);
    
    playSound('success');
}

// Animate a wicket
function animateWicket() {
    const ball = document.getElementById('ball');
    const wickets = document.getElementById('wickets');
    const batsman = document.getElementById('batsman');
    
    // Ball hits wickets
    ball.style.transition = 'all 0.5s ease-in';
    ball.style.left = '85%';
    ball.style.top = '60%';
    
    // Wickets fall
    wickets.style.transform = 'rotate(45deg)';
    wickets.style.opacity = '0.7';
    
    // Batsman disappointed
    batsman.style.transform = 'scale(0.8)';
    batsman.textContent = '😔';
    
    setTimeout(() => {
        wickets.style.transform = 'rotate(0deg)';
        wickets.style.opacity = '1';
        batsman.style.transform = 'scale(1)';
        batsman.textContent = '🏏';
    }, 2000);
    
    playSound('click');
}

// Create boundary effect
function createBoundaryEffect() {
    const field = document.querySelector('.cricket-field');
    for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.textContent = '⭐';
        spark.style.cssText = `
            position: absolute;
            font-size: 1.5rem;
            pointer-events: none;
            animation: sparkEffect 1s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        field.appendChild(spark);
        
        setTimeout(() => spark.remove(), 1000);
    }
}

// Create six effect
function createSixEffect() {
    const field = document.querySelector('.cricket-field');
    for (let i = 0; i < 12; i++) {
        const firework = document.createElement('div');
        firework.textContent = '🎆';
        firework.style.cssText = `
            position: absolute;
            font-size: 2rem;
            pointer-events: none;
            animation: fireworkEffect 1.5s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        field.appendChild(firework);
        
        setTimeout(() => firework.remove(), 1500);
    }
}

// Show shot result
function showShotResult(result) {
    const recentShots = document.getElementById('recentShots');
    const shotDiv = document.createElement('div');
    shotDiv.className = 'shot-result';
    shotDiv.textContent = result;
    shotDiv.style.cssText = `
        background: linear-gradient(135deg, #70A1D7, #A1DE93);
        color: white;
        padding: 0.5rem 1rem;
        margin: 0.25rem 0;
        border-radius: 1rem;
        font-weight: bold;
        animation: fadeInScale 0.5s ease-out;
    `;
    
    recentShots.insertBefore(shotDiv, recentShots.firstChild);
    
    // Keep only last 3 results
    if (recentShots.children.length > 3) {
        recentShots.removeChild(recentShots.lastChild);
    }
}

// Reset ball position
function resetBallPosition() {
    const ball = document.getElementById('ball');
    ball.style.display = 'none';
    ball.style.transition = 'none';
    ball.style.left = '20px';
    ball.style.top = '60%';
    ball.style.opacity = '1';
    ball.classList.remove('ball-moving');
}

// Reset timing game
function resetTimingGame() {
    const pointer = document.getElementById('timingPointer');
    pointer.style.left = '0%';
    timingPointerPosition = 0;
    timingDirection = 1;
}

// Reset fielders to original positions
function resetFielders() {
    const fielders = document.querySelectorAll('.fielder');
    fielders.forEach(fielder => {
        fielder.classList.remove('catching', 'celebrating', 'moving');
        fielder.style.animation = '';
        fielder.style.transform = '';
    });
}

// Determine which fielding zone the ball is hit to
function getBallDirection(accuracy, timingPointerPosition) {
    // Based on timing pointer position, determine ball direction
    const directions = {
        0: 'fine-leg',      // 0-10%
        10: 'square-leg',   // 10-20%
        20: 'mid-on',       // 20-30%
        30: 'long-on',      // 30-40%
        40: 'mid-off',      // 40-50%
        50: 'cover',        // 50-60%
        60: 'point',        // 60-70%
        70: 'third-man',    // 70-80%
        80: 'slip',         // 80-90%
        90: 'wicket-keeper' // 90-100%
    };
    
    // Find the closest direction based on timing
    let closestDirection = 'cover';
    let minDiff = 100;
    
    for (const [threshold, direction] of Object.entries(directions)) {
        const diff = Math.abs(timingPointerPosition - parseInt(threshold));
        if (diff < minDiff) {
            minDiff = diff;
            closestDirection = direction;
        }
    }
    
    // For aerial shots (6s and some 4s), ball goes to boundary fielders
    if (accuracy > 0.8) {
        const boundaryDirections = ['long-off', 'long-on', 'third-man', 'fine-leg'];
        const randomBoundary = boundaryDirections[Math.floor(Math.random() * boundaryDirections.length)];
        return randomBoundary;
    }
    
    return closestDirection;
}

// Check if fielder catches the ball
function checkFielderCatch(direction, runs) {
    const fielders = document.querySelectorAll('.fielder');
    let catchingFielder = null;
    
    // Find the fielder in the ball's direction
    fielders.forEach(fielder => {
        const position = fielder.dataset.position;
        if (position === direction) {
            catchingFielder = fielder;
        }
    });
    
    if (!catchingFielder) return false;
    
    const position = catchingFielder.dataset.position;
    const catchData = fielderPositions[position];
    
    if (!catchData) return false;
    
    // Calculate catch probability based on shot power and fielder skill
    let catchChance = catchData.catchChance;
    
    // Reduce catch chance for powerful shots
    if (runs === 6) {
        catchChance *= 0.3; // Very hard to catch sixes
    } else if (runs === 4) {
        catchChance *= 0.5; // Harder to catch boundaries
    }
    
    // Random catch attempt
    const catchAttempt = Math.random();
    const isCaught = catchAttempt < catchChance;
    
    // Animate fielder
    if (isCaught) {
        fielderCatch(catchingFielder);
        return true;
    } else {
        fielderMiss(catchingFielder);
        return false;
    }
}

// Animate fielder catching the ball
function fielderCatch(fielder) {
    fielder.classList.add('catching');
    fielder.textContent = '🙌'; // Hands up catching
    
    setTimeout(() => {
        fielder.classList.remove('catching');
        fielder.classList.add('celebrating');
        fielder.textContent = '🎉'; // Celebrating
        
        setTimeout(() => {
            fielder.classList.remove('celebrating');
            fielder.textContent = '🧍‍♂️'; // Back to normal
        }, 2000);
    }, 500);
    
    // Create catch effect
    createCatchEffect(fielder);
}

// Animate fielder missing the catch
function fielderMiss(fielder) {
    fielder.classList.add('moving');
    fielder.textContent = '🤷‍♂️'; // Missed it
    
    setTimeout(() => {
        fielder.classList.remove('moving');
        fielder.textContent = '🧍‍♂️'; // Back to normal
    }, 1000);
}

// Create catch celebration effect
function createCatchEffect(fielder) {
    const rect = fielder.getBoundingClientRect();
    const field = document.querySelector('.cricket-field');
    
    for (let i = 0; i < 6; i++) {
        const effect = document.createElement('div');
        effect.textContent = '⭐';
        effect.style.cssText = `
            position: absolute;
            font-size: 1.2rem;
            pointer-events: none;
            animation: catchStarEffect 1s ease-out forwards;
            left: ${rect.left - field.getBoundingClientRect().left + Math.random() * 40}px;
            top: ${rect.top - field.getBoundingClientRect().top + Math.random() * 40}px;
            z-index: 1000;
        `;
        
        field.appendChild(effect);
        
        setTimeout(() => effect.remove(), 1000);
    }
}

// Reset for next ball
function resetForNextBall() {
    resetBallPosition();
    resetTimingGame();
    
    document.getElementById('bowlBtn').style.display = 'inline-block';
    document.getElementById('hitBtn').style.display = 'none';
}

// Update scoreboard
function updateScoreboard() {
    document.getElementById('playerScore').textContent = cricketScore;
    document.getElementById('ballsPlayed').textContent = `${ballsPlayed}/${maxBalls}`;
    document.getElementById('wicketsLost').textContent = `${wicketsLost}/${maxWickets}`;
}

// Hide game result
function hideGameResult() {
    document.getElementById('gameResult').style.display = 'none';
}

// End the game
function endGame() {
    cricketGameActive = false;
    resetBallPosition();
    resetTimingGame();
    
    document.getElementById('bowlBtn').style.display = 'none';
    document.getElementById('hitBtn').style.display = 'none';
    
    // Show final result
    const resultDiv = document.getElementById('gameResult');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultStats = document.getElementById('resultStats');
    
    let title, message;
    
    if (wicketsLost >= maxWickets) {
        title = 'Game Over! 😔';
        message = `You were bowled out! Final Score: ${cricketScore} runs`;
    } else {
        title = 'Innings Complete! 🎉';
        message = `Great batting! Final Score: ${cricketScore} runs in ${ballsPlayed} balls`;
    }
    
    resultTitle.textContent = title;
    resultMessage.textContent = message;
    
    // Show detailed stats
    const strikeRate = ballsPlayed > 0 ? ((cricketScore / ballsPlayed) * 100).toFixed(1) : 0;
    resultStats.innerHTML = `
        <div class="stat-item">🏏 Strike Rate: ${strikeRate}</div>
        <div class="stat-item">🎯 Boundaries: ${gameStats.boundaries}</div>
        <div class="stat-item">🚀 Sixes: ${gameStats.sixes}</div>
        <div class="stat-item">⚫ Dot Balls: ${gameStats.dots}</div>
    `;
    
    resultDiv.style.display = 'block';
    
    // Celebrate if good score
    if (cricketScore >= 20) {
        showNotification('🏆 Excellent batting! You\'re a cricket champion!');
        createSixEffect();
    } else if (cricketScore >= 10) {
        showNotification('👏 Good effort! Keep practicing!');
        createBoundaryEffect();
    } else {
        showNotification('🎯 Keep practicing! You\'ll improve!');
    }
}

console.log('🏏 Cricket game functions loaded successfully!');

// Verify all cricket functions are available
console.log('🔍 Checking cricket functions:');
console.log('openCricketGame:', typeof window.openCricketGame);
console.log('closeCricketGame:', typeof window.closeCricketGame);
console.log('newCricketGame:', typeof window.newCricketGame);
console.log('bowlBall:', typeof window.bowlBall);
console.log('hitBall:', typeof window.hitBall);

// Verify chess functions are also working
console.log('🔍 Checking chess functions:');
console.log('openChessGame:', typeof window.openChessGame);
console.log('closeChessGame:', typeof window.closeChessGame);

// Test function to verify cricket game is working
window.testCricket = function() {
    alert('Cricket functions are working!');
    console.log('Cricket test function called');
};

// Ensure cricket functions are available when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏏 DOM loaded, cricket functions ready!');
    
    // Test if cricket modal exists
    const cricketModal = document.getElementById('cricketGameModal');
    if (cricketModal) {
        console.log('✅ Cricket modal found!');
    } else {
        console.log('❌ Cricket modal NOT found!');
    }
    
    // Test if cricket card exists
    const cricketCard = document.querySelector('.cricket-game-card');
    if (cricketCard) {
        console.log('✅ Cricket card found!');
    } else {
        console.log('❌ Cricket card NOT found!');
    }
});

// Create capture particle effects
function createCaptureParticles(row, col) {
    const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (!square) return;
    
    const rect = square.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'capture-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #ef4444, #f59e0b);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10001;
            animation: captureParticle 1s ease-out forwards;
            animation-delay: ${i * 0.05}s;
        `;
        
        // Random direction
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 150 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--vx', `${vx}px`);
        particle.style.setProperty('--vy', `${vy}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Create move particle effects
function createMoveParticles(row, col) {
    const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (!square) return;
    
    const rect = square.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create fewer, gentler particles for moves
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'move-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #60a5fa, #a855f7);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10001;
            animation: moveParticle 0.8s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 800);
    }
}

// Create game start celebration particles
function createGameStartParticles() {
    const modal = document.getElementById('chessGameModal');
    if (!modal) return;
    
    const rect = modal.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    
    // Create celebration particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'celebration-particle';
        particle.textContent = ['🎉', '⭐', '✨', '🎊', '🏆'][Math.floor(Math.random() * 5)];
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 10002;
            animation: celebrationParticle 2s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
}

// Add CSS animations for particles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes captureParticle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--vx, 100px), var(--vy, 100px)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes moveParticle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(0, -30px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes celebrationParticle {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 200 - 100}px) scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 600 - 300}px, ${Math.random() * 400 - 200}px) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Final verification that all scripts loaded successfully
console.log('✅ All JavaScript functions loaded successfully!');
console.log('🎮 Interactive features ready!');

// ===== REALISTIC CRICKET GAME IMPLEMENTATION =====

// Realistic Cricket Game State
let realisticGameActive = false;
let realisticBallsRemaining = 6;
let realisticTotalScore = 0;
let realisticWicketsLost = 0;
let realisticOversCompleted = 0;
let realisticBallsThisOver = 0;
let powerMeterActive = false;
let powerMeterPosition = 0;
let powerMeterDirection = 1;
let powerMeterSpeed = 2;
let lastBallResult = '-';
let currentBall = 1;

// Game statistics
let realisticGameStats = {
    boundaries: 0,
    sixes: 0,
    dots: 0,
    singles: 0,
    doubles: 0,
    triples: 0,
    perfectHits: 0,
    goodHits: 0,
    misses: 0
};

// Start Realistic Cricket Game
function startRealisticGame() {
    console.log('🏏 Starting Realistic Cricket Game...');
    realisticGameActive = true;
    
    // Hide start button
    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.style.display = 'none';
    
    // Add event listeners
    document.addEventListener('keydown', realisticSpacebarHandler);
    document.addEventListener('click', realisticClickHandler);
    
    // Update game status
    updateRealisticGameStatus('Get ready to face the first ball!');
    
    // Start the first ball after a delay
    setTimeout(() => {
        bowlRealisticBall();
    }, 1500);
    
    try {
        playSound('click');
        showNotification('🏏 Realistic Cricket Championship Started!');
    } catch (e) {
        console.log('Sound/notification error:', e);
    }
}

// New Realistic Game
function newRealisticGame() {
    console.log('🔄 Starting New Realistic Cricket Game...');
    resetRealisticGame();
    
    // Show start button
    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.style.display = 'inline-block';
    
    // Hide game over screen
    const gameOver = document.getElementById('gameOver');
    if (gameOver) gameOver.style.display = 'none';
}

// Reset Realistic Game
function resetRealisticGame() {
    realisticGameActive = false;
    realisticBallsRemaining = 6;
    realisticTotalScore = 0;
    realisticWicketsLost = 0;
    realisticOversCompleted = 0;
    realisticBallsThisOver = 0;
    powerMeterActive = false;
    powerMeterPosition = 0;
    lastBallResult = '-';
    currentBall = 1;
    
    // Reset statistics
    realisticGameStats = {
        boundaries: 0,
        sixes: 0,
        dots: 0,
        singles: 0,
        doubles: 0,
        triples: 0,
        perfectHits: 0,
        goodHits: 0,
        misses: 0
    };
    
    // Remove event listeners
    document.removeEventListener('keydown', realisticSpacebarHandler);
    document.removeEventListener('click', realisticClickHandler);
    
    // Update UI
    updateRealisticScoreboard();
    updateRealisticGameStatus('Get ready to face the bowling!');
    
    // Reset animations
    resetRealisticAnimations();
}

// Bowl Realistic Ball
function bowlRealisticBall() {
    if (!realisticGameActive || realisticBallsRemaining <= 0 || realisticWicketsLost >= 2) {
        return;
    }
    
    console.log(`🎾 Bowling ball ${currentBall}/6...`);
    
    // Start bowler run-up animation
    const bowler = document.getElementById('bowler');
    if (bowler) {
        bowler.classList.add('bowling');
        
        // Animate bowling arm
        const bowlingArm = bowler.querySelector('.bowling-arm');
        if (bowlingArm) {
            bowlingArm.style.animation = 'bowlingAction 1s ease-in-out';
        }
    }
    
    // Show and animate ball
    const ball = document.getElementById('cricketBall');
    if (ball) {
        ball.classList.add('active');
        ball.style.animation = 'ballBowl 2s ease-out forwards';
    }
    
    // Start power meter
    setTimeout(() => {
        startPowerMeter();
    }, 500);
    
    // Update game status
    updateRealisticGameStatus('Bowler is running in... Get ready to hit!');
    
    // Auto-miss if no input after 3 seconds
    setTimeout(() => {
        if (powerMeterActive) {
            handleRealisticMiss();
        }
    }, 3000);
}

// Start Power Meter
function startPowerMeter() {
    if (!realisticGameActive) return;
    
    powerMeterActive = true;
    const powerMeter = document.getElementById('powerMeter');
    const powerIndicator = document.getElementById('powerIndicator');
    
    if (powerMeter) {
        powerMeter.classList.add('active');
        updateRealisticGameStatus('PRESS SPACEBAR when the indicator hits the perfect zone!');
    }
    
    // Animate power meter
    animatePowerMeter();
}

// Animate Power Meter
function animatePowerMeter() {
    if (!powerMeterActive) return;
    
    const powerIndicator = document.getElementById('powerIndicator');
    if (!powerIndicator) return;
    
    // Update position
    powerMeterPosition += powerMeterDirection * powerMeterSpeed;
    
    // Bounce at edges
    if (powerMeterPosition >= 100) {
        powerMeterPosition = 100;
        powerMeterDirection = -1;
    } else if (powerMeterPosition <= 0) {
        powerMeterPosition = 0;
        powerMeterDirection = 1;
    }
    
    // Update indicator position
    powerIndicator.style.left = powerMeterPosition + '%';
    
    // Continue animation
    if (powerMeterActive) {
        requestAnimationFrame(animatePowerMeter);
    }
}

// Handle Realistic Hit
function handleRealisticHit() {
    if (!powerMeterActive) return;
    
    powerMeterActive = false;
    const powerMeter = document.getElementById('powerMeter');
    if (powerMeter) {
        powerMeter.classList.remove('active');
    }
    
    // Calculate hit quality based on power meter position
    let hitQuality = 'miss';
    let runs = 0;
    
    if (powerMeterPosition >= 45 && powerMeterPosition <= 55) {
        // Perfect zone (50% ± 5%)
        hitQuality = 'perfect';
        runs = Math.random() > 0.5 ? 6 : 4; // 50% chance of six, 50% chance of four
        realisticGameStats.perfectHits++;
        if (runs === 6) realisticGameStats.sixes++;
        else realisticGameStats.boundaries++;
    } else if ((powerMeterPosition >= 35 && powerMeterPosition < 45) || 
               (powerMeterPosition > 55 && powerMeterPosition <= 65)) {
        // Good zones
        hitQuality = 'good';
        const outcomes = [1, 2, 3, 4];
        runs = outcomes[Math.floor(Math.random() * outcomes.length)];
        realisticGameStats.goodHits++;
        
        if (runs === 4) realisticGameStats.boundaries++;
        else if (runs === 1) realisticGameStats.singles++;
        else if (runs === 2) realisticGameStats.doubles++;
        else if (runs === 3) realisticGameStats.triples++;
    } else {
        // Miss zones - could be dot ball or wicket
        if (Math.random() > 0.7) {
            // 30% chance of getting out
            handleRealisticWicket();
            return;
        } else {
            runs = 0;
            realisticGameStats.dots++;
            realisticGameStats.misses++;
        }
    }
    
    // Update score
    realisticTotalScore += runs;
    lastBallResult = runs === 0 ? 'Dot' : `${runs} run${runs > 1 ? 's' : ''}`;
    
    // Animate batsman hitting
    const batsman = document.getElementById('batsman');
    if (batsman && runs > 0) {
        batsman.classList.add('batting');
        const bat = batsman.querySelector('.cricket-bat');
        if (bat) {
            bat.style.animation = 'battingAction 0.5s ease-out';
        }
        
        setTimeout(() => {
            batsman.classList.remove('batting');
        }, 500);
    }
    
    // Animate ball if hit
    const ball = document.getElementById('cricketBall');
    if (ball && runs > 0) {
        ball.style.animation = 'ballHit 1.5s ease-out forwards';
        
        // Create boundary effect for 4s and 6s
        if (runs >= 4) {
            createRealisticBoundaryEffect(runs);
        }
    }
    
    // Update UI
    updateRealisticScoreboard();
    updateRealisticGameStatus(`Shot! ${lastBallResult}${runs >= 4 ? ' - BOUNDARY!' : ''}`);
    
    // Next ball
    completeBall();
    
    try {
        if (runs >= 4) {
            playSound('success');
        } else if (runs > 0) {
            playSound('click');
        }
    } catch (e) {
        console.log('Sound error:', e);
    }
}

// Handle Realistic Miss
function handleRealisticMiss() {
    if (!powerMeterActive) return;
    
    powerMeterActive = false;
    const powerMeter = document.getElementById('powerMeter');
    if (powerMeter) {
        powerMeter.classList.remove('active');
    }
    
    lastBallResult = 'Dot';
    realisticGameStats.dots++;
    realisticGameStats.misses++;
    
    updateRealisticScoreboard();
    updateRealisticGameStatus('Missed! Better timing next time.');
    
    completeBall();
}

// Handle Realistic Wicket
function handleRealisticWicket() {
    powerMeterActive = false;
    const powerMeter = document.getElementById('powerMeter');
    if (powerMeter) {
        powerMeter.classList.remove('active');
    }
    
    realisticWicketsLost++;
    lastBallResult = 'OUT!';
    realisticGameStats.misses++;
    
    // Animate wicket
    const wicketStumps = document.getElementById('wicketKeeperStumps');
    if (wicketStumps) {
        wicketStumps.style.animation = 'shake 0.5s ease-in-out';
    }
    
    updateRealisticScoreboard();
    updateRealisticGameStatus('OUT! Wicket taken!');
    
    // Check if game over
    if (realisticWicketsLost >= 2) {
        setTimeout(() => {
            endRealisticGame();
        }, 2000);
    } else {
        completeBall();
    }
    
    try {
        playSound('error');
    } catch (e) {
        console.log('Sound error:', e);
    }
}

// Complete Ball
function completeBall() {
    realisticBallsRemaining--;
    realisticBallsThisOver++;
    currentBall++;
    
    // Check if over complete
    if (realisticBallsThisOver >= 6) {
        realisticOversCompleted++;
        realisticBallsThisOver = 0;
    }
    
    // Reset animations
    setTimeout(() => {
        resetRealisticAnimations();
    }, 1000);
    
    // Check if game over
    if (realisticBallsRemaining <= 0 || realisticWicketsLost >= 2) {
        setTimeout(() => {
            endRealisticGame();
        }, 2000);
    } else {
        // Next ball
        setTimeout(() => {
            bowlRealisticBall();
        }, 2500);
    }
}

// End Realistic Game
function endRealisticGame() {
    console.log('🏁 Ending Realistic Cricket Game...');
    realisticGameActive = false;
    
    // Remove event listeners
    document.removeEventListener('keydown', realisticSpacebarHandler);
    document.removeEventListener('click', realisticClickHandler);
    
    // Show game over screen
    const gameOver = document.getElementById('gameOver');
    const finalScore = document.getElementById('finalScore');
    const performanceStats = document.getElementById('performanceStats');
    const gameOverMessage = document.getElementById('gameOverMessage');
    
    if (gameOver) gameOver.style.display = 'block';
    if (finalScore) finalScore.textContent = `Final Score: ${realisticTotalScore}/${realisticWicketsLost} in ${Math.floor(realisticOversCompleted)}.${realisticBallsThisOver} overs`;
    
    // Performance stats
    if (performanceStats) {
        const runRate = realisticOversCompleted > 0 ? (realisticTotalScore / realisticOversCompleted).toFixed(2) : '0.00';
        performanceStats.innerHTML = `
            <div>Strike Rate: ${((realisticTotalScore / (6 - realisticBallsRemaining)) * 100).toFixed(1)}</div>
            <div>Boundaries: ${realisticGameStats.boundaries} | Sixes: ${realisticGameStats.sixes}</div>
            <div>Perfect Hits: ${realisticGameStats.perfectHits} | Good Hits: ${realisticGameStats.goodHits}</div>
        `;
    }
    
    // Game over message
    if (gameOverMessage) {
        let message = '';
        if (realisticTotalScore >= 30) {
            message = '🏆 Outstanding! You\'re a cricket champion!';
        } else if (realisticTotalScore >= 20) {
            message = '👏 Excellent batting! Well played!';
        } else if (realisticTotalScore >= 10) {
            message = '👍 Good effort! Keep practicing your timing!';
        } else {
            message = '💪 Cricket is tough! Try focusing on the perfect zone!';
        }
        gameOverMessage.textContent = message;
    }
    
    try {
        playSound('success');
        showNotification(`🏏 Game Over! Final Score: ${realisticTotalScore}/${realisticWicketsLost}`);
    } catch (e) {
        console.log('Sound/notification error:', e);
    }
}

// Update Realistic Scoreboard
function updateRealisticScoreboard() {
    const totalScore = document.getElementById('totalScore');
    const wicketsLost = document.getElementById('wicketsLost');
    const oversCompleted = document.getElementById('oversCompleted');
    const runRate = document.getElementById('runRate');
    const ballsRemaining = document.getElementById('ballsRemaining');
    const lastBallResultEl = document.getElementById('lastBallResult');
    
    if (totalScore) {
        totalScore.textContent = realisticTotalScore;
        totalScore.style.animation = 'scoreUpdate 0.5s ease';
    }
    
    if (wicketsLost) {
        wicketsLost.textContent = realisticWicketsLost;
    }
    
    if (oversCompleted) {
        const overs = Math.floor(realisticOversCompleted) + (realisticBallsThisOver / 10);
        oversCompleted.textContent = overs.toFixed(1);
    }
    
    if (runRate) {
        const rate = realisticOversCompleted > 0 ? (realisticTotalScore / realisticOversCompleted).toFixed(2) : '0.00';
        runRate.textContent = rate;
    }
    
    if (ballsRemaining) {
        ballsRemaining.textContent = realisticBallsRemaining;
    }
    
    if (lastBallResultEl) {
        lastBallResultEl.textContent = lastBallResult;
    }
}

// Update Realistic Game Status
function updateRealisticGameStatus(message) {
    const gameStatus = document.getElementById('gameStatus');
    if (gameStatus) {
        gameStatus.textContent = message;
        gameStatus.style.animation = 'pulseGlow 0.5s ease';
    }
}

// Reset Realistic Animations
function resetRealisticAnimations() {
    const bowler = document.getElementById('bowler');
    const ball = document.getElementById('cricketBall');
    const batsman = document.getElementById('batsman');
    
    if (bowler) {
        bowler.classList.remove('bowling');
        const bowlingArm = bowler.querySelector('.bowling-arm');
        if (bowlingArm) bowlingArm.style.animation = '';
    }
    
    if (ball) {
        ball.classList.remove('active');
        ball.style.animation = '';
    }
    
    if (batsman) {
        batsman.classList.remove('batting');
        const bat = batsman.querySelector('.cricket-bat');
        if (bat) bat.style.animation = '';
    }
}

// Create Realistic Boundary Effect
function createRealisticBoundaryEffect(runs) {
    const field = document.querySelector('.realistic-field');
    if (!field) return;
    
    const effectText = runs === 6 ? 'SIX!' : 'FOUR!';
    const effectColor = runs === 6 ? '#f39c12' : '#e74c3c';
    
    for (let i = 0; i < (runs === 6 ? 6 : 4); i++) {
        setTimeout(() => {
            const effect = document.createElement('div');
            effect.textContent = effectText;
            effect.style.cssText = `
                position: absolute;
                font-size: 1.5rem;
                font-weight: 900;
                color: ${effectColor};
                pointer-events: none;
                animation: fielderCelebration 1.5s ease-out forwards;
                left: ${Math.random() * 80 + 10}%;
                top: ${Math.random() * 80 + 10}%;
                z-index: 100;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                font-family: 'Orbitron', sans-serif;
            `;
            field.appendChild(effect);
            setTimeout(() => effect.remove(), 1500);
        }, i * 200);
    }
}

// Event Handlers
function realisticSpacebarHandler(event) {
    if (event.code === 'Space' && powerMeterActive) {
        event.preventDefault();
        handleRealisticHit();
    }
}

function realisticClickHandler(event) {
    const cricketField = document.querySelector('.realistic-field');
    if (cricketField && cricketField.contains(event.target) && powerMeterActive) {
        event.preventDefault();
        handleRealisticHit();
    }
}

// Make functions globally available
window.startRealisticGame = startRealisticGame;
window.newRealisticGame = newRealisticGame;

// Add shake animation to CSS
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(-50%) rotate(0deg); }
    25% { transform: translateX(-50%) rotate(-5deg); }
    75% { transform: translateX(-50%) rotate(5deg); }
}
`;

const shakeStyle = document.createElement('style');
shakeStyle.textContent = shakeCSS;
document.head.appendChild(shakeStyle);

console.log('🏏 Realistic Cricket Game functions loaded successfully!');

// Export for debugging
window.debugInfo = {
    cricketGame: {
        active: typeof window.openCricketGame === 'function',
        functions: ['openCricketGame', 'closeCricketGame', 'startRealisticGame', 'newRealisticGame']
    },
    realisticCricket: {
        active: typeof window.startRealisticGame === 'function',
        functions: ['startRealisticGame', 'newRealisticGame', 'handleRealisticHit', 'bowlRealisticBall']
    },
    chessGame: {
        active: typeof window.openChessGame === 'function',
        functions: ['openChessGame', 'closeChessGame', 'newGame']
    }
};