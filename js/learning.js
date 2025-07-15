// Learning Hub JavaScript functionality

// Learning content data
const learningContent = {
    math: {
        tricks: {
            title: "Amazing Math Tricks! 🎯",
            icon: "🧮",
            content: `
                <div class="math-trick">
                    <h4>The Magic of 9!</h4>
                    <p>Here's a cool trick with the number 9:</p>
                    <div class="trick-steps">
                        <div class="trick-step">
                            <span class="step-number">1</span>
                            Pick any number (let's say 25)
                        </div>
                        <div class="trick-step">
                            <span class="step-number">2</span>
                            Multiply it by 9: 25 × 9 = 225
                        </div>
                        <div class="trick-step">
                            <span class="step-number">3</span>
                            Add all digits: 2 + 2 + 5 = 9
                        </div>
                        <div class="trick-step">
                            <span class="step-number">4</span>
                            It's always 9! Try with any number! ✨
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="tryMathTrick()">Try Another Number!</button>
                </div>
            `
        },
        timesTable: {
            title: "Interactive Times Tables! ✖️",
            icon: "🔢",
            content: `
                <div>
                    <h4>Practice Your Times Tables!</h4>
                    <p>Click on the cards to reveal the answers. Let's start with 7 times table:</p>
                    <div class="times-table" id="timesTable">
                        ${generateTimesTable(7)}
                    </div>
                    <div style="margin-top: 1rem;">
                        <button class="btn btn-secondary" onclick="changeTimesTable(5)">5× Table</button>
                        <button class="btn btn-secondary" onclick="changeTimesTable(7)">7× Table</button>
                        <button class="btn btn-secondary" onclick="changeTimesTable(9)">9× Table</button>
                        <button class="btn btn-secondary" onclick="changeTimesTable(12)">12× Table</button>
                    </div>
                </div>
            `
        },
        fractionPizza: {
            title: "Fraction Pizza! 🍕",
            icon: "🍕",
            content: `
                <div class="pizza-container">
                    <h4>Learn Fractions with Pizza!</h4>
                    <p>Click on the pizza slices to see different fractions:</p>
                    <div class="pizza-visual" id="pizzaVisual">
                        ${generatePizzaSlices(8)}
                    </div>
                    <div class="fraction-display">
                        <span id="fractionText">0/8</span>
                    </div>
                    <div class="fraction-controls">
                        <button class="fraction-btn" onclick="setPizzaFraction(2, 8)">1/4</button>
                        <button class="fraction-btn" onclick="setPizzaFraction(4, 8)">1/2</button>
                        <button class="fraction-btn" onclick="setPizzaFraction(6, 8)">3/4</button>
                        <button class="fraction-btn" onclick="clearPizza()">Clear</button>
                    </div>
                </div>
            `
        },
        geometry: {
            title: "Shape Builder! 🔺",
            icon: "📐",
            content: `
                <div class="geometry-builder">
                    <h4>Build Amazing Shapes!</h4>
                    <p>Choose shapes from the palette and click on the canvas to place them:</p>
                    <div class="shape-palette">
                        <div class="shape-tool" data-shape="🔺" onclick="selectShape(this)">🔺</div>
                        <div class="shape-tool" data-shape="🔲" onclick="selectShape(this)">🔲</div>
                        <div class="shape-tool" data-shape="🔴" onclick="selectShape(this)">🔴</div>
                        <div class="shape-tool" data-shape="⭐" onclick="selectShape(this)">⭐</div>
                        <div class="shape-tool" data-shape="🔶" onclick="selectShape(this)">🔶</div>
                        <div class="shape-tool" data-shape="💎" onclick="selectShape(this)">💎</div>
                    </div>
                    <div class="shape-canvas" id="shapeCanvas" onclick="placeShape(event)"></div>
                    <button class="btn btn-secondary" onclick="clearCanvas()">Clear Canvas</button>
                </div>
            `
        }
    },
    science: {
        periodicTable: {
            title: "Interactive Periodic Table! ⚛️",
            icon: "🧪",
            content: `
                <div>
                    <h4>Explore the Elements!</h4>
                    <p>Click on any element to learn about it:</p>
                    <div class="periodic-preview">
                        <div class="element-grid">
                            <div class="element hydrogen" onclick="showElement('Hydrogen', 'H', '1', 'The lightest element! Found in water and stars! 💧⭐')">
                                <span class="element-symbol">H</span>
                                <span class="element-number">1</span>
                            </div>
                            <div class="element helium" onclick="showElement('Helium', 'He', '2', 'Makes balloons float! Also found in the sun! 🎈☀️')">
                                <span class="element-symbol">He</span>
                                <span class="element-number">2</span>
                            </div>
                            <div class="element oxygen" onclick="showElement('Oxygen', 'O', '8', 'We breathe this! Plants make it for us! 🌱💨')">
                                <span class="element-symbol">O</span>
                                <span class="element-number">8</span>
                            </div>
                            <div class="element carbon" onclick="showElement('Carbon', 'C', '6', 'Found in diamonds and pencils! Amazing! 💎✏️')">
                                <span class="element-symbol">C</span>
                                <span class="element-number">6</span>
                            </div>
                        </div>
                    </div>
                    <div id="elementInfo" class="element-info"></div>
                </div>
            `
        },
        solarSystem: {
            title: "Solar System Explorer! 🌍",
            icon: "🪐",
            content: `
                <div>
                    <h4>Journey Through Our Solar System!</h4>
                    <p>Click on any planet to learn amazing facts:</p>
                    <div class="solar-system" id="solarSystem">
                        <div class="sun" onclick="showPlanetInfo('Sun', '☀️', 'The center of our solar system! It\\'s so big that 1 million Earths could fit inside!')"></div>
                        ${generateSolarSystem()}
                    </div>
                    <div id="planetInfo" class="planet-info-display"></div>
                </div>
            `
        },
        animalFacts: {
            title: "Amazing Animal Facts! 🦁",
            icon: "🐾",
            content: `
                <div class="animal-facts">
                    <h4>Discover Incredible Animals!</h4>
                    <div class="animal-carousel">
                        <div class="animal-card active" id="animalCard">
                            <div class="animal-emoji">🐘</div>
                            <h5>African Elephant</h5>
                            <p>Elephants can remember their friends for decades! They also show emotions like joy and sadness.</p>
                            <div class="animal-sound">🔊 Trumpet sound!</div>
                        </div>
                    </div>
                    <div class="animal-controls">
                        <button class="btn btn-secondary" onclick="showAnimalFact(0)">🐘 Elephant</button>
                        <button class="btn btn-secondary" onclick="showAnimalFact(1)">🦒 Giraffe</button>
                        <button class="btn btn-secondary" onclick="showAnimalFact(2)">🐧 Penguin</button>
                        <button class="btn btn-secondary" onclick="showAnimalFact(3)">🦋 Butterfly</button>
                    </div>
                </div>
            `
        },
        weatherStation: {
            title: "Weather Station! 🌤️",
            icon: "🌡️",
            content: `
                <div class="weather-station">
                    <h4>Learn About Weather!</h4>
                    <div class="weather-display">
                        <div class="weather-widget">
                            <div class="weather-icon" id="weatherIcon">☀️</div>
                            <div class="weather-temp" id="weatherTemp">72°F</div>
                            <div class="weather-desc" id="weatherDesc">Sunny Day</div>
                        </div>
                    </div>
                    <div class="weather-controls">
                        <button class="btn btn-secondary" onclick="changeWeather('sunny')">☀️ Sunny</button>
                        <button class="btn btn-secondary" onclick="changeWeather('rainy')">🌧️ Rainy</button>
                        <button class="btn btn-secondary" onclick="changeWeather('snowy')">❄️ Snowy</button>
                        <button class="btn btn-secondary" onclick="changeWeather('stormy')">⛈️ Stormy</button>
                    </div>
                    <div class="weather-facts">
                        <p id="weatherFact">Did you know? The sun gives Earth all the energy that creates our weather!</p>
                    </div>
                </div>
            `
        }
    },
    language: {
        storyStarter: {
            title: "Story Starter Generator! 📚",
            icon: "✍️",
            content: `
                <div class="story-generator">
                    <h4>Create Amazing Stories!</h4>
                    <div class="story-prompt" id="storyPrompt">
                        <p><strong>Your story begins:</strong></p>
                        <p>"The magical door in the old library creaked open, revealing..."</p>
                    </div>
                    <div class="story-controls">
                        <button class="btn btn-primary" onclick="generateStory()">New Story Idea! ✨</button>
                        <button class="btn btn-secondary" onclick="showWritingTips()">Writing Tips 💡</button>
                    </div>
                    <div id="writingTips" class="writing-tips" style="display: none;">
                        <h5>Great Writing Tips:</h5>
                        <ul>
                            <li>Use exciting adjectives to describe things</li>
                            <li>Make your characters interesting and unique</li>
                            <li>Add dialogue to make characters come alive</li>
                            <li>Create a problem for your character to solve</li>
                            <li>Use your five senses in descriptions</li>
                        </ul>
                    </div>
                </div>
            `
        },
        idiomsCorner: {
            title: "Idioms & Phrases Corner! 💬",
            icon: "🗣️",
            content: `
                <div class="idioms-flashcards">
                    <h4>Learn Fun Idioms!</h4>
                    <div class="idiom-card" id="idiomCard">
                        <div class="idiom-text">"It's raining cats and dogs!"</div>
                        <div class="idiom-illustration">🐱🐶☔</div>
                        <div class="idiom-meaning">It's raining very heavily!</div>
                        <div class="idiom-example">"We can't go to the park today because it's raining cats and dogs."</div>
                    </div>
                    <div class="idiom-controls">
                        <button class="idiom-btn" onclick="previousIdiom()">⬅️ Previous</button>
                        <button class="idiom-btn" onclick="nextIdiom()">Next ➡️</button>
                        <button class="idiom-btn" onclick="playIdiomSound()">🔊 Sound</button>
                    </div>
                </div>
            `
        }
    }
};

