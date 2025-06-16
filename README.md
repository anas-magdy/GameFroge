# GameFroge

A modern gaming platform built with Next.js and TypeScript, providing a seamless experience for gaming enthusiasts to discover, track, and manage their favorite games.

## Features

- User Authentication & Authorization
- Game Browsing & Search
- Personal Profile Management
- Watch List for Tracking Games
- Modern, Responsive UI with Radix UI Components
- Real-time Notifications
- Secure API Integration

## Tech Stack

- **Framework**: Next.js 15.3.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React & React Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anas-magdy/GameFroge.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Copy `.env.example` to `.env` and update the environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure

```
src/
├── app/              # Main application routes and pages
├── components/       # Reusable UI components
├── lib/              # Utility functions and configurations
├── middleware.ts     # Next.js middleware
├── models/           # MongoDB models
└── providers/        # Context providers
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Next.js Team
- Vercel
- Radix UI Team
- All contributors
