# 🎮 Two-Player Trivia Battle

A simple and fun browser-based trivia game where two players compete against each other by answering quiz questions from different categories and difficulty levels.

The game is built using **HTML, CSS, and Vanilla JavaScript** and uses **The Trivia API** to fetch real-time quiz questions.

---

# 📌 Features

- 👥 Two-player competitive gameplay
- 🧠 Multiple trivia categories
- 📈 Difficulty-based scoring system
- 🔄 Multiple game rounds
- ⚡ Real-time score updates
- 🎯 Turn-based question system
- 🎨 Clean and responsive UI
- 🌐 Live questions fetched from API

---

# 🕹️ How the Game Works

## 1. Enter Player Names
Both players enter their names before starting the game.

- Names cannot be empty
- Both names must be different

---

## 2. Choose a Category
Players select a trivia category for the current round.

Examples:
- Science
- History
- Sports
- Music
- Movies

---

## 3. Answer Questions
Each round contains:

- 2 Easy Questions
- 2 Medium Questions
- 2 Hard Questions

Players answer questions one by one in alternating turns.

---

# 🏆 Scoring System

| Difficulty | Points |
|---|---|
| Easy | 10 Points |
| Medium | 15 Points |
| Hard | 20 Points |

Correct answers add points to the player's score.

---

# 🔁 Game Flow

```text
Start Game
   ↓
Enter Player Names
   ↓
Choose Category
   ↓
Answer Questions
   ↓
Update Scores
   ↓
Next Round or End Game
   ↓
Show Final Winner