// Animal facts data
const animalFacts = [
    {
        emoji: "🐘",
        name: "African Elephant",
        fact: "Elephants can remember their friends for decades! They also show emotions like joy and sadness.",
        sound: "🔊 Trumpet sound!"
    },
    {
        emoji: "🦒",
        name: "Giraffe",
        fact: "A giraffe's tongue is 18-20 inches long and blue! They use it to grab leaves from tall trees.",
        sound: "🔊 Gentle humming!"
    },
    {
        emoji: "🐧",
        name: "Emperor Penguin",
        fact: "Penguins slide on their bellies to move fast on ice! This is called 'tobogganing'.",
        sound: "🔊 Trumpet call!"
    },
    {
        emoji: "🦋",
        name: "Monarch Butterfly",
        fact: "Some butterflies travel thousands of miles during migration - that's like flying across the whole country!",
        sound: "🔊 Silent fluttering!"
    }
];

// Idioms data
const idioms = [
    {
        text: "It's raining cats and dogs!",
        illustration: "🐱🐶☔",
        meaning: "It's raining very heavily!",
        example: "We can't go to the park today because it's raining cats and dogs."
    },
    {
        text: "Break a leg!",
        illustration: "🎭🦵",
        meaning: "Good luck! (especially before a performance)",
        example: "Break a leg in your school play tonight!"
    },
    {
        text: "It's a piece of cake!",
        illustration: "🍰✨",
        meaning: "It's very easy to do!",
        example: "This math problem is a piece of cake for me!"
    },
    {
        text: "Don't cry over spilled milk!",
        illustration: "🥛😢",
        meaning: "Don't be upset about things that already happened!",
        example: "I know you're sad about losing the game, but don't cry over spilled milk."
    },
    {
        text: "The early bird catches the worm!",
        illustration: "🐦🪱🌅",
        meaning: "People who wake up early get the best opportunities!",
        example: "I got the best seat because I arrived early - the early bird catches the worm!"
    }
];

