"use client";
import React, { useState } from "react";
import Column from "./components/Column";

// Eisenhower matrix data (with emojis for matrix view)
const eisenhowerData = [
  {
    title: "🔥 Urgent & Important (Immediate Deadlines)",
    tasks: [
      "📊 Data Project MVP (Due TODAY) (highest urgency today)",
      "📝 Report Meeting (Data Project) (tonight)",
      "🧥 Order Ali’s Hoodie (must order ASAP)",
      "🔬 Daily AR/AI Research (~30–45 mins, realistic today)",
      "📅 Two quizzes (complete early next week)",
      "🛡️ Security Beta Project (start soon, Apr 22)",
      "📈 Data Presentation (Apr 26)",
      "🤝 Team Project Check-in #4 (Apr 21)",
    ],
    headerClass: "bg-red-600 text-white",
  },
  {
    title: "📅 Important, Not Urgent (Strategic Progress)",
    tasks: [
      "🏕️ Plan End-of-May Cabin Trip",
      "🧑‍🤝‍🧑 Monthly Meetup Plans (Shelby/Baseball)",
      "📌 Regular Job Spreadsheet Updates",
      "💪 Short Daily Cardio/Core Exercise (~20–30 mins)",
      "💻 Resume Leetcode after Hackathon (after Apr 20) (clearly paused)",
      "🦷 Wisdom Teeth Appointment Scheduling",
      "✈️ Hackathon (Travel Apr 19–20, fully blocked)",
    ],
    headerClass: "bg-purple-600 text-white",
  },
  {
    title: "⚡ Urgent, Not Important (Quick Tasks)",
    tasks: [
      "💰 Deposit Cash (quick errand) (today)",
      "🌱 Water Jesse’s Plants (daily quick)",
      "🍽️ Ask Friends about May 1 Dinner (moved to tomorrow)",
    ],
    headerClass: "bg-yellow-400 text-gray-900",
  },
  {
    title: "🌿 Not Urgent, Not Important",
    tasks: [
      "📖 Casual Reading",
      "🎮 Casual Gaming/Relaxation",
      "🕶️ $200 Ant Farm Visualization (motivation boost)",
      "👗 Fashion Research (Reward)",
      "🐝 Optional Social (if energy)",
    ],
    headerClass: "bg-green-600 text-white",
  },
];

import { stripEmoji, shuffle } from "./utils/utils";

const allTasks: string[] = eisenhowerData.flatMap(col => col.tasks.map(stripEmoji));

export default function Home() {
  const [sorted, setSorted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [shuffledTasks, setShuffledTasks] = useState<string[] | null>(null);

  // Shuffle tasks only on client after mount
  React.useEffect(() => {
    setShuffledTasks(shuffle(allTasks));
  }, []);

  // Animation handler
  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => {
      setSorted(s => !s);
      setAnimating(false);
    }, 400); // Animation duration
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center py-8 px-2 transition-colors duration-500">
      <h1 className="text-3xl font-bold text-white mb-8">Eisenhower Todo Prototype</h1>
      <button
        className="mb-8 px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        onClick={handleToggle}
        disabled={animating}
      >
        {sorted ? "Back to List" : "Sort"}
      </button>
      <div
        className={`w-full flex justify-center items-start transition-all duration-500 ${
          animating ? "opacity-50 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {!sorted ? (
          <div className="w-full max-w-lg bg-neutral-800 rounded-lg shadow-lg p-6">
            {shuffledTasks === null ? (
              <div className="text-white text-center py-8">Loading...</div>
            ) : (
              <ul className="space-y-4">
                {shuffledTasks.map((task, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between bg-neutral-700 text-white rounded px-3 py-2 shadow-sm"
                  >
                    <span>{task}</span>
                    <span className="flex gap-2 opacity-60">
                      <span className="cursor-pointer select-none px-2 py-1 rounded bg-neutral-600">＋</span>
                      <span className="cursor-pointer select-none px-2 py-1 rounded bg-neutral-600">－</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 w-full max-w-7xl">
            {eisenhowerData.map((col) => (
              <Column
                key={col.title}
                title={col.title}
                tasks={col.tasks}
                headerClass={col.headerClass}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
