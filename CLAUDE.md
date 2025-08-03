# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is **Dhruv's Space Adventure** - a space-themed personal website for Dhruv, a 9-year-old 4th-grade student from Michigan. The website combines a cosmic aesthetic with interactive elements, animations, and engaging content about Dhruv's interests, dreams, and personality.

## Project Structure

```
C:\Code\dhruv-site\
├── index.html                 # Main space-themed homepage with all sections
├── css/
│   ├── main.css              # Complete space-themed styles and animations
│   ├── about.css             # About page specific styles (legacy)
│   └── learning.css          # Learning hub specific styles (legacy)
├── js/
│   ├── main.js               # Core interactive JavaScript functionality
│   ├── about.js              # About page interactive features (legacy)
│   └── learning.js           # Learning hub games and activities (legacy)
├── pages/
│   ├── about.html            # Legacy about page (different from main site)
│   └── learning.html         # Legacy learning page (different from main site)
└── CLAUDE.md                 # This file
```

## Development Commands

This is a static HTML/CSS/JavaScript website with no build process:

- **Local Development**: Open `index.html` directly in browser or use live server
- **Live Server**: `python -m http.server 8000` or VS Code Live Server extension
- **Testing**: Manual cross-browser testing (Chrome, Firefox, Safari, Edge)

## Architecture & Design

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Custom Properties, CSS Animations
- **Fonts**: Google Fonts (Orbitron for display, Space Grotesk for body text)
- **Icons**: Unicode emojis and space-themed symbols