// Story starters
const storyStarters = [
    "The magical door in the old library creaked open, revealing...",
    "When Sarah found the talking cat in her backyard, it said...",
    "The mysterious package on Tommy's doorstep contained...",
    "As the spaceship landed in the school playground, the aliens...",
    "The enchanted pencil made everything Emma drew come to life, starting with...",
    "When the clock struck midnight, all the toys in the room...",
    "The secret tunnel behind the bookshelf led to...",
    "After drinking the fizzy potion, Jake discovered he could...",
    "The friendly dragon living in the cave needed help with...",
    "When Lucy opened the magical music box, she was transported to..."
];

// Current states
let selectedShape = null;
let currentIdiomIndex = 0;
let selectedPizzaSlices = 0;

// Initialize learning page
document.addEventListener('DOMContentLoaded', function() {
    initializeLearningPage();
});

function initializeLearningPage() {
    // Add click handlers for subject cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject');
            highlightSubject(this);
        });
    });
    
    // Add hover effects to activity items
    document.querySelectorAll('.activity-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            playSound('click');
        });
    });
}

function highlightSubject(selectedCard) {
    // Remove active class from all cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected card
    selectedCard.classList.add('active');
    
    // Add pulse animation
    selectedCard.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        selectedCard.style.animation = '';
    }, 500);
}

