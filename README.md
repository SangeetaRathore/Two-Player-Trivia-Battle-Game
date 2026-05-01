# Two-Player Trivia Battle Game

A fun and interactive two-player trivia game built with HTML, CSS, and JavaScript. Players compete across multiple rounds, answering questions from various categories with increasing difficulty levels.

## Features

- **Two-Player Mode**: Enter names for both players and compete head-to-head
- **Multiple Rounds**: Play up to multiple rounds with different categories
- **Category Selection**: Choose from various trivia categories fetched from The Trivia API
- **Difficulty Levels**: Questions range from Easy (10 points), Medium (15 points), to Hard (20 points)
- **Real-Time Scoring**: Track scores throughout the game with instant feedback
- **Responsive Design**: Clean, modern UI that works on different screen sizes
- **Turn-Based Gameplay**: Alternating turns between players for fair competition

## How to Play

1. **Setup**: Enter unique names for both players
2. **Category Selection**: Choose a trivia category for the round
3. **Gameplay**: Answer questions alternately - 2 easy, 2 medium, and 2 hard per round
4. **Scoring**: Earn points based on difficulty (Easy: 10pts, Medium: 15pts, Hard: 20pts)
5. **Rounds**: Continue to next round or end game after each round
6. **Winner**: Player with the highest score wins!

## Installation & Running

1. Clone or download the project files
2. Open `index.html` in any modern web browser
3. No additional setup required - the game runs entirely in the browser

## Technologies Used

- **HTML5**: Structure and layout
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Game logic and API integration
- **The Trivia API**: Source of trivia questions and categories

## API Reference

This game uses [The Trivia API](https://the-trivia-api.com/) for fetching questions and categories.

- Categories endpoint: `https://the-trivia-api.com/v2/categories`
- Questions endpoint: `https://the-trivia-api.com/v2/questions?categories={category}&difficulties={difficulty}&limit={limit}`






