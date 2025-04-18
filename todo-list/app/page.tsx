"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Eisenhower matrix data (with emojis for matrix view)
const initialEisenhowerData = [
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

/**
 * Flatten and strip emojis for the combined list
 */
function stripEmoji(task: string): string {
  return task.replace(/^[^\w\d]+ /, "");
}
const allTasks: string[] = initialEisenhowerData.flatMap(col => col.tasks.map(stripEmoji));

/**
 * Fisher-Yates shuffle for random order
 */
function shuffle(array: string[]): string[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Sortable item component for dnd-kit
function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-neutral-700 text-white rounded px-3 py-2 shadow-sm flex items-center"
    >
      {children}
    </li>
  );
}

export default function Home() {
  const [sorted, setSorted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [shuffledTasks, setShuffledTasks] = useState<string[] | null>(null);
  const [eisenhowerData, setEisenhowerData] = useState(initialEisenhowerData);

  // For sortable tasks in the first column
  const [tasks0, setTasks0] = useState(initialEisenhowerData[0].tasks);

  // DnD-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

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

  // DnD-kit drag end handler for first column
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks0.indexOf(active.id as string);
      const newIndex = tasks0.indexOf(over?.id as string);
      setTasks0(arrayMove(tasks0, oldIndex, newIndex));
    }
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
            {/* First column with dnd-kit sortable */}
            <div className="flex flex-col rounded-lg shadow-lg bg-neutral-800">
              <div className="p-4 rounded-t-lg font-semibold text-lg text-center bg-red-600 text-white">
                {initialEisenhowerData[0].title}
              </div>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={tasks0} strategy={verticalListSortingStrategy}>
                  <ul className="flex-1 p-4 space-y-3">
                    {tasks0.map((task) => (
                      <SortableItem key={task} id={task}>
                        {task}
                      </SortableItem>
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            </div>
            {/* Other columns static */}
            {eisenhowerData.slice(1).map((col) => (
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
        )}
      </div>
    </div>
  );
}