### Space Theme Design System
- **Primary Colors**: Space Blue (#70A1D7), Cosmic Green (#A1DE93), Stellar Yellow (#F7F48B), Nebula Coral (#F47C7C)
- **Background**: Dark space theme (#0B0D17) with starfield animations
- **Typography**: Orbitron for headings (sci-fi), Space Grotesk for body text
- **Layout**: Single-page application with smooth scrolling sections

### Core Interactive Features
1. **Custom Cursor**: Space-themed cursor with trail effect
2. **Starfield Background**: Animated twinkling stars and cosmic particles
3. **Floating Animations**: Planets, emojis, and space elements
4. **Smooth Scrolling Navigation**: Section-based navigation with active states
5. **Interactive Tabs System**: Multiple content areas within sections
6. **Modal System**: Surprise modal with rotating fun facts
7. **Guestbook**: Interactive message system
8. **Easter Eggs**: Konami code and surprise unlocking system

## Website Structure

### Single Page Application (index.html)
The main website is a single-page application with multiple sections:

1. **Hero Section** (`#home`)
   - Animated astronaut Dhruv with speech bubble
   - Floating planets and cosmic particles
   - Interactive buttons with hover effects

2. **About Section** (`#about`)
   - Personal information cards with hover animations
   - Subject pills (Math, Science, ELA, Gym, Music)
   - Heroes showcase (Superman, Flash, Dad, RRR movie)

3. **Interests Section** (`#interests`)
   - Tabbed interface: Sports & Games, Reading Corner, Weekend Fun, Entertainment
   - Featured cricket passion with special styling
   - Book collection with Wings of Fire as favorite
   - Game pills (Fortnite, Roblox, Minecraft)

4. **Dreams Section** (`#dreams`)
   - Mega dream: Becoming an elemental lion with cosmic powers
   - Grid of future career dreams (cricket player, neurologist, space travel)
   - Current goal with animated progress bar

5. **Guestbook Section** (`#guestbook`)
   - Interactive form for visitor messages
   - Messages display with space explorer theme
   - Real-time message addition with animations

### Legacy Pages (pages/ directory)
- `about.html` and `learning.html` are older versions with different styling
- These use separate CSS files (`about.css`, `learning.css`) and JavaScript
- Main focus should be on the single-page `index.html`

## JavaScript Architecture

### Core Systems (main.js - 782 lines)
1. **Navigation System**: Mobile hamburger menu, smooth scrolling, active link updates
2. **Starfield Animation**: Dynamic star generation with random colors and twinkling
3. **Custom Cursor**: Space-themed cursor with trail effect and hover interactions
4. **Tabs System**: Interactive content switching in the interests section
5. **Modal System**: Surprise modal with rotating fun facts carousel
6. **Guestbook System**: Form handling and message display with animations
7. **Scroll Effects**: Parallax scrolling and intersection observer animations

### Special Features
- **Easter Eggs**: Konami code (↑↑↓↓←→←→BA) transforms astronaut into elemental lion
- **Sound System**: Console-based sound effects (hover, click, tab, surprise, success)
- **Notification System**: Animated toast notifications with space theme
- **Performance**: Throttled scroll events and optimized animations

### Key Interactive Elements
- Power hover effects with rotation and scaling
- Book card clicks show themed quotes
- Sparkle effects on surprise activation
- Elemental effects for Konami code easter egg

## CSS Architecture

### Design System (main.css - 2010 lines)
- **CSS Custom Properties**: Comprehensive design token system with colors, spacing, typography
- **Component-Based**: Modular styling for cards, buttons, sections, and interactive elements
- **Space Theme**: Dark backgrounds, glowing effects, and cosmic color palettes
- **Responsive**: Mobile-first design with breakpoints at 480px, 768px, and 1600px+

### Animation Framework
- **Keyframe Animations**: 25+ custom animations (float, twinkle, bounce, orbit-spin, etc.)
- **Hover Effects**: Transform, scale, and glow effects on interactive elements  
- **Scroll Animations**: Parallax effects and intersection observer triggers
- **Special Effects**: Sparkle, elemental, and shooting star animations

### Key CSS Features
- Custom cursor implementation with pointer-events management
- Starfield background with multiple animated layers
- Advanced button effects with gradient backgrounds and shine animations
- Complex card layouts with hover transformations and glow effects

## Content & Personality

### Dhruv's Profile
- **Age**: 9 years old, 4th grade student from Michigan, USA
- **Family**: Lives with dad, mom, and one sister
- **Biggest Dream**: Becoming an elemental lion with cosmic powers (🦁⚡)
- **Career Aspirations**: Professional cricket player or neurologist
- **Favorite Book Series**: Wings of Fire (graphic novels)
- **Games**: Fortnite, Roblox, Minecraft, chess, board games
- **Heroes**: Superman, Flash, his dad, and RRR movie

### Content Themes
- **Space Adventure**: Cosmic aesthetics with astronaut persona
- **Personal Interests**: Cricket passion, reading, gaming, family
- **Dreams & Goals**: Ambitious future plans and current progress
- **Interactive Elements**: Guestbook for visitor engagement
- **Safe Content**: Age-appropriate, family-friendly design

## Browser Compatibility & Performance

- **Target Browsers**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Support**: Responsive design with touch-friendly interactions
- **Performance**: Throttled scroll events, optimized animations, minimal dependencies
- **Accessibility**: Reduced motion support, keyboard navigation, semantic HTML

## Development Guidelines

### Code Organization
- **Single Source of Truth**: `index.html` is the main application
- **Legacy Support**: Keep `pages/` directory for historical reference
- **Component-Based CSS**: Use BEM-like methodology for class naming
- **JavaScript Modules**: Organize functionality into logical sections

### Design Principles
1. **Space Theme Consistency**: Maintain cosmic aesthetic across all elements
2. **Interactive Feedback**: Provide visual/audio feedback for all interactions
3. **Performance First**: Optimize animations and minimize reflows
4. **Mobile-First**: Design for touch and small screens first
5. **Kid-Safe**: All content appropriate for 9-year-old audience

### Content Guidelines
- **Personal Voice**: Write from Dhruv's perspective with enthusiasm
- **Age-Appropriate**: Content suitable for 4th-grade level
- **Family-Friendly**: No external links without supervision
- **Authentic**: Reflect genuine interests and personality