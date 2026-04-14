# 🤖 AI Memory Agent with Veto Control

An interactive AI-powered memory matching game built during Global Hack Week, featuring secure authentication and a simulated approval-based AI action system.

## 🚀 Live Demo
https://ghw-ai-game-5jchr52c1-c6b02adritobandyopadhyay-6732s-projects.vercel.app/
---

## 🧠 Core Idea

This project demonstrates how AI agents can be designed to **respect user control and security** by requiring explicit approval before executing sensitive actions.

Inspired by Auth0’s concepts like **Token Vault** and **Asynchronous Authorization (CIBA)**.

---

## ✨ Features

- 🔐 **Secure Authentication** using Auth0
- 🎮 **Memory Matching Game** built with React
- 🧠 **AI Agent Simulation**
- ⚠️ **Veto System for Sensitive Actions**
  - AI suggests a critical action
  - User must explicitly approve or deny
- 🎨 Clean and responsive UI
- 🌐 Fully deployed on Vercel

---

## 🛠️ Tech Stack

- React.js
- Auth0 (Authentication)
- Vercel (Deployment)

---

## ⚙️ How It Works

1. User logs in securely
2. Plays a memory matching game
3. AI agent can trigger a sensitive action (e.g., reset game)
4. App pauses execution and asks for user approval
5. Only after approval → action executes

---

## 🔐 Security Concept

This project simulates:

- **Token Vault idea** → secure handling of user access
- **Asynchronous Authorization** → user approval required before critical operations

---

## 📚 What I Learned

- Implementing OAuth authentication with Auth0
- Managing state and game logic in React
- Designing user-controlled AI interactions
- Handling real-world deployment issues
- Building secure-by-design applications

---

## 🔥 Future Improvements

- Real backend with token storage
- Push notifications for approval
- Integration with real APIs (Google Drive, Slack)
- Leaderboard and difficulty levels

---

## 🏁 Conclusion

This project explores how AI systems can remain powerful while still being **safe, transparent, and user-controlled**.
