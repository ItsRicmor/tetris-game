# Tetris Game

A modern, responsive implementation of the classic Tetris block-stacking puzzle game built with Next.js, TypeScript, and Tailwind CSS.

![Tetris Game](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## Features

- **Classic Gameplay**: Authentic Tetris experience with all standard mechanics
- **Color-Coded Pieces**: Each Tetromino type has a unique, consistent color
- **Ghost Piece**: Visual preview showing where pieces will land
- **Mobile-First Design**: Fully responsive with touch controls for mobile devices
- **Fullscreen Mode**: Immersive gaming experience on any device
- **Theme Support**: Light and dark themes matching portfolio aesthetic
- **Keyboard Controls**: Full keyboard support for desktop play
- **Hold Mechanism**: Strategy-enhancing piece hold system
- **Real-time Stats**: Track score, level, lines cleared, and next pieces

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tetris-game

# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## How to Play

### Desktop Controls

- **Arrow Keys (← →)**: Move piece left/right
- **Arrow Up (↑) / Z**: Rotate piece clockwise
- **Arrow Down (↓)**: Soft drop (faster fall)
- **Space**: Hard drop (instant placement)
- **C**: Hold current piece
- **P**: Pause/Resume game
- **R**: Restart game

### Mobile Controls

Touch-optimized button controls are provided on mobile devices for all game actions.

## Project Structure

```
tetris-game/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with SEO metadata
│   ├── page.tsx                 # Landing page
│   ├── tetris/page.tsx          # Tetris game page
│   └── globals.css              # Global styles with Tailwind
├── features/tetris/             # Tetris feature module
│   ├── TetrisClient.tsx         # Main game component
│   ├── components/              # UI components
│   │   ├── Board.tsx            # Game board with ghost piece
│   │   ├── TouchControls.tsx    # Mobile touch controls
│   │   ├── Stats.tsx            # Score/level display
│   │   ├── HoldDisplay.tsx      # Hold piece display
│   │   ├── NextQueue.tsx        # Next pieces queue
│   │   ├── GameStatus.tsx       # Game state messages
│   │   └── Controls.tsx         # Controls reference
│   ├── hooks/                   # Custom React hooks
│   │   ├── useGameLoop.ts       # Game loop with requestAnimationFrame
│   │   ├── useKeyboardControls.ts # Keyboard event handling
│   │   ├── useIsMobile.ts       # Mobile device detection
│   │   └── useFullscreen.ts     # Fullscreen API wrapper
│   └── context/
│       └── ThemeContext.tsx     # Theme system with query param support
└── packages/tetris-engine/      # Game engine (domain logic)
    └── src/
        ├── domain/              # Core game logic
        │   ├── game/           # Game state management
        │   ├── board/          # Board operations
        │   ├── pieces/         # Tetromino definitions
        │   ├── movement/       # Movement service
        │   └── rotation/       # Rotation system
        └── application/
            └── snapshot.ts      # Game state snapshot types
```

## Architecture

### Clean Architecture

The project follows clean architecture principles with clear separation of concerns:

- **Domain Layer** (`packages/tetris-engine`): Pure TypeScript game logic, no framework dependencies
- **Application Layer** (`features/tetris`): React components and hooks
- **Presentation Layer** (`app`): Next.js pages and routing

### Key Design Decisions

1. **Modular Components**: UI broken into small, reusable components
2. **Custom Hooks**: Game logic separated into focused hooks
3. **Theme System**: Centralized theming with light/dark mode support
4. **Responsive Design**: Mobile-first approach with adaptive layouts
5. **Type Safety**: Full TypeScript coverage with strict mode

## Theming

The game supports light and dark themes that can be controlled via query parameters:

```
# Light theme
/tetris?theme=light

# Dark theme
/tetris?theme=dark
```

This allows seamless integration into iframes with matching themes.

### Color Palette

- **I (Cyan)**: `#06b6d4` / `#22d3ee`
- **O (Yellow)**: `#eab308` / `#facc15`
- **T (Purple)**: `#a855f7` / `#c084fc`
- **S (Green)**: `#22c55e` / `#4ade80`
- **Z (Red)**: `#ef4444` / `#f87171`
- **J (Blue)**: `#3b82f6` / `#60a5fa`
- **L (Orange)**: `#f97316` / `#fb923c`

## Technologies

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Testing**: Jest + React Testing Library

## Testing

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

## License

This project is open source and available under the MIT License.

## Author

**Ricardo Morataya**

- Portfolio: [ricmor.dev](https://ricmor.dev)
