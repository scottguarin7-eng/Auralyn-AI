"use client";

import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  BrainCircuit,
  Code2,
  FileText,
  Menu,
  Mic,
  MoreHorizontal,
  Plus,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";
import { NeuralBackground } from "@/components/neural-background";
import { Sidebar } from "@/components/sidebar";
import { StatsCard } from "@/components/stats-card";
import { ChatPanel } from "@/components/chat-panel";

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <NeuralBackground />

      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-4 p-4 lg:p-6">
        <Sidebar />

        {mobileMenu && (
          <div className="fixed inset-0 z-50 bg-black/60 p-4 backdrop-blur-xl lg:hidden">
            <div className="glass h-full rounded-3xl p-5">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="text-violet-300" />
                  <span className="font-bold">NeuralGlass</span>
                </div>
                <button onClick={() => setMobileMenu(false)}>
                  <X />
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        <section className="min-w-0 flex-1">
          <header className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenu(true)}
                className="glass flex h-11 w-11 items-center justify-center rounded-2xl lg:hidden"
              >
                <Menu size={19} />
              </button>
              <div>
                <p className="text-sm text-slate-400">Saturday, October 31</p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Good morning, creator.
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="glass flex h-11 w-11 items-center justify-center rounded-2xl text-slate-300 transition hover:text-white">
                <Bell size={18} />
              </button>
              <div className="hidden h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 sm:flex">
                <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-cyan-300 to-violet-500" />
                <span className="text-sm">Developer</span>
              </div>
            </div>
          </header>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              label="AI sessions"
              value="128"
              detail="18%"
              icon={BrainCircuit}
              color="#a78bfa"
            />
            <StatsCard
              label="Tokens optimized"
              value="84.2K"
              detail="24%"
              icon={Activity}
              color="#67e8f9"
            />
            <StatsCard
              label="Saved prompts"
              value="36"
              detail="12%"
              icon={WandSparkles}
              color="#f9a8d4"
            />
            <StatsCard
              label="Productivity score"
              value="92%"
              detail="8%"
              icon={BarChart3}
              color="#86efac"
            />
          </div>

          <div className="mb-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
            <ChatPanel />

            <div className="space-y-5">
              <div className="glass rounded-3xl p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Quick actions</p>
                    <h2 className="mt-1 text-lg font-semibold">
                      Build something brilliant
                    </h2>
                  </div>
                  <Sparkles className="text-violet-300" size={20} />
                </div>

                <div className="grid gap-3">
                  {[
                    {
                      icon: WandSparkles,
                      title: "Prompt enhancer",
                      description: "Turn rough ideas into powerful prompts.",
                    },
                    {
                      icon: Code2,
                      title: "Developer lab",
                      description: "Debug, refactor, and generate code.",
                    },
                    {
                      icon: FileText,
                      title: "Document intelligence",
                      description: "Summarize and analyze your files.",
                    },
                  ].map(({ icon: Icon, title, description }) => (
                    <button
                      key={title}
                      className="glass-hover flex items-center gap-3 rounded-2xl p-3 text-left"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/8 text-violet-200">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {description}
                        </p>
                      </div>
                      <ArrowUpRight className="ml-auto text-slate-500" size={16} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-3xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold">Recent projects</h2>
                  <button className="text-slate-500 hover:text-white">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                {["Portfolio redesign", "SaaS architecture", "Research assistant"].map(
                  (project, index) => (
                    <div
                      key={project}
                      className="flex items-center gap-3 border-t border-white/8 py-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 text-xs text-slate-300">
                        0{index + 1}
                      </div>
                      <div>
                        <p className="text-sm">{project}</p>
                        <p className="text-xs text-slate-500">
                          Updated {index + 1}h ago
                        </p>
                      </div>
                    </div>
                  ),
                )}

                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-3 text-xs text-slate-400 transition hover:border-violet-400/40 hover:text-white">
                  <Plus size={15} />
                  Create new project
                </button>
              </div>
            </div>
          </div>

          <footer className="flex flex-col items-center justify-between gap-3 px-2 pb-3 text-xs text-slate-600 sm:flex-row">
            <span>NeuralGlass AI · Intelligence, refined.</span>
            <span className="flex items-center gap-2">
              <Mic size={13} />
              Built for creators and developers
            </span>
          </footer>
        </section>
      </div>
    </main>
  );
}
