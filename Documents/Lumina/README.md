# Lumina

A modern, glassmorphic social media platform inspired by "Fregier Aero" aesthetics.

## Features
- User accounts: Sign up, login, logout
- User profiles: Bio, avatar, customizable backgrounds and layouts
- Main feed: View and create posts (text/images)
- Post editing and deletion
- Friend lists: Add/remove friends, friend counts
- Bulletin boards/wall posts
- Comments and guestbooks
- Photo albums: Grid/slideshow views
- Messaging system: Inbox/outbox
- Customizable avatars (pixel art, GIFs)
- Like/rating system (Favorites, Kudos)
- Groups/forums for community discussions
- Top Friends/Featured users
- Music player with curated playlist
- Legal, Terms of Service, and Privacy Policy pages
- Cookie consent and ad blocker detection

## Tech Stack
- **Frontend:** React, React Router DOM, Axios
- **Styling:** Custom CSS (glassmorphism, "Fregier Aero" style)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, bcryptjs

## Folder Structure
```
Lumina/
  backend/         # Express.js backend (API, models, routes)
  public/          # Static files (index.html, fonts)
  src/             # React frontend (components, styles)
  images/          # Backgrounds and site images
  README.md        # This file
  package.json     # Frontend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### Installation
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Lumina
   ```
2. **Install frontend dependencies:**
   ```sh
   npm install
   ```
3. **Set up the backend:**
   ```sh
   cd backend
   npm install
   cp .env.example .env # Create your .env file and set MONGO_URI, JWT_SECRET
   node server.js
   ```
4. **Run the frontend:**
   ```sh
   cd ..
   npm start
   # or use your preferred static server for the 'public' folder
   ```

### Environment Variables (Backend)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT authentication

## Usage
- Visit `http://localhost:3000` (or your configured port) for the frontend.
- Backend runs on `http://localhost:5000` by default.
- Register a new account, customize your profile, and explore all features!

## Credits
- Developed by **exovm**
- Inspired by the "Fregier Aero" and glassmorphism design trends
- Music player playlist inspired by [frutigeraeroarchive.org/music](https://frutigeraeroarchive.org/music)

---

For questions or support, contact: discordtufe@gmail.com 