// Math Functions
function showMathTrick() {
    playSound('click');
    displayContent(learningContent.math.tricks);
}

function tryMathTrick() {
    const randomNum = Math.floor(Math.random() * 99) + 1;
    const result = randomNum * 9;
    const digitSum = result.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    showMessage(`Try ${randomNum}: ${randomNum} × 9 = ${result}, digits: ${result.toString().split('').join(' + ')} = ${digitSum}! ✨`, 'success');
}

function showTimesTable() {
    playSound('click');
    displayContent(learningContent.math.timesTable);
}

function generateTimesTable(number) {
    let html = '';
    for (let i = 1; i <= 12; i++) {
        html += `<div class="table-cell" onclick="revealAnswer(this, ${number * i})">${number} × ${i} = ?</div>`;
    }
    return html;
}

function revealAnswer(cell, answer) {
    playSound('success');
    cell.textContent = cell.textContent.replace('?', answer);
    cell.classList.add('correct');
    cell.style.pointerEvents = 'none';
}

function changeTimesTable(number) {
    playSound('click');
    const tableContainer = document.getElementById('timesTable');
    if (tableContainer) {
        tableContainer.innerHTML = generateTimesTable(number);
    }
}

function showFractionPizza() {
    playSound('click');
    displayContent(learningContent.math.fractionPizza);
}

function generatePizzaSlices(total) {
    let html = '';
    const anglePerSlice = 360 / total;
    
    for (let i = 0; i < total; i++) {
        const rotation = i * anglePerSlice;
        html += `<div class="pizza-slice" style="transform: rotate(${rotation}deg)" onclick="togglePizzaSlice(this, ${i})"></div>`;
    }
    return html;
}

function togglePizzaSlice(slice, index) {
    playSound('click');
    slice.classList.toggle('selected');
    
    // Update fraction display
    const totalSlices = 8;
    selectedPizzaSlices = document.querySelectorAll('.pizza-slice.selected').length;
    const fractionText = document.getElementById('fractionText');
    if (fractionText) {
        fractionText.textContent = `${selectedPizzaSlices}/${totalSlices}`;
        
        // Show decimal equivalent
        const decimal = (selectedPizzaSlices / totalSlices).toFixed(2);
        if (selectedPizzaSlices > 0) {
            setTimeout(() => {
                showMessage(`That's ${decimal} of the whole pizza! 🍕`, 'info');
            }, 500);
        }
    }
}

function setPizzaFraction(numerator, denominator) {
    playSound('click');
    
    // Clear all selections
    document.querySelectorAll('.pizza-slice').forEach(slice => {
        slice.classList.remove('selected');
    });
    
    // Select the correct number of slices
    const slices = document.querySelectorAll('.pizza-slice');
    for (let i = 0; i < numerator; i++) {
        if (slices[i]) {
            slices[i].classList.add('selected');
        }
    }
    
    // Update display
    selectedPizzaSlices = numerator;
    const fractionText = document.getElementById('fractionText');
    if (fractionText) {
        fractionText.textContent = `${numerator}/${denominator}`;
    }
}

