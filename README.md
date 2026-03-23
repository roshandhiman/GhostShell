# 🧠 GhostShell

GhostShell is a modern desktop terminal application built using Electron, xterm.js, and node-pty.

It provides a real system shell inside a custom UI with support for multiple tabs and a clean developer-focused experience.

---

## 🚀 Features

- 🖥️ Real terminal (bash/zsh via node-pty)
- ⚡ Fast rendering using xterm.js
- 🗂️ Multi-tab support (CMD + T)
- 🎨 Modern dark UI (GitHub-style theme)
- 🔗 IPC communication (Electron main ↔ renderer)
- 💻 Works like a real system terminal

---

## 🧰 Tech Stack

- Electron
- xterm.js
- node-pty
- Node.js

---

## 📦 Installation

Clone the repository:

git clone https://github.com/roshandhiman/GhostShell.git
cd GhostShell

Install dependencies:

npm install

Run the app:

npm start

---

## ⌨️ Shortcuts

- New Tab → CMD + T
- Type commands like a normal terminal
- Supports all system commands (ls, pwd, clear, etc.)

---

## ⚠️ Important

- node_modules is ignored (not pushed to GitHub)
- If app doesn't start, run:

npm rebuild

---

## 🧠 How It Works

- node-pty runs a real shell (bash/zsh)
- xterm.js renders terminal UI
- Electron connects frontend and backend using IPC

---

## 🔮 Future Improvements

- Tab close / rename
- Split terminal view
- Theme switcher (Kali / Hacker / Light)
- Command autocomplete
- Settings panel
- Packaging (.dmg / .exe)

---

## 👨‍💻 Author

Made with ❤️ by Roshanpreet Singh and Mathely Mittal

---

## ⭐ Support

If you like this project, give it a star ⭐ on GitHub
