import React from "react";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center py-8 px-2">
      <h1 className="text-3xl font-bold text-white mb-8">Eisenhower Matrix</h1>
      <div className="grid grid-cols-4 gap-6 w-full max-w-7xl">
        {eisenhowerData.map((col, idx) => (
          <div
            key={col.title}
            className="flex flex-col rounded-lg shadow-lg bg-neutral-800"
          >
            <div
              className={`p-4 rounded-t-lg font-semibold text-lg text-center ${col.headerClass}`}
            >
              {col.title}
            </div>
            <ul className="flex-1 p-4 space-y-3">
              {col.tasks.map((task, i) => (
                <li
                  key={i}
                  className="bg-neutral-700 text-white rounded px-3 py-2 shadow-sm flex items-center"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
