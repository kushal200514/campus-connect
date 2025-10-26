🔍 Lost & Found - Campus Item Recovery System
A modern web application that helps campus communities reunite lost items with their owners through an intuitive, gamified platform.

📖 Table of Contents
Overview

Features

Tech Stack

Getting Started

Project Structure

Available Scripts

Usage Guide

Data Models

Contributing

License

🎯 Overview
Lost & Found is a full-stack React application designed for campus environments where students and staff can:

Post found items with photos, descriptions, and locations

Browse available items by category

Submit claims with proof of ownership

Earn points through community participation

Built as part of SE Project 2 coursework, this application demonstrates modern React development practices, responsive design, and user-centered workflows.

✨ Features
For Item Finders
📸 Photo Upload - Capture or upload item photos

📍 Location Tagging - Record where items were found

🏷️ Category Selection - Organize by Electronics, Clothing, Keys, Wallets, Books, etc.

⭐ Point Rewards - Earn 10 points per posted item

📞 Contact Sharing - Optional contact information

For Item Claimants
🔎 Browse Items - View all found items with filtering

📄 Item Details - See full information, photos, and status

✅ Claim Submission - Submit ownership proof with optional photos

📊 Status Tracking - Monitor claim status (Pending/Approved/Rejected)

User Experience
🎨 Modern UI - Clean, responsive design with Tailwind CSS

📱 Mobile-First - Works seamlessly on all devices

🎮 Gamification - Points system for engagement

🏆 User Profile - Track your posted items and claims

🛠️ Tech Stack
Frontend
React 18.2.0 - Modern UI library with hooks

React Router DOM 6.17.0 - Client-side routing

Vite 4.5.0 - Fast build tool and dev server

UI & Styling
Shadcn UI - Component library (Card, Button, Input, etc.)

Tailwind CSS - Utility-first styling

Lucide React - Icon library

date-fns 2.30.0 - Date formatting

State & Data
React Hooks - useState, useEffect

JSON Schema - Data validation

Entity Models - LostItem, Claim, User

🚀 Getting Started
Prerequisites
Node.js (v16 or higher)

npm (v7 or higher)

Installation
Clone the repository

bash
git clone <your-repo-url>
cd "se project 2"
Install dependencies

bash
npm install
If you need to install specific packages:

bash
npm install react react-dom react-router-dom lucide-react date-fns
npm install --save-dev vite @vitejs/plugin-react
Running the App
Start development server:

bash
npm run dev
Open http://localhost:5173 in your browser.

Build for production:

bash
npm run build
Preview production build:

bash
npm run preview
📁 Project Structure
text
se-project-2/
├── index.html                    # Entry HTML
├── package.json                  # Dependencies & scripts
├── vite.config.js               # Vite configuration
└── src/
    ├── main.jsx                 # App entry point
    ├── app.jsx                  # Root component with routes
    ├── index.css                # Global styles
    ├── utils.js                 # Helper functions
    │
    ├── components/              # Reusable components
    │   ├── Layout.jsx          # Navigation & layout wrapper
    │   ├── claims/
    │   │   └── ClaimForm.jsx   # Claim submission form
    │   └── upload/
    │       └── PhotoUpload.jsx # Image upload component
    │
    ├── pages/                   # Route pages
    │   ├── home.jsx            # Browse items page
    │   ├── PostItem.jsx        # Post found item
    │   ├── ItemDetails.jsx     # Item details & claim
    │   ├── myclaims.jsx        # User's claims
    │   └── profile.jsx         # User profile
    │
    └── entities/                # Data models
        ├── LostItem.js         # Lost item entity
        ├── Claim.js            # Claim entity
        └── User.js             # User entity
📜 Available Scripts
Command	Description
npm run dev	Start development server with hot reload
npm run build	Build optimized production bundle
npm run preview	Preview production build locally
📖 Usage Guide
Posting a Found Item
Navigate to "Post Item"

Fill in:

Item name (e.g., "Blue Backpack", "iPhone 12")

Detailed description

Upload photo

Location found

Date found

Category

Contact info (optional)

Click "Post Found Item"

Receive 10 points reward!

Claiming an Item
Browse items on Home page

Click on an item to view Item Details

Click "Claim This Item"

Fill out claim form:

Your name

Contact information

Proof of ownership description

Upload proof photo (optional)

Additional details

Submit claim

Wait for finder verification

Item Status Flow
text
Available → Claimed → Returned
Available - Item is unclaimed, can submit claim

Claimed - Item has active claim, being verified

Returned - Item successfully returned to owner

📊 Data Models
LostItem Schema
javascript
{
  title: String,              // "Blue Backpack"
  description: String,        // Detailed description
  photo_url: String,         // Uploaded image URL
  location_found: String,    // "Library 2nd floor"
  date_found: Date,          // ISO date string
  category: String,          // "bags", "electronics", etc.
  status: String,            // "available", "claimed", "returned"
  finder_contact: String     // Optional contact info
}
Categories:
electronics, clothing, accessories, books, keys, cards, wallet, bags, waterbottle, other

Claim Schema
javascript
{
  item_id: String,           // Reference to LostItem
  claimer_name: String,      // Full name
  claimer_contact: String,   // Email or phone
  proof_description: String, // How they can prove ownership
  proof_photo_url: String,   // Optional proof image
  additional_details: String,// Extra information
  status: String             // "pending", "approved", "rejected"
}
User Schema
javascript
{
  name: String,
  email: String,
  points: Number,            // Gamification points
}
🎨 Design System
Color Palette
Primary: Blue (#2563eb) - Trust, reliability

Success: Green (#16a34a) - Successful claims

Warning: Amber (#d97706) - Points, rewards

Neutral: Slate gray scale

Category Colors
Each category has unique badge colors for easy identification:

Electronics: Blue

Clothing: Purple

Accessories: Pink

Books: Green

Keys: Yellow

Cards: Red

Wallet: Amber

Bags: Indigo

Water Bottle: Cyan

🔧 Configuration
Vite Config (vite.config.js)
javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
Path Alias: Use @/ instead of ./src/

javascript
// Instead of: import { LostItem } from './src/entities/LostItem'
import { LostItem } from '@/entities/LostItem'
🐛 Troubleshooting
Common Issues
1. npm run dev shows "Missing script" error

Make sure package.json has the "dev": "vite" script

Run npm install to ensure dependencies are installed

2. Import errors with ./components/Layout

Ensure Layout.jsx exists in src/components/

Check file name capitalization (Windows vs. case-sensitive systems)

3. 404 error on localhost:5173

Make sure index.html exists in project root

Verify src/main.jsx exists and renders App

🤝 Contributing
This is a student project for SE Project 2.

For bug reports or feature requests:

Check existing issues

Create a new issue with detailed description

Submit pull requests with clear commit messages

👨‍💻 Author
Kushal S

Second-year Engineering Student

Database & API Architect

Software Engineering Coursework

📄 License
This project is created for educational purposes as part of Software Engineering coursework.

🙏 Acknowledgments
Shadcn UI - Beautiful component library

Lucide React - Icon system

Vite - Fast development experience

React Team - Excellent documentation

SE Course Instructors - Project guidance

📅 Project Timeline: October 2025
🎓 Course: Software Engineering (SE Project 2)
🏫 Institution: Engineering College

Built with ❤️ by Kushal S
