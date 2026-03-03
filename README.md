import { useState } from "react";
import {
  Code2, Terminal, Layers, Cpu, Globe, GitBranch,
  Zap, Database, Box, ChevronRight, Star, Flame
} from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: <Globe size={14} />,
    items: [
      { name: "TypeScript", color: "#3178c6" },
      { name: "React", color: "#61dafb" },
      { name: "Tailwind CSS", color: "#38bdf8" },
      { name: "shadcn/ui", color: "#f4f4f5" },
    ],
  },
  {
    category: "Backend",
    icon: <Terminal size={14} />,
    items: [
      { name: "Ruby on Rails", color: "#cc0000" },
      { name: "Elixir / Phoenix", color: "#9b59b6" },
      { name: "Rust", color: "#f74c00" },
      { name: "Node.js", color: "#68a063" },
    ],
  },
  {
    category: "Architecture",
    icon: <Layers size={14} />,
    items: [
      { name: "DDD", color: "#facc15" },
      { name: "SOLID", color: "#facc15" },
      { name: "GraphQL", color: "#e535ab" },
      { name: "PostgreSQL", color: "#336791" },
    ],
  },
];

const stats = [
  { icon: <GitBranch size={16} />, label: "Commits", value: "1.2k+" },
  { icon: <Star size={16} />, label: "Stars", value: "48" },
  { icon: <Flame size={16} />, label: "Streak", value: "32d" },
  { icon: <Code2 size={16} />, label: "Repos", value: "30+" },
];

const lines = [
  { text: "const dev = {", indent: 0 },
  { text: 'name: "DeCaelo",', indent: 1, color: "#98c379" },
  { text: 'focus: "Clean Architecture",', indent: 1, color: "#98c379" },
  { text: "principles: [", indent: 1 },
  { text: '"DDD", "SOLID", "DDIA",', indent: 2, color: "#e5c07b" },
  { text: "],", indent: 1 },
  { text: "stack: { ts, react, elixir, rust },", indent: 1, color: "#61afef" },
  { text: "};", indent: 0 },
];

function TerminalLine({ text, indent, color, delay }) {
  return (
    <div
      className="flex gap-1 font-mono text-sm leading-relaxed"
      style={{
        paddingLeft: `${indent * 16}px`,
        animationDelay: `${delay}ms`,
        animation: "fadeSlideIn 0.4s ease forwards",
        opacity: 0,
      }}
    >
      <span style={{ color: color ?? "#abb2bf" }}>{text}</span>
    </div>
  );
}

function SkillBadge({ name, color }) {
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-mono font-medium border"
      style={{
        color,
        borderColor: `${color}44`,
        backgroundColor: `${color}11`,
      }}
    >
      {name}
    </span>
  );
}

export default function ProfileCard() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)",
        fontFamily: "'Fira Code', monospace",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap');

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px #f7d15b44; }
          50% { box-shadow: 0 0 20px #f7d15b88; }
        }
        .cursor::after {
          content: '▊';
          animation: blink 1s step-end infinite;
          color: #f7d15b;
          margin-left: 2px;
        }
        .tab-active {
          border-bottom: 2px solid #f7d15b;
          color: #f7d15b !important;
        }
        .stat-card:hover {
          background: #21262d !important;
          border-color: #f7d15b44 !important;
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }
        .skill-row:hover {
          background: #161b22 !important;
        }
      `}</style>

      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden"
        style={{
          background: "#0d1117",
          border: "1px solid #30363d",
          boxShadow: "0 24px 64px #00000088, 0 0 0 1px #f7d15b11",
        }}
      >
        {/* Window bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          <span className="flex-1 text-center text-xs" style={{ color: "#6e7681" }}>
            ~/DeCaelo/README.md
          </span>
          <Terminal size={14} style={{ color: "#6e7681" }} />
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #f7d15b22, #f7d15b44)",
                border: "1px solid #f7d15b44",
                animation: "pulse-glow 3s ease-in-out infinite",
              }}
            >
              <Code2 size={24} style={{ color: "#f7d15b" }} />
            </div>
            <div>
              <h1
                className="text-xl font-semibold cursor"
                style={{ color: "#e6edf3" }}
              >
                DeCaelo
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "#8b949e" }}>
                Fullstack · DDD · Clean Architecture
              </p>
              <div className="flex gap-2 mt-2">
                {["TypeScript", "Elixir", "Rust"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "#21262d",
                      color: "#f7d15b",
                      border: "1px solid #f7d15b33",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            {stats.map(({ icon, label, value }) => (
              <div
                key={label}
                className="stat-card rounded-lg p-3 text-center cursor-default"
                style={{
                  background: "#161b22",
                  border: "1px solid #30363d",
                }}
              >
                <div className="flex justify-center mb-1" style={{ color: "#f7d15b" }}>
                  {icon}
                </div>
                <div className="text-base font-semibold" style={{ color: "#e6edf3" }}>
                  {value}
                </div>
                <div className="text-xs" style={{ color: "#6e7681" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div>
            <div
              className="flex gap-4 text-sm mb-4"
              style={{ borderBottom: "1px solid #30363d" }}
            >
              {["Skills", "Terminal"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`pb-2 px-1 transition-colors ${activeTab === i ? "tab-active" : ""}`}
                  style={{ color: activeTab === i ? "#f7d15b" : "#6e7681" }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 0 && (
              <div className="space-y-3">
                {skills.map(({ category, icon, items }) => (
                  <div
                    key={category}
                    className="skill-row rounded-lg p-3"
                    style={{ background: "#0d1117", border: "1px solid #21262d" }}
                  >
                    <div className="flex items-center gap-1.5 mb-2" style={{ color: "#6e7681" }}>
                      {icon}
                      <span className="text-xs uppercase tracking-widest">{category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((s) => (
                        <SkillBadge key={s.name} name={s.name} color={s.color} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 1 && (
              <div
                className="rounded-lg p-4 space-y-0.5"
                style={{ background: "#161b22", border: "1px solid #30363d" }}
              >
                {lines.map((line, i) => (
                  <TerminalLine key={i} {...line} delay={i * 80} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between text-xs pt-2"
            style={{ borderTop: "1px solid #21262d", color: "#6e7681" }}
          >
            <div className="flex items-center gap-1.5">
              <Zap size={12} style={{ color: "#f7d15b" }} />
              <span>Designing Data-Intensive Applications reader</span>
            </div>
            <div className="flex items-center gap-1">
              <span>github.com/DeCaelo</span>
              <ChevronRight size={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
