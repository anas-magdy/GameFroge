import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/lib/nextAuth";
import Image from "next/image";
import Link from "next/link";
import { Heart, Users } from "lucide-react";

async function ProfilePage() {
    // Fetch the session to get user information (Server-side)
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Mock data for demonstration - in a real app, fetch this from your database
  const playerStats = {
    level: 42,
    xp: 8750,
    nextLevelXp: 10000,
    gamesPlayed: 128,
    gamesWon: 87,
    achievements: [
      { id: 1, name: "First Victory", icon: "🏆", unlocked: true },
      { id: 2, name: "Dedicated Gamer", icon: "🎮", unlocked: true },
      { id: 3, name: "Unbeatable", icon: "⚡", unlocked: false },
      { id: 4, name: "Collector", icon: "🎯", unlocked: true },
      { id: 5, name: "Legend", icon: "👑", unlocked: false },
    ],
    recentGames: [
      { id: 1, name: "Cyberpunk Adventure", date: "2 days ago", score: 950 },
      { id: 2, name: "Space Explorers", date: "5 days ago", score: 720 },
      { id: 3, name: "Fantasy Quest", date: "1 week ago", score: 840 },
    ],
  };

  // Calculate win rate percentage
  const winRate =
    playerStats.gamesPlayed > 0
      ? Math.round((playerStats.gamesWon / playerStats.gamesPlayed) * 100)
      : 0;

  // Calculate XP progress percentage
  const xpProgress = Math.round(
    (playerStats.xp / playerStats.nextLevelXp) * 100
  );

  return user ? (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Section */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-indigo-500/30 mb-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user?.name || "Profile"}
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-4xl font-bold">
                    {user?.name?.charAt(0) || "?"}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 h-6 w-6 rounded-full border-2 border-gray-800 z-10" />

              {/* Level Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-amber-400/50 flex items-center gap-1">
                <span className="text-white">LVL {playerStats.level}</span>
              </div>
            </div>

            {/* User Info Section */}
            <div className="md:flex-1 text-center md:text-left relative z-10">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {user?.name || "Welcome, Gamer!"}
              </h1>

              <div className="flex items-center justify-center md:justify-start text-gray-300 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm md:text-base">
                  {user?.email || "No email provided"}
                </span>
              </div>

              {/* XP Progress Bar */}
              <div className="mb-6 max-w-md mx-auto md:mx-0">
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>
                    XP: {playerStats.xp}/{playerStats.nextLevelXp}
                  </span>
                  <span>{xpProgress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md mx-auto md:mx-0">
                <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-3 text-center hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
                  <div className="text-2xl font-bold text-indigo-400">
                    {playerStats.gamesPlayed}
                  </div>
                  <div className="text-xs text-gray-400">Games Played</div>
                </div>
                <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-3 text-center hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
                  <div className="text-2xl font-bold text-green-400">
                    {playerStats.gamesWon}
                  </div>
                  <div className="text-xs text-gray-400">Games Won</div>
                </div>
                <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-3 text-center hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
                  <div className="text-2xl font-bold text-amber-400">
                    {winRate}%
                  </div>
                  <div className="text-xs text-gray-400">Win Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/games"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition shadow-lg shadow-indigo-600/30 font-medium flex items-center gap-2"
            >
              <Users className="h-5 w-5" />
              Play New Game
            </Link>
            <Link
              href="/watch-list"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition shadow-lg border border-gray-600 font-medium flex items-center gap-2"
            >
              <Heart className="h-5 w-5 " />
              My Wishlist
            </Link>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Achievements
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {playerStats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-gray-800 to-gray-700 border-yellow-500/30 shadow-md"
                      : "bg-gray-800/40 border-gray-700 opacity-60"
                  }`}
                >
                  <div
                    className={`text-2xl ${
                      achievement.unlocked ? "text-yellow-400" : "text-gray-500"
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-xs text-gray-400">
                      {achievement.unlocked ? "Unlocked" : "Locked"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Games Section */}
          <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Recent Games
            </h2>

            <div className="space-y-4 relative z-10">
              {playerStats.recentGames.map((game) => (
                <div
                  key={game.id}
                  className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 border border-indigo-500/20 shadow-md hover:border-indigo-500/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-lg">{game.name}</div>
                    <div className="text-xs text-gray-400">{game.date}</div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm text-gray-300">Score</div>
                    <div className="text-lg font-bold text-indigo-400">
                      {game.score}
                    </div>
                  </div>
                </div>
              ))}

              <Link
                href="/history"
                className="block text-center text-sm text-indigo-400 hover:text-indigo-300 mt-4 transition"
              >
                View all game history →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Please Sign In</h1>
      <p className="text-lg mb-6">
        You need to be signed in to view your profile.
      </p>
      <Link
        href="/auth/login"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
      >
        Sign In
      </Link>
    </div>
  );
}

export default ProfilePage;
