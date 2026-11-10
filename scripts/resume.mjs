// Transcribed from the supplied .source/lukas-resume.pdf.
export const resume = {
  phone: '(647) 646-9599',
  phoneHref: '+16476469599',
  skills: [
    ['Languages', 'C++', 'C', 'Python', 'C#', 'JavaScript/TypeScript', 'Java', 'Go', 'SQL'],
    ['Technologies', 'AWS', 'Azure', 'Kubernetes', 'Docker', 'ROCm', 'PyTorch', 'OpenCV', 'Claude Code', 'Codex', 'Cursor', 'AI Agents', 'Model Context Protocol', 'PostgreSQL', 'MongoDB', 'Linux', 'Git', 'CI/CD', 'CUDA', 'OpenMP', 'SIMD'],
  ],
  education: {
    school: 'Western University',
    degree: 'B.S. in Computer Science',
    gpa: '3.8',
    date: 'Graduating April 2027',
    location: 'London, ON',
  },
  employers: [
    {
      name: 'AMD (Advanced Micro Devices)', location: 'Markham, ON',
      roles: [
        { title: 'Associate Software Engineer', date: 'May 2026 — August 2026' },
        { title: 'Agentic AI and Machine Learning SWE Intern', date: 'January 2026 — April 2026' },
      ],
      bullets: [
        ['Agentic AI Development', 'Created an agentic AI system in Python that autonomously troubleshoots machines with CI pipeline issues using internal tools for intelligent tool calls and problem resolution.'],
        ['Agent Swarms', 'Created specialized agent swarms to accelerate NPU kernel development and bugfixes, increasing efficiency by 35%. Usable in Claude Code, Codex CLI, and other agentic coding tools.'],
        ['AI Bug Detector', 'Built a KNN model in Python to detect, classify, and correlate bugs in CVML model training pipelines, achieving 87% accuracy on a test dataset of 15,000+ samples.'],
        ['Neural Processing Unit (NPU) Testing Application', 'Created a tool that pushes NPU utilization to 100% by running multiple ML model training pipelines in parallel, improving test efficiency by 40%.'],
        ['Infrastructure Reliability', 'Maintained 99% uptime across 300+ CI testing and CVML model training workstations, ensuring critical development workflows remained operational.'],
      ],
    },
    {
      name: 'J.D. Power', location: 'London, ON (Remote)',
      roles: [{ title: 'DevOps and MLOps Engineer Intern', date: 'May 2025 — December 2025' }],
      bullets: [
        ['Test Automation & CI/CD', 'Built end-to-end automated test suites for web and mobile dashboards using Playwright, integrated with GitLab CI/CD and Xray to enable nightly regression testing; 35% overall reduction in manual testing efforts.'],
        ['Test Reports', 'Implemented Allure reporting and logging, improving defect traceability by 30%.'],
      ],
    },
  ],
  projects: [
    { name: 'TensorKernel', description: 'High-performance tensor computation library in C++ featuring optimized kernel implementations (SIMD/OpenMP/CUDA) for neural network operations with built-in profiling and Python/PyTorch interoperability.' },
    { name: 'Chef.ai', href: 'projects/chef-ai.html', description: 'Developed an AI-driven meal planning system in Python using Scikit-learn, Pandas, and NumPy to optimize purchases and reduce food waste by 20%.' },
    { name: 'Facial Recognition Security System', href: 'projects/facial-recognition.html', description: 'Implemented a real-time facial recognition system in C++ using OpenCV and Qt5 with role-based access control and model retraining, achieving 92% accuracy.' },
    { name: 'EasyConvert', href: 'projects/easyconvert.html', description: 'A Rust-based file converter that converts between compatible file formats.' },
    { name: 'Track Isolator', href: 'projects/stem-separator.html', description: 'A local-only music stem separation application built in C# and TypeScript that uses machine learning (Demucs) to isolate vocals and instruments from music tracks.' },
  ],
};
