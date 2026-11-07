// Bilingual copy (English first). Every figure is sourced from the resume profile.
export const SCENES = ["top","mission","origin","product","culture","cases","press","life","roadmap","contact"] as const;

export const CHAPTERS = {
  "en": [
    "Intro",
    "The problem",
    "My story",
    "What I bring",
    "How I work",
    "Case studies",
    "Talks",
    "Life",
    "Roadmap",
    "Let's talk"
  ],
  "zh": [
    "開場",
    "要解決的問題",
    "一路走來",
    "我能帶來什麼",
    "做事方式",
    "案例",
    "上台與獲獎",
    "生活",
    "路線圖",
    "聯絡"
  ]
};

export const I18N = {
  "en": {
    "brand": "Hao-Ting Lee",
    "navLabel": "Main navigation",
    "langLabel": "Language",
    "nav": [
      {
        "label": "Problem",
        "href": "#mission"
      },
      {
        "label": "Story",
        "href": "#origin"
      },
      {
        "label": "Strengths",
        "href": "#product"
      },
      {
        "label": "How I work",
        "href": "#culture"
      },
      {
        "label": "Cases",
        "href": "#cases"
      },
      {
        "label": "Life",
        "href": "#life"
      },
      {
        "label": "Contact",
        "href": "#contact"
      }
    ],
    "hero": {
      "aria": "Introduction",
      "idx": "Software Engineer",
      "eyebrow": "Taoyuan, Taiwan",
      "kicker": "Hi, I'm",
      "name": "Hao-Ting Lee",
      "subName": "李浩廷 · Call me Justin.",
      "a": "I turn ",
      "em": "real-world needs",
      "b": " into systems that keep running. My edge: a medical-imaging research background, hands-on hardware experience, and a habit of checking the numbers.",
      "chips": [
        {
          "label": "Reliable systems × AI",
          "tone": "accent"
        },
        {
          "label": "Research background",
          "tone": "neutral"
        },
        {
          "label": "Hardware & edge",
          "tone": "neutral"
        },
        {
          "label": "Open to SRE / platform roles",
          "tone": "neutral"
        }
      ],
      "cta1": "Read my story",
      "cta2": "Say hello",
      "photoAlt": "Portrait of Hao-Ting Lee in a white and navy shirt, hand on chin"
    },
    "facts": {
      "eyebrow": "Traction",
      "g1": "Operations · LabMonitor",
      "g2": "Engineering",
      "g3": "Research & growth",
      "l1": "Max scheduled readings per day across 7 instruments",
      "u2": "rounds",
      "l2": "Manual recording rounds replaced every day",
      "l3": "Device-health snapshot marked OK over 24 hours",
      "l4": "Successful runs of four scheduled jobs in August 2026",
      "l5": "Automated tests gating every LabMonitor deploy",
      "l6": "Lower upfront cost than the alternative equipment (NT$20k vs NT$120k)",
      "l7": "Lower p50 latency for a Relay helper rewritten in Rust (local benchmark)",
      "l8": "Smaller image than python:3.12-slim, app included (devops-lab)",
      "l9": "Publications in journals and international conferences",
      "l10": "ICMHI awards, including two first places",
      "u11": "countries",
      "l11": "Where I presented research: Japan and the US",
      "l12": "Full-stack systems shipped as an intern"
    },
    "mission": {
      "eyebrow": "The problem I solve",
      "h1": "Great demos are easy.",
      "h2": "Systems that keep running are not.",
      "lines": [
        "I started in a research lab,",
        "using deep learning to read brain CT and cell microscopy images.",
        "An internship at a biotech startup showed me the real gap:",
        "models and prototypes are everywhere, but things that run every day are rare.",
        "So that became my focus: turning lab needs into systems, wiring up cameras, sensors and GPUs,",
        "and finding out why when they break at midnight."
      ],
      "sign": "Justin · Taoyuan, autumn 2026"
    },
    "origin": {
      "eyebrow": "My story so far",
      "h1": "From a research lab",
      "h2": "to systems that run every day.",
      "items": [
        {
          "when": "2020",
          "stage": "Research",
          "tone": "neutral",
          "title": "Starting in a research lab",
          "org": "Yuan Ze University · B.Sc. → M.Sc., Computer Science & Engineering",
          "a": "Researched medical imaging: hemorrhage localization, coronary calcification, circulating tumor cell segmentation. Ran Ubuntu lab servers and deployed LLMs on A100s, ",
          "s": "the first time systems themselves caught my interest",
          "b": "."
        },
        {
          "when": "2022",
          "stage": "First operations",
          "tone": "neutral",
          "title": "First taste of real operations",
          "org": "Taiwan Advanced Nanotech (TANBead) · MIS Intern",
          "a": "Helped manage internal systems and IT infrastructure, and handled whatever came up. ",
          "s": "For the first time, textbook knowledge had to answer to real people.",
          "b": ""
        },
        {
          "when": "2023",
          "stage": "Building",
          "tone": "info",
          "title": "Turning needs into systems",
          "org": "Cancerfree Biotech · Software Engineer Intern",
          "a": "Research and product, side by side: 4+ full-stack systems with Vue.js and FastAPI, deployed on GCP, monitored in Grafana, YOLO on edge devices. ",
          "s": "The research went on to Japan and Chicago.",
          "b": ""
        },
        {
          "when": "2025",
          "stage": "Operating",
          "tone": "success",
          "title": "Keeping systems running, every day",
          "org": "Cancerfree Biotech · Software Engineer",
          "a": "Grew internship prototypes into systems that run on their own, and own the moments they break. ",
          "s": "I also build the internal tools colleagues use every day",
          "b": ": a company AI desktop assistant, a lab records app that replaced a paid SaaS, a Shopify back office, plus local AI inference and a PubMed RAG pipeline."
        },
        {
          "when": "2026 →",
          "stage": "What's next",
          "tone": "accent",
          "title": "Going deeper into infrastructure",
          "org": "Open to SRE, platform, backend and ML infrastructure roles",
          "a": "Next is depth: ",
          "s": "becoming an engineer who designs, deploys and operates reliable software and AI systems",
          "b": ", in Taiwan or abroad. I documented the path in my iThome Ironman series."
        }
      ]
    },
    "product": {
      "eyebrow": "What I bring",
      "h1": "Four strengths,",
      "h2": "one engineer.",
      "lede": "The value I bring to a team. Each strength is backed by systems that have run in production, not just tutorials.",
      "items": [
        {
          "cls": "tilt",
          "icon": "layers",
          "tag": "Full-stack systems",
          "name": "Build",
          "desc": "From requirements to a working product: APIs, databases, auth and the interfaces people actually use.",
          "feats": [
            "FastAPI · React · Next.js · Vue.js",
            "PostgreSQL · Supabase · Neon · pgvector",
            "Internal tools for lab, operations and e-commerce teams"
          ]
        },
        {
          "cls": "tilt d1",
          "icon": "settings",
          "tag": "Deploy · observe · recover",
          "name": "Run",
          "desc": "Keeping systems healthy after launch: containers, CI, monitoring, alerting and fixing what breaks.",
          "feats": [
            "Docker · GCP · GitHub Actions · Vercel",
            "Prometheus · Loki · Grafana",
            "~12 alert conditions with confirm and re-notify"
          ]
        },
        {
          "cls": "tilt d2",
          "icon": "sliders",
          "tag": "Hardware & edge",
          "name": "Connect",
          "desc": "Bringing software into the physical lab: cameras, sensors, edge boards and GPU servers.",
          "feats": [
            "Raspberry Pi 5 · Jetson Nano · DGX Spark",
            "YOLOv8 and YOLO11 on edge devices",
            "LLM and speech serving with vLLM and Ollama"
          ]
        },
        {
          "cls": "tilt d3",
          "icon": "sparkle",
          "tag": "Applied AI & imaging",
          "name": "Research",
          "desc": "A foundation in deep learning for medical images, now applied to agent tools and RAG, with the habit of measuring carefully.",
          "feats": [
            "PyTorch · OpenCV · CTC segmentation",
            "Agent tools, RAG and MCP integration",
            "7 publications, 3 ICMHI awards"
          ]
        }
      ]
    },
    "culture": {
      "eyebrow": "How I work",
      "h1": "Beyond the skills,",
      "h2": "this is how I work.",
      "items": [
        {
          "cls": "trait t1",
          "n": "01 / 06",
          "t1": "Research first,",
          "t2": "then bring options",
          "icon": "search",
          "kw": "Ambiguity",
          "a": "When requirements are fuzzy, I don't wait around or start on a hunch. I ",
          "s": "research the problem and possible directions myself",
          "b": ", lay out a few options, then align with whoever asked so we choose a path together.",
          "proof": "Today that means turning a colleague's request into a UI or feature design, having Claude Code or Codex draft the plan, reviewing it, then shipping with tests, CI and a trial run by the person who asked."
        },
        {
          "cls": "trait t2",
          "n": "02 / 06",
          "t1": "If it doesn't work,",
          "t2": "find another way",
          "icon": "branch",
          "kw": "No sunk costs",
          "a": "For LabMonitor I first trained my own model to read instrument digits. The data was too uniform and it never got reliable. Instead of forcing it, I ",
          "s": "switched to GPT-4o mini to read the digits",
          "b": " and got the system working first.",
          "proof": "Version two now samples 7 instruments every 5 minutes, replacing 8 manual recording rounds a day."
        },
        {
          "cls": "trait t3",
          "n": "03 / 06",
          "t1": "I like machines",
          "t2": "I can touch",
          "icon": "settings",
          "kw": "Hardware",
          "a": "More than code that only lives in the cloud, I enjoy connecting things to the real world: ",
          "s": "YOLO on Raspberry Pi and Jetson Nano, LLM and speech models on DGX Spark and Mac mini",
          "b": ", A100 lab servers at university.",
          "proof": "Three sync loops on a Raspberry Pi 5 are supervised independently. One failing never takes down the others."
        },
        {
          "cls": "trait t4",
          "n": "04 / 06",
          "t1": "Clear numbers,",
          "t2": "clear limits",
          "icon": "eye",
          "kw": "Honesty",
          "a": "I care how a number was measured. Benchmarking Relay, I ran 3 warm-ups and 30 interleaved runs and ",
          "s": "stated plainly that the results are local only",
          "b": ". In devops-lab I wrote down the scanner gap I couldn't solve instead of pretending I had.",
          "proof": "If I didn't measure it, I don't call it a result."
        },
        {
          "cls": "trait t5",
          "n": "05 / 06",
          "t1": "What the podium",
          "t2": "taught me about teams",
          "icon": "audio",
          "kw": "Wind band conductor",
          "a": "In university I spent a year as the wind band's student conductor: planning rehearsals, choosing repertoire, working with instructors. ",
          "s": "Getting dozens of people moving in one direction",
          "b": " takes planning and consensus, not orders. I bring that to work.",
          "proof": "Handled our entry and preparation for the National Student Music Competition."
        },
        {
          "cls": "trait t6",
          "n": "06 / 06",
          "t1": "Off the clock,",
          "t2": "still building",
          "icon": "sparkle",
          "kw": "Curiosity",
          "a": "When I want to understand something, I build one. To manage my own dev accounts I wrote ",
          "s": "Relay, a cross-platform CLI published on npm",
          "b": ". To learn the delivery chain I keep devops-lab: one small app taken through image signing, Kubernetes, Terraform and CI.",
          "proof": "I also wrote a 30-day 2026 iThome Ironman series, Learning SRE for the AI Era."
        }
      ]
    },
    "cases": {
      "eyebrow": "Case studies",
      "h1": "The strengths,",
      "h2": "in use.",
      "items": [
        {
          "cls": "rv",
          "title": "LabMonitor",
          "meta": "Lab instrument monitoring",
          "text": "From a vendor-independent internship prototype to a second version with cameras, OCR, sensors and about 12 alert types, with no service outage while in operation. Materials cost about NT$20,000 versus an NT$120,000 alternative.",
          "why": "→ Build · Run · Connect",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d1",
          "title": "CF OpenWorker",
          "meta": "Internal AI agent platform",
          "text": "Colleagues needed AI that could work with confidential data. I led the company customization of an open-source desktop agent: company SSO, the internal model gateway, beta/LTS releases with auto-update, a web portal, and 7 agent tool families such as long-audio transcription and approval-gated sharing.",
          "why": "→ Build · Run · Research",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d2",
          "title": "LabReport",
          "meta": "Lab records · replaced Ragic",
          "text": "Moved the lab's records off Ragic, a paid SaaS, into an in-house app built around its own workflows: reagent lots, per-tube checkout and instrument records, behind company Azure AD. Four subscription seats are already cancelled.",
          "why": "→ Build",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv",
          "title": "Local AI inference",
          "meta": "DGX Spark · Mac mini · vLLM",
          "text": "Set up and operate LLM, speech and video-generation models, with health checks and auto-recovery from GPU memory errors.",
          "why": "→ Run · Connect",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d1",
          "title": "Prometheus VMS",
          "meta": "Smart-glasses lab system",
          "text": "Worked on video management integration: multi-stream RTSP, live browser viewing, recording and clip extraction.",
          "why": "→ Build · Connect",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d2",
          "title": "PubBrain",
          "meta": "PubMed knowledge layer and RAG",
          "text": "Turned PubMed abstracts from 2016 to 2026 into a semantically searchable knowledge base on PostgreSQL and pgvector, with LangSmith tracing of the RAG flow.",
          "why": "→ Build · Research",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv",
          "title": "Eatable",
          "meta": "Personal project · MCP server",
          "text": "A chat-driven meal logger with its own OAuth-protected MCP server: about 20 tools shared by the in-app agent and by Claude, plus a matching Agent Skill. I use it with Claude every day.",
          "why": "→ How I work: still building",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d1",
          "title": "Relay",
          "meta": "Personal project · npm",
          "text": "A cross-platform CLI for managing Claude Code credential snapshots, with locked writes and atomic file replacement.",
          "why": "→ How I work: still building",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d2",
          "title": "devops-lab",
          "meta": "Learning lab · open source",
          "text": "One FastAPI app carried through the delivery chain: a signed chiselled Ubuntu image, a hardened Kubernetes deployment that rejects unsigned images, Terraform-managed monitoring, and CI on kind. Runs on a laptop, not production.",
          "why": "→ Run · How I work: clear limits",
          "link": "https://github.com/darkstar1227/devops-lab",
          "linkLabel": "View on GitHub"
        }
      ]
    },
    "press": {
      "eyebrow": "Talks & recognition",
      "h1": "Telling the world",
      "h2": "about the research.",
      "lede": "I enjoy getting on stage and making something complex clear. My master's work on circulating tumor cells went to Japan and the US.",
      "items": [
        {
          "cls": "tilt",
          "y": "2022",
          "place": "ICMHI · Japan",
          "title": "Locating brain hemorrhage",
          "text": "My first international talk: deep learning to locate hemorrhage in stroke patients.",
          "award": "Session Best Presenter",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "tilt d1",
          "y": "2023",
          "place": "ICMHI · Japan",
          "title": "Detecting coronary calcification",
          "text": "First-author paper on detecting coronary artery calcification with deep learning.",
          "award": "1st Place · Student Essay",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "tilt d2",
          "y": "2025",
          "place": "ICMHI · Japan",
          "title": "Segmenting CTCs over time",
          "text": "My master's research on stage: automated segmentation of cultured circulating tumor cells.",
          "award": "1st Place · Master's Presentation",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "tilt",
          "y": "2025",
          "place": "AACR Annual Meeting · Chicago",
          "title": "Monitoring CTC tumoroids",
          "text": "First-author poster on an automated approach for real-time tumoroid monitoring.",
          "award": "",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "tilt d1",
          "y": "2025",
          "place": "Diagnostics · journal",
          "title": "Detecting demodex mites",
          "text": "Co-author of a peer-reviewed paper in Diagnostics 15(24).",
          "award": "",
          "link": "https://doi.org/10.3390/diagnostics15243204",
          "linkLabel": "Read the paper"
        },
        {
          "cls": "tilt d2",
          "y": "2025.07",
          "place": "Yuan Ze University · M.Sc. thesis",
          "title": "CTC image segmentation",
          "text": "Cell segmentation, time-series and one-class anomaly detection. Advisor: Dr. Ting-Ying Chien.",
          "award": "",
          "link": "",
          "linkLabel": ""
        }
      ]
    },
    "life": {
      "eyebrow": "Life",
      "h1": "Outside of work,",
      "h2": "I'm happiest with people.",
      "lede": "Music, snow and good company: the parts of me that don't fit on a resume.",
      "items": [
        {
          "cls": "tilt",
          "icon": "audio",
          "kw": "Music",
          "title": "From trombone to the podium",
          "a": "I played trombone in the Yuan Ze University wind band, then spent 2021–2022 as its student conductor: leading rehearsals and performances, choosing repertoire, and preparing us for the National Student Music Competition.",
          "ph": "",
          "b": ""
        },
        {
          "cls": "tilt d1",
          "icon": "sparkle",
          "kw": "Snowboarding",
          "title": "Ten days in Hokkaido, every winter",
          "a": "Snowboarding is my favourite way to switch off. For the past three winters I have spent about ten days riding in Hokkaido.",
          "ph": "",
          "b": ""
        },
        {
          "cls": "tilt d2",
          "icon": "user",
          "kw": "Group activities",
          "title": "Better together",
          "a": "I love joining group activities. It's the same reason I loved the band: lots of people, one shared goal.",
          "ph": "",
          "b": ""
        }
      ]
    },
    "roadmap": {
      "eyebrow": "Roadmap",
      "h1": "Still exploring,",
      "h2": "with a clear direction.",
      "a": "I'm in no rush to pin myself to one job title. Over the next three years I want to become an engineer who can ",
      "s": "design, deploy and operate reliable systems",
      "b": ", finding my specialty through hands-on work.",
      "writeTag": "2026 iThome Ironman · AI Engineering",
      "writeTitle": "Learning SRE for the AI Era",
      "writeText": "My contest series, from an SRE lab to production AI reliability: FastAPI, Prometheus, Grafana, Loki, OpenTelemetry and LLM tracing, applied to SLOs, error budgets, failure injection and incidents.",
      "writeLinkIthome": "Read the series on iThome",
      "writeLink": "Lab code on GitHub",
      "rows": [
        {
          "k": "Most interested",
          "v": "SRE, infrastructure and systems operations"
        },
        {
          "k": "Also love",
          "v": "Hardware, compute infrastructure, device deployment, system integration"
        },
        {
          "k": "Still pursuing",
          "v": "Self-directed research in biomedical and applied AI"
        },
        {
          "k": "Location",
          "v": "Taiwan first; open to international roles and relocation"
        },
        {
          "k": "Languages",
          "v": "Mandarin (native) · English for work (IELTS 6.0)"
        }
      ],
      "stack": [
        {
          "title": "Daily drivers",
          "items": [
            {
              "name": "Python",
              "cls": "hi"
            },
            {
              "name": "FastAPI",
              "cls": "hi"
            },
            {
              "name": "Docker",
              "cls": "hi"
            },
            {
              "name": "PostgreSQL",
              "cls": "hi"
            },
            {
              "name": "Linux / Ubuntu",
              "cls": ""
            },
            {
              "name": "Claude Code",
              "cls": ""
            },
            {
              "name": "Codex",
              "cls": ""
            }
          ],
          "note": ""
        },
        {
          "title": "Deploy & observe",
          "items": [
            {
              "name": "Docker Compose",
              "cls": ""
            },
            {
              "name": "GCP",
              "cls": ""
            },
            {
              "name": "GitHub Actions",
              "cls": ""
            },
            {
              "name": "Vercel",
              "cls": ""
            },
            {
              "name": "Supabase",
              "cls": ""
            },
            {
              "name": "Cloudflare",
              "cls": ""
            },
            {
              "name": "Prometheus",
              "cls": ""
            },
            {
              "name": "Grafana",
              "cls": ""
            },
            {
              "name": "Loki",
              "cls": ""
            },
            {
              "name": "LangSmith",
              "cls": ""
            }
          ],
          "note": ""
        },
        {
          "title": "AI & hardware",
          "items": [
            {
              "name": "PyTorch",
              "cls": ""
            },
            {
              "name": "OpenCV",
              "cls": ""
            },
            {
              "name": "YOLO",
              "cls": ""
            },
            {
              "name": "vLLM",
              "cls": ""
            },
            {
              "name": "Ollama",
              "cls": ""
            },
            {
              "name": "CUDA",
              "cls": ""
            },
            {
              "name": "DGX Spark",
              "cls": ""
            },
            {
              "name": "Jetson Nano",
              "cls": ""
            },
            {
              "name": "Raspberry Pi",
              "cls": ""
            }
          ],
          "note": ""
        },
        {
          "title": "Frontend & other languages",
          "items": [
            {
              "name": "Vue.js",
              "cls": ""
            },
            {
              "name": "React",
              "cls": ""
            },
            {
              "name": "Next.js",
              "cls": ""
            },
            {
              "name": "C++",
              "cls": ""
            },
            {
              "name": "Rust (beginner)",
              "cls": ""
            }
          ],
          "note": "TypeScript work is AI-assisted."
        }
      ]
    },
    "contact": {
      "eyebrow": "Let's talk",
      "title": "Let's build together.",
      "lede": "Hiring for SRE, platform, backend or ML infrastructure? Looking for a research collaborator? I'd love to hear from you."
    },
    "foot": "Built with the Prism design system"
  },
  "zh": {
    "brand": "李浩廷",
    "navLabel": "主要導覽",
    "langLabel": "語言",
    "nav": [
      {
        "label": "問題",
        "href": "#mission"
      },
      {
        "label": "歷程",
        "href": "#origin"
      },
      {
        "label": "專長",
        "href": "#product"
      },
      {
        "label": "做事方式",
        "href": "#culture"
      },
      {
        "label": "案例",
        "href": "#cases"
      },
      {
        "label": "生活",
        "href": "#life"
      },
      {
        "label": "聯絡",
        "href": "#contact"
      }
    ],
    "hero": {
      "aria": "自我介紹",
      "idx": "軟體工程師",
      "eyebrow": "台灣 桃園",
      "kicker": "嗨，我是",
      "name": "李浩廷",
      "subName": "Hao-Ting Lee · 叫我 Justin 就好。",
      "a": "我把",
      "em": "真實世界的需求",
      "b": "做成能穩定運作的系統。我的優勢是醫學影像研究背景、能動手的硬體經驗，以及把數字查清楚的習慣。",
      "chips": [
        {
          "label": "可靠系統 × AI",
          "tone": "accent"
        },
        {
          "label": "研究背景",
          "tone": "neutral"
        },
        {
          "label": "硬體與邊緣",
          "tone": "neutral"
        },
        {
          "label": "尋找 SRE／平台職位",
          "tone": "neutral"
        }
      ],
      "cta1": "看看我的故事",
      "cta2": "打聲招呼",
      "photoAlt": "李浩廷的半身照，穿白色與深藍拼接襯衫，手托下巴"
    },
    "facts": {
      "eyebrow": "成長指標",
      "g1": "維運 · LabMonitor",
      "g2": "工程",
      "g3": "研究與成長",
      "l1": "7 台儀器每日最多排程讀數",
      "u2": "輪",
      "l2": "每天取代的人工抄錄",
      "l3": "24 小時裝置健康快照 ok 比例",
      "l4": "2026 年 8 月四項排程工作的成功執行次數",
      "l5": "每次 LabMonitor 部署前把關的自動化測試",
      "l6": "前期成本比替代設備低（NT$2 萬 vs NT$12 萬）",
      "l7": "Relay 以 Rust 改寫的元件 p50 延遲降低（本機量測）",
      "l8": "映像比 python:3.12-slim 小，且已含應用（devops-lab）",
      "l9": "期刊與國際研討會發表",
      "l10": "ICMHI 獎項，其中兩座第一名",
      "u11": "國",
      "l11": "上台發表研究的國家：日本、美國",
      "l12": "實習期間交付的全端系統"
    },
    "mission": {
      "eyebrow": "我要解決的問題",
      "h1": "做出漂亮的 demo 不難，",
      "h2": "讓系統每天穩定運作才難。",
      "lines": [
        "我從研究室出發，",
        "用深度學習看懂腦部 CT 和細胞顯微影像。",
        "在生技新創實習時，我看見真正的缺口：",
        "模型和原型到處都是，每天都能穩定運作的系統卻很少。",
        "於是這成了我的重心：把實驗室需求做成系統，接上相機、感測器和 GPU，",
        "然後在它半夜出狀況時，找出為什麼。"
      ],
      "sign": "浩廷 · 2026 年秋，桃園"
    },
    "origin": {
      "eyebrow": "一路走來",
      "h1": "從研究室，",
      "h2": "走到每天在跑的系統。",
      "items": [
        {
          "when": "2020",
          "stage": "研究",
          "tone": "neutral",
          "title": "在研究室起步",
          "org": "元智大學 資訊工程 學士 → 碩士",
          "a": "研究醫學影像：腦出血定位、冠狀動脈鈣化、循環腫瘤細胞分割。也在這裡管理 Ubuntu 實驗室伺服器、在 A100 上部署 LLM，",
          "s": "第一次對「系統」本身產生興趣",
          "b": "。"
        },
        {
          "when": "2022",
          "stage": "初次維運",
          "tone": "neutral",
          "title": "第一次碰真實的維運",
          "org": "台灣圓點奈米科技 · MIS 實習生",
          "a": "協助管理內部資訊系統與 IT 基礎設施，處理各種臨時狀況。",
          "s": "課本裡的東西，第一次要對真實的人負責。",
          "b": ""
        },
        {
          "when": "2023",
          "stage": "建置",
          "tone": "info",
          "title": "把需求做成系統",
          "org": "Cancerfree Biotech · 軟體工程實習生",
          "a": "研究與產品並行：用 Vue.js 和 FastAPI 做了 4 個以上的全端系統，在 GCP 上部署、用 Grafana 看監控，把 YOLO 放進邊緣裝置。",
          "s": "研究成果也帶到了日本和芝加哥。",
          "b": ""
        },
        {
          "when": "2025",
          "stage": "維運",
          "tone": "success",
          "title": "讓系統每天穩穩地跑",
          "org": "Cancerfree Biotech · 軟體工程師",
          "a": "把實習時的原型延伸成每天自動運作的系統，也負責它們出問題的時候。",
          "s": "同時打造同事每天在用的內部工具",
          "b": "：公司內部 AI 桌面助理、取代付費 SaaS 的實驗室紀錄系統、Shopify 商店後台，以及本地 AI 推論與 PubMed RAG 流程。"
        },
        {
          "when": "2026 →",
          "stage": "下一步",
          "tone": "accent",
          "title": "往基礎設施走得更深",
          "org": "尋找 SRE、平台、後端與 ML 基礎設施職位",
          "a": "接下來的重點是深度：",
          "s": "成為能設計、部署並維運可靠軟體與 AI 系統的工程師",
          "b": "，在台灣或海外都可以。這段路我寫成了 iThome 鐵人賽系列。"
        }
      ]
    },
    "product": {
      "eyebrow": "我能帶來什麼",
      "h1": "四項專長，",
      "h2": "一位工程師。",
      "lede": "我能為團隊帶來的價值。每一項都有在正式環境運作過的系統作為後盾，不只是教學範例。",
      "items": [
        {
          "cls": "tilt",
          "icon": "layers",
          "tag": "全端系統",
          "name": "Build 建置",
          "desc": "從需求到能用的產品：API、資料庫、驗證，以及人們真正會用的介面。",
          "feats": [
            "FastAPI · React · Next.js · Vue.js",
            "PostgreSQL · Supabase · Neon · pgvector",
            "為實驗室、營運與電商團隊打造內部工具"
          ]
        },
        {
          "cls": "tilt d1",
          "icon": "settings",
          "tag": "部署 · 觀測 · 復原",
          "name": "Run 維運",
          "desc": "上線之後讓系統保持健康：容器、CI、監控、告警，以及修好壞掉的地方。",
          "feats": [
            "Docker · GCP · GitHub Actions · Vercel",
            "Prometheus · Loki · Grafana",
            "約 12 種告警，含確認與再通知"
          ]
        },
        {
          "cls": "tilt d2",
          "icon": "sliders",
          "tag": "硬體與邊緣",
          "name": "Connect 連接",
          "desc": "把軟體帶進實體實驗室：相機、感測器、邊緣板與 GPU 伺服器。",
          "feats": [
            "Raspberry Pi 5 · Jetson Nano · DGX Spark",
            "在邊緣裝置部署 YOLOv8 與 YOLO11",
            "以 vLLM 與 Ollama 提供 LLM 與語音服務"
          ]
        },
        {
          "cls": "tilt d3",
          "icon": "sparkle",
          "tag": "應用 AI 與醫學影像",
          "name": "Research 研究",
          "desc": "醫學影像深度學習的研究底子，延伸到 agent 工具與 RAG，以及謹慎量測的習慣。",
          "feats": [
            "PyTorch · OpenCV · CTC 分割",
            "Agent 工具、RAG 與 MCP 整合",
            "7 篇發表、3 座 ICMHI 獎項"
          ]
        }
      ]
    },
    "culture": {
      "eyebrow": "我的做事方式",
      "h1": "技能之外，",
      "h2": "這是我做事的方式。",
      "items": [
        {
          "cls": "trait t1",
          "n": "01 / 06",
          "t1": "先查透，",
          "t2": "再帶著選項來討論",
          "icon": "search",
          "kw": "面對模糊",
          "a": "需求說不清楚的時候，我不會乾等，也不會憑感覺開工。我會先",
          "s": "自己把問題和可能的技術方向查一輪",
          "b": "，整理成幾個選項，再回頭跟提出需求的人對齊，一起決定方向。",
          "proof": "現在的做法是：把同事的需求轉成 UI 或功能設計，讓 Claude Code 或 Codex 產出實作計畫，我審過計畫後再開發，最後跑測試、CI，並請提出需求的同事試用。"
        },
        {
          "cls": "trait t2",
          "n": "02 / 06",
          "t1": "走不通，",
          "t2": "就換一條路",
          "icon": "branch",
          "kw": "不戀棧",
          "a": "做 LabMonitor 時，我先自己訓練了讀儀表數字的模型，但資料太相似，怎麼調都不夠穩。我沒有硬撐，",
          "s": "改用 GPT-4o mini 讀取數字",
          "b": "，讓系統先能可靠地跑起來。",
          "proof": "第二版每 5 分鐘取樣 7 台儀器，取代每天 8 輪人工抄錄。"
        },
        {
          "cls": "trait t3",
          "n": "03 / 06",
          "t1": "喜歡摸得到的",
          "t2": "機器",
          "icon": "settings",
          "kw": "硬體",
          "a": "比起只活在雲端的程式，我更享受把東西接到真實世界：",
          "s": "在 Raspberry Pi、Jetson Nano 跑 YOLO，在 DGX Spark、Mac mini 架 LLM 與語音服務",
          "b": "，在學校管 A100 實驗室伺服器。",
          "proof": "Raspberry Pi 5 上 3 個同步迴圈各自獨立監督，一個掛掉不會拖垮其他。"
        },
        {
          "cls": "trait t4",
          "n": "04 / 06",
          "t1": "數字要講清楚，",
          "t2": "邊界也要",
          "icon": "eye",
          "kw": "誠實",
          "a": "我在意數字是怎麼量出來的。做 Relay 的效能比較時，我用 3 次暖機加 30 次交錯量測，並",
          "s": "明確寫下這只是本機結果",
          "b": "；做 devops-lab 時，也把沒解決的掃描器缺口記下來，而不是假裝解決了。",
          "proof": "沒量過的東西，我不寫成成果。"
        },
        {
          "cls": "trait t5",
          "n": "05 / 06",
          "t1": "指揮台教我的",
          "t2": "團隊協作",
          "icon": "audio",
          "kw": "管樂社指揮",
          "a": "大學時我當了一年管樂社學生指揮：規劃排練進度、選曲、跟老師溝通。",
          "s": "讓幾十個人朝同一個方向前進",
          "b": "，靠的不是指令，是規劃和共識。這件事我一直帶在工作裡。",
          "proof": "負責全國學生音樂比賽的報名與備賽。"
        },
        {
          "cls": "trait t6",
          "n": "06 / 06",
          "t1": "下班了，",
          "t2": "還在動手做",
          "icon": "sparkle",
          "kw": "好奇心",
          "a": "想搞懂一件事，我會直接做一個出來。為了管理自己的開發帳號，我寫了",
          "s": "跨平台 CLI Relay 並發布到 npm",
          "b": "；為了理解交付鏈，我持續維護 devops-lab：把一個小應用從映像簽章一路帶到 Kubernetes、Terraform 和 CI。",
          "proof": "也完成了 30 天的 2026 iThome 鐵人賽系列《Learning SRE for the AI Era》。"
        }
      ]
    },
    "cases": {
      "eyebrow": "案例",
      "h1": "這些專長，",
      "h2": "實際上線的樣子。",
      "items": [
        {
          "cls": "rv",
          "title": "LabMonitor",
          "meta": "實驗室儀器監控",
          "text": "從實習時不綁供應商的初版，做到有相機、OCR、感測器與約 12 種告警的第二版，運作期間沒有發生服務中斷。材料成本約 NT$20,000，替代方案約 NT$120,000。",
          "why": "→ Build · Run · Connect",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d1",
          "title": "CF OpenWorker",
          "meta": "內部 AI agent 平台",
          "text": "同事需要能處理機密資料的 AI。我主導把開源桌面 agent 公司化：公司 SSO、內部模型閘道、beta／LTS 雙軌發版與自動更新、網站入口，並開發 7 類 agent 工具，例如長音檔轉錄與需審核的分享。",
          "why": "→ Build · Run · Research",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d2",
          "title": "LabReport",
          "meta": "實驗室紀錄 · 取代 Ragic",
          "text": "把實驗室紀錄從付費 SaaS Ragic 搬進依自家流程打造的內部系統：試劑批號、逐管領用、儀器紀錄，並以公司 Azure AD 控管存取。已經減少 4 個訂閱席位。",
          "why": "→ Build",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv",
          "title": "本地 AI 推論",
          "meta": "DGX Spark · Mac mini · vLLM",
          "text": "架設與維運 LLM、語音辨識與影音生成模型，搭配健康檢查，從 GPU 記憶體錯誤自動復原。",
          "why": "→ Run · Connect",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d1",
          "title": "Prometheus VMS",
          "meta": "智慧眼鏡實驗室系統",
          "text": "參與影像管理整合：多路 RTSP 串流、瀏覽器即時觀看、錄影與片段擷取。",
          "why": "→ Build · Connect",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d2",
          "title": "PubBrain",
          "meta": "PubMed 知識層與 RAG",
          "text": "把 2016 到 2026 年的 PubMed 摘要整理成可語意搜尋的知識庫（PostgreSQL + pgvector），用 LangSmith 追蹤 RAG 流程。",
          "why": "→ Build · Research",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv",
          "title": "Eatable",
          "meta": "個人專案 · MCP server",
          "text": "用聊天記錄飲食的 app，自己寫了有 OAuth 保護的 MCP server：約 20 個工具由 app 內 agent 與 Claude 共用，並搭配對應的 Agent Skill。我每天都用 Claude 透過它記錄。",
          "why": "→ 做事方式：下班還在做",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d1",
          "title": "Relay",
          "meta": "個人專案 · npm",
          "text": "管理 Claude Code 憑證快照的跨平台 CLI，寫入加鎖、以原子方式替換檔案。",
          "why": "→ 做事方式：下班還在做",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "rv d2",
          "title": "devops-lab",
          "meta": "學習實驗 · 開源",
          "text": "把一個 FastAPI 應用走完整條交付鏈：簽章的 chiselled Ubuntu 映像、拒絕未簽章映像的強化 Kubernetes 部署、用 Terraform 管理的監控，以及在 kind 上跑的 CI。在筆電上運行，不是正式環境。",
          "why": "→ Run · 做事方式：邊界講清楚",
          "link": "https://github.com/darkstar1227/devops-lab",
          "linkLabel": "在 GitHub 查看"
        }
      ]
    },
    "press": {
      "eyebrow": "上台與獲獎",
      "h1": "把研究",
      "h2": "講給世界聽。",
      "lede": "我享受站上台，把複雜的事講清楚。碩士的循環腫瘤細胞研究，一路發表到日本與美國。",
      "items": [
        {
          "cls": "tilt",
          "y": "2022",
          "place": "ICMHI · 日本",
          "title": "腦出血位置偵測",
          "text": "第一次在國際研討會上台，用深度學習定位中風患者的腦出血。",
          "award": "Session Best Presenter",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "tilt d1",
          "y": "2023",
          "place": "ICMHI · 日本",
          "title": "冠狀動脈鈣化偵測",
          "text": "第一作者論文，以深度學習偵測冠狀動脈鈣化。",
          "award": "學生論文競賽 第一名",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "tilt d2",
          "y": "2025",
          "place": "ICMHI · 日本",
          "title": "CTC 時間序列影像分割",
          "text": "把碩士研究帶上台：自動分割培養中的循環腫瘤細胞。",
          "award": "碩士組報告 第一名",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "tilt",
          "y": "2025",
          "place": "AACR 年會 · 芝加哥",
          "title": "CTC 類器官即時監測",
          "text": "第一作者海報，發表自動化即時監測方法。",
          "award": "",
          "link": "",
          "linkLabel": ""
        },
        {
          "cls": "tilt d1",
          "y": "2025",
          "place": "Diagnostics · 期刊",
          "title": "眼部蠕形蟎偵測",
          "text": "共同作者，論文刊登於 Diagnostics 15(24)。",
          "award": "",
          "link": "https://doi.org/10.3390/diagnostics15243204",
          "linkLabel": "閱讀論文"
        },
        {
          "cls": "tilt d2",
          "y": "2025.07",
          "place": "元智大學 · 碩士論文",
          "title": "循環腫瘤細胞影像分割",
          "text": "細胞分割、時間序列與 one-class 異常偵測。指導教授 Dr. Ting-Ying Chien。",
          "award": "",
          "link": "",
          "linkLabel": ""
        }
      ]
    },
    "life": {
      "eyebrow": "生活",
      "h1": "工作之外，",
      "h2": "我喜歡和人在一起。",
      "lede": "音樂、雪地和一群好夥伴：履歷放不下的那些我。",
      "items": [
        {
          "cls": "tilt",
          "icon": "audio",
          "kw": "音樂",
          "title": "從長號，到指揮台",
          "a": "我在元智大學管樂社吹長號，2021–2022 年擔任學生指揮：帶排練與演出、選曲，並帶大家準備全國學生音樂比賽。",
          "ph": "",
          "b": ""
        },
        {
          "cls": "tilt d1",
          "icon": "sparkle",
          "kw": "單板滑雪",
          "title": "每年冬天，北海道十天",
          "a": "單板滑雪是我最喜歡的放空方式。這三年的冬天，我每年都到北海道滑十天左右。",
          "ph": "",
          "b": ""
        },
        {
          "cls": "tilt d2",
          "icon": "user",
          "kw": "團體活動",
          "title": "一群人更好玩",
          "a": "我喜歡參加團體活動。理由和喜歡樂團一樣：很多人，一個共同目標。",
          "ph": "",
          "b": ""
        }
      ]
    },
    "roadmap": {
      "eyebrow": "路線圖",
      "h1": "還在探索，",
      "h2": "但方向很清楚。",
      "a": "我不急著替自己貼上一個職稱。接下來三年，我想成為能",
      "s": "設計、部署並維運可靠系統",
      "b": "的工程師，在動手的過程中找到最適合的專長。",
      "writeTag": "2026 iThome 鐵人賽 · AI Engineering",
      "writeTitle": "Learning SRE for the AI Era",
      "writeText": "我的參賽系列：從 SRE Lab 到 Production AI Reliability。用 FastAPI、Prometheus、Grafana、Loki、OpenTelemetry 與 LLM Tracing，實作 SLO、Error Budget、故障注入與事故處理。",
      "writeLinkIthome": "在 iThome 閱讀系列",
      "writeLink": "GitHub 實作程式碼",
      "rows": [
        {
          "k": "最感興趣",
          "v": "SRE、基礎設施與系統維運"
        },
        {
          "k": "也很喜歡",
          "v": "硬體、算力基礎設施、裝置部署與系統整合"
        },
        {
          "k": "沒放下的",
          "v": "生醫 AI 與應用 AI 的自主研究"
        },
        {
          "k": "地點",
          "v": "台灣優先，也歡迎海外機會，可以搬遷"
        },
        {
          "k": "語言",
          "v": "中文母語 · 英文工作溝通（IELTS 6.0）"
        }
      ],
      "stack": [
        {
          "title": "每天在用",
          "items": [
            {
              "name": "Python",
              "cls": "hi"
            },
            {
              "name": "FastAPI",
              "cls": "hi"
            },
            {
              "name": "Docker",
              "cls": "hi"
            },
            {
              "name": "PostgreSQL",
              "cls": "hi"
            },
            {
              "name": "Linux／Ubuntu",
              "cls": ""
            },
            {
              "name": "Claude Code",
              "cls": ""
            },
            {
              "name": "Codex",
              "cls": ""
            }
          ],
          "note": ""
        },
        {
          "title": "部署與觀測",
          "items": [
            {
              "name": "Docker Compose",
              "cls": ""
            },
            {
              "name": "GCP",
              "cls": ""
            },
            {
              "name": "GitHub Actions",
              "cls": ""
            },
            {
              "name": "Vercel",
              "cls": ""
            },
            {
              "name": "Supabase",
              "cls": ""
            },
            {
              "name": "Cloudflare",
              "cls": ""
            },
            {
              "name": "Prometheus",
              "cls": ""
            },
            {
              "name": "Grafana",
              "cls": ""
            },
            {
              "name": "Loki",
              "cls": ""
            },
            {
              "name": "LangSmith",
              "cls": ""
            }
          ],
          "note": ""
        },
        {
          "title": "AI 與硬體",
          "items": [
            {
              "name": "PyTorch",
              "cls": ""
            },
            {
              "name": "OpenCV",
              "cls": ""
            },
            {
              "name": "YOLO",
              "cls": ""
            },
            {
              "name": "vLLM",
              "cls": ""
            },
            {
              "name": "Ollama",
              "cls": ""
            },
            {
              "name": "CUDA",
              "cls": ""
            },
            {
              "name": "DGX Spark",
              "cls": ""
            },
            {
              "name": "Jetson Nano",
              "cls": ""
            },
            {
              "name": "Raspberry Pi",
              "cls": ""
            }
          ],
          "note": ""
        },
        {
          "title": "前端與其他語言",
          "items": [
            {
              "name": "Vue.js",
              "cls": ""
            },
            {
              "name": "React",
              "cls": ""
            },
            {
              "name": "Next.js",
              "cls": ""
            },
            {
              "name": "C++",
              "cls": ""
            },
            {
              "name": "Rust（入門）",
              "cls": ""
            }
          ],
          "note": "TypeScript 開發以 AI 輔助完成。"
        }
      ]
    },
    "contact": {
      "eyebrow": "聯絡",
      "title": "一起把系統做穩。",
      "lede": "正在找 SRE、平台、後端或 ML 基礎設施人才？想找研究夥伴？歡迎寫信給我。"
    },
    "foot": "以 Prism 設計系統建置"
  }
};

export type Lang = keyof typeof I18N;
export type Copy = (typeof I18N)["en"];