function clearPizza() {
    playSound('click');
    document.querySelectorAll('.pizza-slice').forEach(slice => {
        slice.classList.remove('selected');
    });
    selectedPizzaSlices = 0;
    const fractionText = document.getElementById('fractionText');
    if (fractionText) {
        fractionText.textContent = '0/8';
    }
}

function showGeometry() {
    playSound('click');
    displayContent(learningContent.math.geometry);
}

function selectShape(tool) {
    playSound('click');
    
    // Remove active class from all tools
    document.querySelectorAll('.shape-tool').forEach(t => t.classList.remove('active'));
    
    // Add active class to selected tool
    tool.classList.add('active');
    selectedShape = tool.getAttribute('data-shape');
}

function placeShape(event) {
    if (!selectedShape) {
        showMessage('Please select a shape first! 🔺', 'info');
        return;
    }
    
    playSound('click');
    
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const shapeElement = document.createElement('div');
    shapeElement.textContent = selectedShape;
    shapeElement.style.cssText = `
        position: absolute;
        left: ${x - 15}px;
        top: ${y - 15}px;
        font-size: 2rem;
        cursor: pointer;
        animation: popIn 0.3s ease-out;
    `;
    
    // Add click to remove
    shapeElement.addEventListener('click', function(e) {
        e.stopPropagation();
        playSound('success');
        this.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
    
    canvas.appendChild(shapeElement);
}

function clearCanvas() {
    playSound('click');
    const canvas = document.getElementById('shapeCanvas');
    if (canvas) {
        canvas.innerHTML = '';
    }
}

// Science Functions
function showPeriodicTable() {
    playSound('click');
    displayContent(learningContent.science.periodicTable);
}

function showElement(name, symbol, number, description) {
    playSound('success');
    const infoDiv = document.getElementById('elementInfo');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <div class="element-details">
                <h5>${name} (${symbol})</h5>
                <p><strong>Atomic Number:</strong> ${number}</p>
                <p>${description}</p>
            </div>
        `;
        infoDiv.style.display = 'block';
        infoDiv.style.animation = 'slideInUp 0.5s ease-out';
    }
}

function showSolarSystem() {
    playSound('click');
    displayContent(learningContent.science.solarSystem);
}

function generateSolarSystem() {
    const planets = [
        { name: 'Mercury', emoji: '☿️', distance: 60, size: 8, color: '#8C7853' },
        { name: 'Venus', emoji: '♀️', distance: 80, size: 12, color: '#FFC649' },
        { name: 'Earth', emoji: '🌍', distance: 100, size: 12, color: '#6B93D6' },
        { name: 'Mars', emoji: '♂️', distance: 120, size: 10, color: '#C1440E' }
    ];
    
    let html = '';
    planets.forEach((planet, index) => {
        html += `
            <div class="orbit" style="width: ${planet.distance * 2}px; height: ${planet.distance * 2}px;"></div>
            <div class="planet" 
                 style="width: ${planet.size}px; height: ${planet.size}px; 
                        background: ${planet.color}; 
                        top: ${200 - planet.distance - planet.size/2}px; 
                        left: ${200 - planet.size/2}px;
                        animation: orbit ${(index + 1) * 10}s linear infinite;"
                 onclick="showPlanetInfo('${planet.name}', '${planet.emoji}', 'Amazing facts about ${planet.name}!')">
            </div>
        `;
    });
    return html;
}

function showPlanetInfo(name, emoji, description) {
    playSound('success');
    showMessage(`${emoji} ${name}: ${description}`, 'info');
}

function showAnimalFacts() {
    playSound('click');
    displayContent(learningContent.science.animalFacts);
}

function showAnimalFact(index) {
    playSound('click');
    const animal = animalFacts[index];
    const cardElement = document.getElementById('animalCard');
    
    if (cardElement) {
        cardElement.innerHTML = `
            <div class="animal-emoji">${animal.emoji}</div>
            <h5>${animal.name}</h5>
            <p>${animal.fact}</p>
            <div class="animal-sound">${animal.sound}</div>
        `;
        cardElement.style.animation = 'slideInRight 0.5s ease-out';
    }
}

function showWeatherStation() {
    playSound('click');
    displayContent(learningContent.science.weatherStation);
}

function changeWeather(type) {
    playSound('click');
    
    const weatherData = {
        sunny: { icon: '☀️', temp: '75°F', desc: 'Sunny Day', fact: 'Sunny days are perfect for outdoor activities! The sun gives us vitamin D!' },
        rainy: { icon: '🌧️', temp: '65°F', desc: 'Rainy Day', fact: 'Rain helps plants grow! A raindrop falls at about 7 mph!' },
        snowy: { icon: '❄️', temp: '30°F', desc: 'Snowy Day', fact: 'No two snowflakes are exactly alike! Each one is unique!' },
        stormy: { icon: '⛈️', temp: '70°F', desc: 'Stormy Day', fact: 'Lightning is 5 times hotter than the surface of the sun!' }
    };
    
    const weather = weatherData[type];
    
    document.getElementById('weatherIcon').textContent = weather.icon;
    document.getElementById('weatherTemp').textContent = weather.temp;
    document.getElementById('weatherDesc').textContent = weather.desc;
    document.getElementById('weatherFact').textContent = `Did you know? ${weather.fact}`;
}

// Language Functions
function showStoryStarter() {
    playSound('click');
    displayContent(learningContent.language.storyStarter);
}

function generateStory() {
    playSound('success');
    const randomStarter = storyStarters[Math.floor(Math.random() * storyStarters.length)];
    const promptElement = document.getElementById('storyPrompt');
    
    if (promptElement) {
        promptElement.innerHTML = `
            <p><strong>Your story begins:</strong></p>
            <p>"${randomStarter}"</p>
        `;
        promptElement.style.animation = 'slideInLeft 0.5s ease-out';
    }
}

function showWritingTips() {
    playSound('click');
    const tipsElement = document.getElementById('writingTips');
    if (tipsElement) {
        if (tipsElement.style.display === 'none') {
            tipsElement.style.display = 'block';
            tipsElement.style.animation = 'slideInUp 0.5s ease-out';
        } else {
            tipsElement.style.display = 'none';
        }
    }
}

function showIdiomsCorner() {
    playSound('click');
    displayContent(learningContent.language.idiomsCorner);
}

function nextIdiom() {
    playSound('click');
    currentIdiomIndex = (currentIdiomIndex + 1) % idioms.length;
    updateIdiomDisplay();
}

function previousIdiom() {
    playSound('click');
    currentIdiomIndex = (currentIdiomIndex - 1 + idioms.length) % idioms.length;
    updateIdiomDisplay();
}

function updateIdiomDisplay() {
    const idiom = idioms[currentIdiomIndex];
    const cardElement = document.getElementById('idiomCard');
    
    if (cardElement) {
        cardElement.innerHTML = `
            <div class="idiom-text">"${idiom.text}"</div>
            <div class="idiom-illustration">${idiom.illustration}</div>
            <div class="idiom-meaning">${idiom.meaning}</div>
            <div class="idiom-example">"${idiom.example}"</div>
        `;
        cardElement.style.animation = 'slideInRight 0.5s ease-out';
    }
}

function playIdiomSound() {
    playSound('success');
    showMessage('🔊 Imagine hearing: "' + idioms[currentIdiomIndex].text + '"', 'info');
}

// Social Studies Functions
function showWorldMap() {
    playSound('click');
    showMessage('🗺️ Interactive world map coming soon! Explore continents and countries!', 'info');
}

function showTimeline() {
    playSound('click');
    showMessage('⏰ Historical timeline coming soon! Journey through time!', 'info');
}

function showLeaders() {
    playSound('click');
    showMessage('👑 Famous leaders gallery coming soon! Meet historical figures!', 'info');
}

function showCultures() {
    playSound('click');
    showMessage('🎭 World cultures explorer coming soon! Discover traditions!', 'info');
}

// AI Functions
function showWhatIsAI() {
    playSound('click');
    showMessage('🤖 AI is like having a smart computer friend that can learn and help solve problems!', 'info');
}

function showAIChatbot() {
    playSound('click');
    showMessage('💬 AI Chatbot coming soon! Have conversations with a friendly AI!', 'info');
}

function showAIInLife() {
    playSound('click');
    showMessage('🏠 AI is everywhere! In voice assistants, games, cars, and even helping doctors!', 'info');
}

function showCodingGame() {
    playSound('click');
    showMessage('💻 Coding games coming soon! Learn to program step by step!', 'info');
}

// Art Functions
function showColorWheel() {
    playSound('click');
    showMessage('🌈 Color wheel coming soon! Learn about primary and secondary colors!', 'info');
}

function showDrawingTips() {
    playSound('click');
    showMessage('✏️ Drawing tutorials coming soon! Learn to draw step by step!', 'info');
}

function showArtHistory() {
    playSound('click');
    showMessage('🏛️ Art history gallery coming soon! Meet famous artists and their works!', 'info');
}

function showCrafts() {
    playSound('click');
    showMessage('✂️ Fun craft projects coming soon! Make amazing things with simple materials!', 'info');
}

// Challenge Functions
function checkChallenge(button, isCorrect) {
    playSound('click');
    
    // Disable all buttons
    const allButtons = document.querySelectorAll('.challenge-btn');
    allButtons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        button.classList.add('correct');
        playSound('success');
        showCelebration();
        
        setTimeout(() => {
            showMessage('🎉 Excellent! 75 is divisible by 3 (75÷3=25) and 5 (75÷5=15), but not by 2 (it\'s odd)!', 'success');
        }, 500);
    } else {
        button.classList.add('incorrect');
        
        // Show correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === '75') {
                btn.classList.add('correct');
            }
        });
        
        setTimeout(() => {
            showMessage('Good try! The answer is 75. Remember: it must be divisible by both 3 and 5, but NOT by 2 (so it must be odd)!', 'info');
        }, 500);
    }
    
    // Reset after 4 seconds
    setTimeout(() => {
        allButtons.forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.disabled = false;
        });
    }, 4000);
}

// Display content in learning area
function displayContent(content) {
    const displayArea = document.getElementById('learningDisplay');
    if (displayArea) {
        displayArea.innerHTML = `
            <div class="content-display">
                <div class="content-header">
                    <div class="content-icon">${content.icon}</div>
                    <h3 class="content-title">${content.title}</h3>
                </div>
                <div class="content-body">
                    ${content.content}
                </div>
            </div>
        `;
        
        // Scroll to display area
        displayArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes popIn {
        0% { transform: scale(0) rotate(0deg); opacity: 0; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    
    @keyframes fadeOut {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
    }
    
    @keyframes orbit {
        from { transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg); }
        to { transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg); }
    }
    
    .element {
        display: inline-block;
        width: 60px;
        height: 60px;
        margin: 4px;
        background: #f0f0f0;
        border: 2px solid #ccc;
        border-radius: 8px;
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
    }
    
    .element:hover {
        background: #e0e0ff;
        transform: scale(1.1);
    }
    
    .element-symbol {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 1.2rem;
    }
    
    .element-number {
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: 0.8rem;
        color: #666;
    }
    
    .element-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        max-width: 300px;
        margin: 0 auto;
    }
    
    .element-details {
        background: #f0f4ff;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        border-left: 4px solid #3b82f6;
    }
    
    .animal-card {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        max-width: 400px;
        margin: 0 auto;
    }
    
    .animal-emoji {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    
    .animal-card h5 {
        font-family: var(--font-heading);
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--dark-navy);
    }
    
    .animal-sound {
        background: #f0f0f0;
        padding: 0.5rem;
        border-radius: 8px;
        margin-top: 1rem;
        font-style: italic;
    }
    
    .weather-widget {
        background: linear-gradient(135deg, #87CEEB, #98D8E8);
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
        color: white;
        margin: 1rem 0;
    }
    
    .weather-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    
    .weather-temp {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .weather-desc {
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }
    
    .weather-facts {
        background: #f0f4ff;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        border-left: 4px solid #3b82f6;
    }
`;
document.head.appendChild(additionalStyles);