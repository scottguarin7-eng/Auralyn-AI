"use client";

import {
  Activity,
  BrainCircuit,
  Check,
  ChevronDown,
  Command,
  Copy,
  Cpu,
  FileText,
  FolderKanban,
  Gauge,
  Menu,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Paperclip,
  Plus,
  RefreshCw,
  Send,
  Settings2,
  Sparkles,
  Terminal,
  Trash2,
  User,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Welcome to Auralyn. Your intelligence workspace is online. What are we building today?",
    createdAt: "ready",
  },
];

const quickPrompts = [
  "Explain a difficult topic simply",
  "Create a futuristic product idea",
  "Help me study for an exam",
  "Review and improve my code",
];

export default function AuralynPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState("Auralyn Chat");
  const [showSidebar, setShowSidebar] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();

    const text = input.trim();

    if (!text || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text,
      createdAt: "now",
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          temperature,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Auralyn request failed.");
      }

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: data.text,
        createdAt: "now",
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown Auralyn error.";

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: `Auralyn error: ${message}`,
          createdAt: "error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyMessage = async (message: Message) => {
    await navigator.clipboard.writeText(message.text);
    setCopiedId(message.id);

    window.setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  const resetSession = () => {
    setMessages(initialMessages);
    setInput("");
  };

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }

      if (event.key === "Escape") {
        setShowSidebar(false);
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  });

  return (
    <main className="auralyn-shell">
      <div className="aurora aurora-left" />
      <div className="aurora aurora-right" />
      <div className="noise" />

      <button
        className="mobile-menu glass-button"
        onClick={() => setShowSidebar(true)}
        aria-label="Open Auralyn navigation"
      >
        <Menu size={20} />
      </button>

      {showSidebar && (
        <button
          className="mobile-overlay"
          onClick={() => setShowSidebar(false)}
          aria-label="Close Auralyn navigation"
        />
      )}

      <aside className={`sidebar ${showSidebar ? "sidebar-visible" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">
            <BrainCircuit size={23} />
          </div>

          <div className="brand-copy">
            <strong>AURALYN</strong>
            <span>INTELLIGENCE OS / 01</span>
          </div>

          <button
            className="sidebar-close glass-button"
            onClick={() => setShowSidebar(false)}
            aria-label="Close navigation"
          >
            <X size={17} />
          </button>
        </div>

        <button className="new-session" onClick={resetSession}>
          <Plus size={17} />
          New Auralyn session
          <span>⌘N</span>
        </button>

        <nav className="navigation">
          <p className="nav-heading">Workspace</p>

          <NavItem
            icon={<MessageSquare size={17} />}
            label="Auralyn Chat"
            active={activeWorkspace === "Auralyn Chat"}
            onClick={() => setActiveWorkspace("Auralyn Chat")}
          />

          <NavItem
            icon={<FolderKanban size={17} />}
            label="Projects"
            active={activeWorkspace === "Projects"}
            onClick={() => setActiveWorkspace("Projects")}
          />

          <NavItem
            icon={<Sparkles size={17} />}
            label="Prompt Lab"
            active={activeWorkspace === "Prompt Lab"}
            onClick={() => setActiveWorkspace("Prompt Lab")}
          />

          <NavItem
            icon={<FileText size={17} />}
            label="Knowledge Vault"
            active={activeWorkspace === "Knowledge Vault"}
            onClick={() => setActiveWorkspace("Knowledge Vault")}
          />

          <NavItem
            icon={<Terminal size={17} />}
            label="Developer Console"
            active={activeWorkspace === "Developer Console"}
            onClick={() => setActiveWorkspace("Developer Console")}
          />

          <p className="nav-heading recent-heading">Recent signals</p>

          <button className="recent-signal">
            <i className="signal-dot dot-blue" />
            Future of human-AI teams
          </button>

          <button className="recent-signal">
            <i className="signal-dot dot-violet" />
            Neural study planner
          </button>

          <button className="recent-signal">
            <i className="signal-dot dot-green" />
            Build a SaaS interface
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="core-status">
            <span className="pulse" />
            <div>
              <strong>Auralyn core online</strong>
              <span>All systems nominal</span>
            </div>
          </div>

          <button className="profile-card">
            <span className="profile-icon">
              <User size={15} />
            </span>
            <span className="profile-copy">
              <strong>Explorer mode</strong>
              <small>Local workspace</small>
            </span>
            <MoreHorizontal size={17} />
          </button>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <b>/</b>
            <strong>{activeWorkspace}</strong>
          </div>

          <div className="top-actions">
            <div className="online-pill">
              <span className="pulse" />
              Auralyn online
            </div>

            <button className="top-icon" title="Focus composer">
              <Command size={17} />
            </button>

            <button className="top-icon" title="Theme">
              <Moon size={17} />
            </button>

            <button className="profile-icon top-profile">
              <User size={15} />
            </button>
          </div>
        </header>

        <div className="dashboard">
          <section className="main-column">
            <div className="hero">
              <div>
                <p className="eyebrow">
                  <Sparkles size={14} />
                  AURALYN INTELLIGENCE CONSOLE
                </p>

                <h1>
                  Intelligence,
                  <span> beautifully in motion.</span>
                </h1>

                <p className="hero-copy">
                  A living AI workspace for ideas, research, code, and
                  high-velocity creation.
                </p>
              </div>

              <div className="hero-buttons">
                <button className="secondary-button" onClick={resetSession}>
                  <Trash2 size={14} />
                  Clear
                </button>

                <button className="secondary-button">
                  <Settings2 size={14} />
                  Configure
                </button>
              </div>
            </div>

            <div className="metrics">
              <Metric
                icon={<Activity size={16} />}
                title="Auralyn activity"
                value="98.4%"
                detail="Optimal"
                color="blue"
              />

              <Metric
                icon={<Zap size={16} />}
                title="Response latency"
                value="0.8s"
                detail="Very fast"
                color="violet"
              />

              <Metric
                icon={<Gauge size={16} />}
                title="Context window"
                value="12.8k"
                detail="Available"
                color="green"
              />
            </div>

            <div className="messages">
              {messages.map((message) => (
                <article
                  key={message.id}
                  className={`message ${
                    message.role === "user" ? "user-message" : "ai-message"
                  }`}
                >
                  <div className="message-mark">
                    {message.role === "assistant" ? (
                      <BrainCircuit size={17} />
                    ) : (
                      <User size={16} />
                    )}
                  </div>

                  <div className="message-body">
                    <div className="message-meta">
                      <strong>
                        {message.role === "assistant" ? "Auralyn" : "You"}
                      </strong>
                      <span>{message.createdAt}</span>
                    </div>

                    <div className="message-text">{message.text}</div>

                    {message.role === "assistant" && (
                      <div className="message-actions">
                        <button
                          onClick={() => copyMessage(message)}
                          className="message-action"
                        >
                          {copiedId === message.id ? (
                            <Check size={13} />
                          ) : (
                            <Copy size={13} />
                          )}
                          {copiedId === message.id ? "Copied" : "Copy"}
                        </button>

                        <button className="message-action">
                          <RefreshCw size={13} />
                          Regenerate
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}

              {isLoading && (
                <article className="message ai-message">
                  <div className="message-mark">
                    <BrainCircuit size={17} />
                  </div>

                  <div className="message-body">
                    <div className="message-meta">
                      <strong>Auralyn</strong>
                      <span>processing</span>
                    </div>

                    <div className="thinking">
                      <i />
                      <i />
                      <i />
                      <em>Auralyn is thinking...</em>
                    </div>
                  </div>
                </article>
              )}
            </div>

            <div className="quick-prompts">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  className="quick-prompt"
                  onClick={() => setInput(prompt)}
                >
                  <Sparkles size={13} />
                  {prompt}
                </button>
              ))}
            </div>

            <form className="composer glass-panel" onSubmit={sendMessage}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Transmit a thought to Auralyn..."
                disabled={isLoading}
                rows={2}
              />

              <div className="composer-footer">
                <div className="composer-tools">
                  <button className="composer-tool" type="button">
                    <Paperclip size={15} />
                    Attach
                  </button>

                  <button className="composer-tool" type="button">
                    <Sparkles size={15} />
                    Enhance
                  </button>

                  <span className="shortcut">
                    <Command size={11} /> Enter to send
                  </span>
                </div>

                <button
                  className="send-button"
                  type="submit"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? "Thinking" : "Transmit"}
                  <Send size={15} />
                </button>
              </div>
            </form>
          </section>

          <aside className="inspector">
            <div className="inspector-title">
              <div>
                <p className="eyebrow">AURALYN INSPECTOR</p>
                <h2>Fusion core</h2>
              </div>

              <div className="cpu-icon">
                <Cpu size={19} />
              </div>
            </div>

            <div className="core-visual">
              <div className="core-ring ring-a" />
              <div className="core-ring ring-b" />
              <div className="core-ring ring-c" />
              <div className="core-center">
                <BrainCircuit size={34} />
              </div>
              <i className="orbit orbit-a" />
              <i className="orbit orbit-b" />
            </div>

            <div className="engine-status">
              <span className="pulse" />
              <div>
                <strong>Auralyn core active</strong>
                <span>Primary intelligence channel</span>
              </div>
              <Check size={16} />
            </div>

            <div className="inspector-section">
              <div className="section-label">
                <span>Model parameters</span>
                <button>
                  <Settings2 size={14} />
                </button>
              </div>

              <label className="parameter-label">
                <span>Temperature</span>
                <strong>{temperature.toFixed(1)}</strong>
              </label>

              <input
                className="temperature"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(event) =>
                  setTemperature(Number(event.target.value))
                }
              />

              <div className="temperature-scale">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>

            <div className="inspector-section">
              <div className="section-label">
                <span>Active capabilities</span>
                <b>08</b>
              </div>

              <Capability text="Deep reasoning" color="blue" />
              <Capability text="Creative synthesis" color="violet" />
              <Capability text="Code intelligence" color="green" />
              <Capability text="Context memory" color="orange" />
            </div>

            <div className="activity-card">
              <div className="activity-heading">
                <span>Live activity</span>
                <Activity size={14} />
              </div>

              <div className="activity-bars">
                {Array.from({ length: 25 }).map((_, index) => (
                  <i
                    key={index}
                    style={{
                      height: `${25 + ((index * 19) % 62)}%`,
                    }}
                  />
                ))}
              </div>

              <div className="activity-footer">
                <span>Last 60 seconds</span>
                <strong>+24.8%</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`nav-item ${active ? "nav-item-active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {active && <i className="active-bar" />}
    </button>
  );
}

function Metric({
  icon,
  title,
  value,
  detail,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
  color: string;
}) {
  return (
    <div className="metric glass-panel">
      <div className={`metric-icon ${color}`}>{icon}</div>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}

function Capability({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  return (
    <div className="capability">
      <i className={`capability-dot ${color}`} />
      <span>{text}</span>
      <Check size={13} />
    </div>
  );
}
