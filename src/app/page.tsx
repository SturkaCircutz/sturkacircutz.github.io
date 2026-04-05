const skillGroups = [
  {
    label: "Low-Level",
    items: ["Low-Level Programming", "RISC-V", "Assembly", "Computer Architecture"],
  },
  {
    label: "AI and Training",
    items: ["LLM", "Deep Learning", "Reinforcement Learning", "Model Training"],
  },
  {
    label: "Programming",
    items: ["Algorithms", "C", "C++", "Python"],
  },
];

const projects = [
  {
    title: "sturka",
    summary:
      "A tiny interpreted language implemented in C++ with English-style syntax, control flow, and a JIT mode that lowers the AST to C++ for compilation.",
    stack: ["C++", "Interpreter", "JIT"],
    url: "https://github.com/SturkaCircutz/sturka",
  },
  {
    title: "rl_maze",
    summary:
      "A standalone PyTorch reinforcement learning project for maze solving with random maze generation, a CNN + GRU actor-critic policy, PPO training, and GIF rollout visualization.",
    stack: ["Python", "PyTorch", "PPO"],
    url: "https://github.com/SturkaCircutz/rl_maze",
  },
  {
    title: "Cpp-game-engine",
    summary:
      "A minimal C++ OpenGL voxel-style engine prototype with first-person movement, a GLFW-based window and input system, and a simple block world.",
    stack: ["C++", "OpenGL", "GLFW"],
    url: "https://github.com/SturkaCircutz/Cpp-game-engine",
  },
];

const stats = [
  { value: "C/C++", label: "Core systems tools" },
  { value: "Python", label: "Research and training" },
  { value: "Edmonton, AB", label: "Based in Canada" },
];

const focusPoints = [
  "Low-Level Programming",
  "RISC-V and Assembly",
  "LLM, Deep Learning, and RL Training",
  "Algorithms and Computer Architecture",
];

const signalRow = [
  "Architecture-aware engineering",
  "Systems and research",
  "Model training workflows",
  "Hardware-to-software thinking",
];

const profileDetails = [
  { label: "Name", value: "Jiawen Sun" },
  { label: "Email", value: "313721325sjw@gmail.com" },
  { label: "Location", value: "Edmonton, AB" },
  { label: "Phone", value: "(+1)-8259631088" },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="topbar">
        <div className="brand-block">
          <span className="brand-mark">JS</span>
          <div>
            <strong>Jiawen Sun</strong>
            <p>Systems, architecture, and ML research portfolio</p>
          </div>
        </div>
        <nav className="topnav">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </section>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio 2026</p>
          <h1>Jiawen Sun</h1>
          <p className="lead">
            Low-level programming, RISC-V and assembly, LLM deep learning and
            reinforcement learning training, algorithms, computer architecture,
            and C/C++ and Python development.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="primary-link">
              View projects
            </a>
            <a href="#contact" className="secondary-link">
              Contact
            </a>
          </div>
          <div className="signal-strip">
            {signalRow.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="portrait-card info-card">
          <div className="status-line">
            <span className="status-dot" />
            Available for projects and researches
          </div>
          <div className="console-card">
            <div className="console-header">
              <span />
              <span />
              <span />
            </div>
            <div className="console-body">
              <p>$ profile --summary</p>
              {profileDetails.map((item) => (
                <div key={item.label} className="console-row">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="info-stack">
            <p className="mini-label">Primary domains</p>
            <ul className="focus-list">
              {focusPoints.map((point, index) => (
                <li key={point}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{point}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="portrait-note">
            <span>Focus areas</span>
            <strong>Systems, architecture, model training, and research-driven engineering.</strong>
          </div>
        </div>
      </section>

      <section className="content-grid" id="about">
        <article className="panel">
          <p className="section-kicker">About</p>
          <h2>Technical work grounded in systems thinking and research.</h2>
          <p>
            Jiawen Sun works across low-level programming, algorithms, computer
            architecture, and machine learning training. The work spans both
            implementation and research, with a strong interest in how systems
            behave from the hardware-aware level up to modern model pipelines.
          </p>
          <p>
            Core strengths include RISC-V and assembly, C/C++, Python, deep
            learning, reinforcement learning, and the practical engineering
            needed to turn ideas into working projects and researches. The
            selected work below is pulled from Jiawen Sun&apos;s public GitHub
            repositories.
          </p>
        </article>

        <article className="panel panel-accent">
          <p className="section-kicker">Core skills</p>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div key={group.label} className="skill-group">
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id="projects" className="projects-section">
        <div className="section-heading">
          <p className="section-kicker">Selected work</p>
          <h2>Projects and researches centered on systems, architecture, and model development.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article key={project.title} className="project-card">
              <p className="project-index">{String(index + 1).padStart(2, "0")}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <a href={project.url} className="project-link" target="_blank" rel="noreferrer">
                Open repository
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-panel">
        <div>
          <p className="section-kicker">Contact</p>
          <h2>Open to technical projects, research collaboration, and engineering work.</h2>
        </div>
        <div className="contact-details">
          <a href="mailto:313721325sjw@gmail.com">313721325sjw@gmail.com</a>
          <a href="tel:+18259631088">(+1)-8259631088</a>
          <a href="https://github.com/SturkaCircutz" target="_blank" rel="noreferrer">
            github.com/SturkaCircutz
          </a>
          <p>Edmonton, AB. Available for projects and researches.</p>
        </div>
      </section>
    </main>
  );
}
