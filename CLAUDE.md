# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is **Dhruv's Amazing World** - a vibrant, interactive personal website for a brilliant 4th-grade student. It's designed as a digital playground that combines fun, learning, and creativity, featuring educational content, games, and interactive elements.

## Project Structure

```
/Users/ngsankar/dev/dhruvweb/
├── index.html                 # Homepage with hero section and daily features
├── css/
│   ├── main.css              # Core styles, animations, and responsive design
│   ├── about.css             # About page specific styles
│   └── learning.css          # Learning hub specific styles
├── js/
│   ├── main.js               # Core JavaScript functionality
│   ├── about.js              # About page interactive features
│   └── learning.js           # Learning hub games and activities
├── pages/
│   ├── about.html            # About Me page with hobbies and achievements
│   ├── learning.html         # Smart Tips & Tricks Hub
│   ├── quizzes.html          # Quizzes & Challenges Arena (to be created)
│   ├── youtube.html          # YouTube Channel Showcase (to be created)
│   └── friends.html          # Friends & Guestbook (to be created)
├── images/                   # Directory for avatars and visual assets
└── .claude/
    └── settings.local.json   # Claude Code configuration
```

## Development Commands

Since this is a static HTML/CSS/JavaScript website, no build tools are required:

- **Local Development**: Open `index.html` in a web browser or use a local server
- **Live Server**: Use VS Code Live Server extension or `python -m http.server 8000`
- **Testing**: Manual testing across different browsers and devices

## Architecture & Design

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Variables, and CSS Animations
- **Fonts**: Google Fonts (Comic Neue, Fredoka One, Nunito)
- **Icons**: Unicode emojis and symbols for kid-friendly design

### Design System
- **Primary Colors**: Electric Blue (#3b82f6), Sunshine Yellow (#fbbf24), Energetic Orange (#fb923c), Fresh Green (#22c55e)
- **Secondary Colors**: Purple Magic (#8b5cf6), Pink Fun (#ec4899), Turquoise (#06b6d4)
- **Typography**: Large, readable fonts with playful character
- **Layout**: Mobile-first responsive design with interactive animations

### Key Features
1. **Interactive Navigation**: Hamburger menu with smooth transitions
2. **Hero Section**: Animated avatar, floating shapes, and call-to-action buttons
3. **Daily Features**: Brain busters, idiom of the day, science facts
4. **Subject Cards**: Math, Science, Language Arts, Social Studies, AI, and Art
5. **Sound Effects**: Button clicks, success sounds, and audio feedback
6. **Animations**: CSS keyframes, hover effects, and scroll-based animations
7. **Responsive Design**: Optimized for mobile, tablet, and desktop

## Page-Specific Features

### Homepage (index.html)
- Animated hero section with floating shapes
- Daily challenge widgets (brain buster, idiom, science fact)
- Quick access cards to different sections
- Animated statistics counter
- Sound effects and interactive elements

### About Me (about.html)
- Customizable avatar with expressions, hat, and glasses
- Interactive hobbies showcase (chess, cricket, YouTube, Rubik's cube)
- Rotating fun facts carousel with touch gestures
- Achievement gallery with celebration animations
- Progress tracking for personal goals

### Learning Hub (learning.html)
- Subject-based learning cards with interactive activities
- Math Magic: Number tricks, times tables, fraction pizza, geometry builder
- Science Spectacular: Periodic table, solar system, animal facts, weather station
- Language Arts Lab: Story starters, idioms corner, grammar games
- Daily learning challenge with brain teasers
- Progress tracking across different subjects

## JavaScript Architecture

### Core Functionality (main.js)
- Navigation menu toggle and smooth scrolling
- Animation observers and intersection observers
- Statistics counter animations
- Sound effects system with audio management
- Page transition effects and lazy loading
- Mobile-responsive adjustments

### Interactive Features
- **Avatar Customization**: Expression changing, accessory toggling
- **Game Logic**: Chess pieces, cricket animation, Rubik's cube solver
- **Educational Activities**: Math tricks, fraction visualization, story generation
- **Progress Tracking**: Learning progress bars and achievement systems

## CSS Architecture

### Utility Classes
- CSS Variables for consistent theming
- Responsive breakpoints (768px, 480px)
- Animation classes (fadeInUp, slideInLeft, bounce, etc.)
- Component-based styling approach

### Animation System
- Keyframe animations for floating, bouncing, and rotating effects
- Hover and click interactions with transform and scale effects
- Scroll-based parallax animations
- Loading and transition animations

## Content Strategy

### Educational Value
- Age-appropriate content for 4th-grade level (9-year-old)
- Curriculum-aligned learning objectives
- Progressive difficulty levels
- Critical thinking puzzles and challenges

### Engagement Tactics
- Immediate visual and audio feedback
- Gamification with points and achievements
- Social elements (safe guestbook, friend features)
- Regular content updates and daily challenges

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers
- Touch-friendly interactions for tablets and phones

## Future Enhancements

### Planned Features
1. **Quizzes & Challenges Arena**: Interactive quiz games with scoring
2. **YouTube Channel Showcase**: Embedded videos from RoyalIQFun channel
3. **Friends & Guestbook**: Safe social features for kids
4. **More Learning Activities**: Expanded subject content and games
5. **Progress Persistence**: Local storage for tracking achievements

### Technical Improvements
- Service worker for offline functionality
- Progressive Web App (PWA) features
- Performance optimization and code splitting
- Accessibility enhancements (ARIA labels, keyboard navigation)

## Development Guidelines

1. **Kid-Safe Design**: All content appropriate for elementary school students
2. **Performance First**: Optimize images, minimize JavaScript, efficient animations
3. **Accessibility**: High contrast, large buttons, screen reader support
4. **Mobile-First**: Design for touch interactions and small screens
5. **Educational Value**: Every feature should contribute to learning
6. **Fun Factor**: Maintain playful, engaging, and colorful design
7. **Safety**: No external links without parental controls, moderated content

## File Maintenance

- Keep CSS organized by component and page
- JavaScript functions should be well-documented with clear naming
- Images should be optimized for web (WebP format when possible)
- Regular testing across different devices and browsers
- Update content regularly to maintain engagement