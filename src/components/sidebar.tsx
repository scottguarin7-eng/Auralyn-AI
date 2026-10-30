"use client";

import {
  Bot,
  BrainCircuit,
  Code2,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Bot, label: "AI Workspace" },
  { icon: Code2, label: "Developer Lab" },
  { icon: FileText, label: "Documents" },
  { icon: FolderKanban, label: "Projects" },
];

export function Sidebar() {
  return (
    <aside className="glass hidden h-[calc(100vh-32px)] w-72 flex-col rounded-3xl p-5 lg:flex">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/30">
          <BrainCircuit size={24} />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight">NeuralGlass</h1>
          <p className="text-xs text-slate-400">AI intelligence layer</p>
        </div>
      </div>

      <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
        Workspace
      </div>

      <nav className="space-y-2">
        {items.map(({ icon: Icon, label }, index) => (
          <button
            key={label}
            className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${
              index === 0
                ? "bg-white/12 text-white shadow-inner shadow-white/10"
                : "text-slate-400 hover:bg-white/8 hover:text-white"
            }`}
          >
            <Icon size={18} />
            {label}
            {index === 1 && (
              <span className="ml-auto rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] text-violet-200">
                Live
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-2">
        <div className="glass rounded-2xl p-4">
          <div className="mb-2 flex items-center gap-2">
            <Zap className="text-cyan-300" size={16} />
            <span className="text-xs font-semibold">Neural Engine</span>
          </div>
          <p className="text-xs leading-5 text-slate-400">
            Prompt fusion, context routing, quality checks, and adaptive answers.
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" />
          </div>
        </div>

        <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/8 hover:text-white">
          <Settings size={18} />
          Settings
        </button>
      </div>
    </aside>
  );
}
