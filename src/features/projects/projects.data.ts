import projectAfrilabs from "@/assets/africonnect-landing-africonnect-net.png";
import afriOpportunities from "@/assets/africonnect opportunities.png";
import afriDeal from "@/assets/africonnect deal.png";
import afriEcosystem from "@/assets/screencapture-africonnect-net-ecosystem-2026-07-06-14_56_30.png";
import afriAmari from "@/assets/africonnect amari.png";
import afriGathering from "@/assets/africonnet opportunities2.png";
import projectTrading from "@/assets/project-trading.jpg";
import projectDesignSystem from "@/assets/prembly.png";
import aiDashboard from "@/assets/aicryptodashboard2.png";
import aiMarket from "@/assets/aicryptodashboard.png";
import type { Project } from "./projects.types";

export const projects: Project[] = [
  {
    id: "africonnect",
    index: "01",
    name: "AfriLabs Connect",
    tag: "PLATFORM / ECOSYSTEM",
    image: projectAfrilabs,
    imageAlt: "AfriLabs Connect landing page — connect Africa's innovation ecosystem in one place",
    liveUrl: "https://africonnect.net/",
    gallery: [
      {
        src: projectAfrilabs,
        alt: "AfriLabs Connect landing page with the professional network, feeds, and job board",
      },
      {
        src: afriOpportunities,
        alt: "Opportunities marketplace — grants, jobs, investments and accelerators filterable by sector",
      },
      {
        src: afriDeal,
        alt: "AfriLabs Connect Deal Room (ACDR) matching investible startups with investment funds",
      },
      {
        src: afriEcosystem,
        alt: "Future of Work — enabling hubs and youth to earn through decentralised, African-led BPO",
      },
      {
        src: afriAmari,
        alt: "Amari, the generative-AI assistant answering questions about the AfriLabs ecosystem",
      },
      {
        src: afriGathering,
        alt: "The AfriLabs Annual Gathering convening innovators from across the continent",
      },
    ],
    overview:
      "AfriLabs Connect is the digital home of AfriLabs — Africa's largest network of innovation hubs, spanning 400+ hubs across 50+ countries. It unifies the ecosystem in one place: a professional network for founders and enablers, an opportunities marketplace, an investor deal room, and an AI assistant.",
    role: "Software Engineer Consultant · Frontend architecture and shared component system",
    problem:
      "AfriLabs' ecosystem operates across isolated platforms and channels - The system is fragmented, Startups, innovation hubs, Investors, and ecosystem partners often operate in separate systems, making it difficult to discover opportunities, collaborate, access funding, and share reliable data.",
    decisions:
      "The platform was built with a shared ecosystem architecture, giving each stakeholder a role-specific dashboard within a single unified platform. It centralizes networking, investor matching, project management, real-time communication, scheduling, and opportunity discovery, enabling seamless collaboration and relationship management across the innovation ecosystem.",
    impact:
      "Delivered a scalable platform that streamlined stakeholder collaboration, improved discoverability of opportunities, and established reusable frontend patterns across multiple modules.",
    stack: ["Angular 19", "TypeScript", "Tailwind CSS", "Angular Material", "Design Systems"],
    links: [{ label: "Live Demo", href: "https://africonnect.net/" }],
    reverse: true,
    timeline: [
      {
        phase: "Discovery & Platform Audit",
        points: [
          "Audited the existing Angular application to understand its architecture, technical debt, and user workflows.",
          "Identified duplicated UI, inconsistent patterns, and tightly coupled features across stakeholder modules.",
          "Mapped common functionality shared between Startups, Investors, BSOs, and other user types.",
          "Defined reusable patterns before building new features.",
        ],
      },
      {
        phase: "Design System & Frontend Foundation",
        points: [
          "Established a reusable component library using Angular Material and shared UI components.",
          "Standardized layouts, typography, spacing, form controls, tables, cards, and navigation patterns.",
          "Organized the codebase into feature modules, shared services, interceptors, guards, and reusable utilities.",
          "Introduced consistent API integration and error-handling patterns using RxJS and HttpClient.",
        ],
      },
      {
        phase: "Workflow Architecture",
        description:
          "Instead of building isolated screens, we designed reusable workflows that could be adapted across different stakeholders — so multiple user roles share the same business logic while exposing role-specific interfaces.",
        points: [
          "Authentication & onboarding",
          "Connection management",
          "Opportunity discovery",
          "Investor matchmaking",
          "Project lifecycle management",
          "Real-time messaging",
          "Calendar scheduling",
          "Profile and organization management",
        ],
      },
      {
        phase: "API Integration & Rollout",
        points: [
          "Integrated REST APIs across all platform modules.",
          "Implemented real-time communication using WebSockets.",
          "Connected external services such as Google Calendar for scheduling.",
          "Validated and optimized API payloads, loading states, and error handling.",
          "Rolled out modules incrementally, allowing backend and frontend teams to develop in parallel while maintaining a stable production experience.",
        ],
      },
      {
        phase: "Optimization & Scalability",
        points: [
          "Lazy-loaded feature modules with route guards for access control.",
          "Reusable components instead of duplicated UI, backed by shared services.",
          "Performance optimization and code splitting to keep bundles lean.",
          "Responsive layouts on a feature-based folder structure.",
          "Easier onboarding for new developers and reduced maintenance costs.",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Domain-driven module structure",
        description:
          "How we organized the design system to mirror business domains, making it intuitive for product teams.",
        code: `components/
│
├── primitives/                 # Low-level UI building blocks
│   ├── Button
│   ├── Input
│   ├── Select
│   ├── Badge
│   ├── Avatar
│   └── Card
│
├── patterns/                   # Reusable workflow compositions
│   ├── DataTable
│   ├── FilterPanel
│   ├── SearchBar
│   ├── Form
│   ├── Modal
│   ├── Pagination
│
├── domains/                    # Business domain components
│   ├── Startup
│   ├── Investor
│   ├── Business Support Organization (BSO)
│   ├── Opportunities
│   ├── Deal Room
│   ├── Projects
│   ├── Messaging
│   ├── Calendar
│   ├── Events
│   ├── Notifications
│
└── layouts/                    # Shared application layouts
    ├── Dashboard
    ├── Authentication
    ├── Workspace
    ├── Settings
    └── ErrorPages`,
        language: "plaintext",
      },
      //       {
      //         title: "Versioned component export",
      //         description: "How we managed breaking changes without disrupting squads mid-sprint.",
      //         code: `// packages/ui-library/package.json
      // {
      //   "version": "2.1.0",
      //   "exports": {
      //     "./primitives": "./dist/primitives/index.js",
      //     "./patterns": "./dist/patterns/index.js",
      //     "./domains": "./dist/domains/index.js"
      //   }
      // }

      // // Usage in consuming apps
      // import { Button, Input } from "@africonnect/ui/primitives";
      // import { FormBuilder } from "@africonnect/ui/patterns";`,
      //         language: "javascript",
      //       },
    ],
    metrics: [
      {
        label: "Feature time-to-ship",
        value: "-40%",
        context: "Reduced from 2-3 weeks to 1-2 weeks per feature across teams",
      },
      {
        label: "Visual regressions",
        value: "-85%",
        context: "Eliminated duplicate components that diverged over time",
      },
      {
        label: "Component reuse",
        value: "92%",
        context: "Of UI components now sourced from shared library",
      },
      {
        label: "Design consistency",
        value: "100%",
        context: "Single source of truth for all design tokens and patterns",
      },
    ],
    lessonsLearned: [
      "Domain-driven organization feels slower upfront but becomes a superpower when teams scale. It mirrors how product thinks about the business.",
      "Incremental adoption reduced delivery risk. Rolling out reusable components gradually allowed feature work to continue while improving consistency across the platform, avoiding disruptive, large-scale refactors.",
      "Building the design system isn't about components - it's a shared set of engineering and design decisions.",
      "Collaboration starts with shared contracts - Aligning on API contracts early reduced integration issues, simplified development, and enabled frontend and backend teams to work in parallel.",
    ],
    relatedPosts: [
      {
        title: "Building scalable component systems beyond the simple Button",
        href: "#notes",
      },
      {
        title: "Lessons from production frontend architecture",
        href: "#notes",
      },
    ],
  },
  {
    id: "trading-terminal",
    index: "02",
    name: "AI Trading Terminal",
    tag: "REAL_TIME / FINTECH",
    image: projectTrading,
    imageAlt: "Real-time AI trading dashboard with live charts and order book",
    liveUrl: "https://aicryptodashboard.netlify.app/",
    gallery: [
      {
        src: aiDashboard,
        alt: "AI crypto trading dashboard with live market data and streaming AI insights",
      },
      {
        src: aiMarket,
        alt: "AI crypto trading dashboard with live market data and streaming AI insights",
      },
      {
        src: projectTrading,
        alt: "AI crypto trading dashboard with live market data and streaming AI insights",
      },
    ],
    overview:
      "A high-performance real-time analytics platform handling high-frequency WebSocket streams, streaming AI insights, and dense financial visualizations.",
    role: "Lead Frontend Engineer · Architecture, performance, real-time layer",
    problem:
      "Render hundreds of WebSocket messages per second alongside streaming AI responses without dropping frames or blocking the main thread.",
    decisions:
      "Connected to Binance market streams over WebSockets behind custom hooks, batched high-frequency updates, and isolated chart re-renders with memoization so only affected components update. Streaming AI responses render incrementally without blocking the UI.",
    impact:
      "Delivered a dashboard that handles 100+ live updates per minute and stays smooth under continuous streaming. Reusable hooks simplified real-time data and AI integration, the component architecture scales for new features, and the interface stays responsive across desktop, tablet, and mobile.",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "Binance API",
      "LLM Streaming",
      "Custom React Hooks",
      "Vite",
      "Git",
    ],
    links: [
      { label: "Live Demo", href: "https://aicryptodashboard.netlify.app/" },
      // { label: "GitHub", href: "https://github.com/Mathew-Endurance/ai_streaming" },
    ],
    timeline: [
      {
        phase: "Architecture & Planning",
        points: [
          "Defined the dashboard layout around real-time trading workflows.",
          "Identified streaming and AI interactions as the core application features.",
          "Designed reusable state management patterns for live data.",
        ],
      },
      {
        phase: "Component Foundation",
        points: [
          "Built reusable UI components following Atomic Design.",
          "Standardized charts, cards, tables, and chat interfaces.",
          "Designed responsive layouts for desktop, tablet, and mobile.",
        ],
      },
      {
        phase: "Real-Time Streaming",
        points: [
          "Connected to Binance market streams using WebSockets.",
          "Managed connection, reconnection, and cleanup.",
          "Batched frequent updates to maintain smooth rendering.",
          "Built custom hooks to isolate streaming logic.",
        ],
      },
      {
        phase: "AI Integration",
        points: [
          "Developed a streaming AI interface with incremental rendering.",
          "Managed asynchronous responses without blocking the UI.",
          "Built reusable hooks for AI interactions and conversation state.",
        ],
      },
      {
        phase: "Performance Optimization",
        points: [
          "Reduced unnecessary re-renders with memoization.",
          "Batched state updates for high-frequency data.",
          "Optimized rendering for sustained real-time performance.",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Feature Architecture",
        description:
          "The dashboard's top-level features, organised around real-time trading workflows.",
        code: `Trading Dashboard
│
├── Market Overview
├── Live Charts
├── AI Trading Assistant
├── Watchlist
├── Portfolio
├── Trading Signals
├── Activity Feed
└── Settings`,
        language: "plaintext",
      },
      {
        title: "Component Architecture",
        description:
          "Components organised with Atomic Design — atoms compose into molecules, organisms, and page templates.",
        code: `components/
│
├── atoms/                 # Basic UI elements
│   ├── Button
│   ├── Badge
│   ├── Input
│   └── Spinner
│
├── molecules/             # Combined UI elements
│   ├── PriceCard
│   ├── MarketRow
│   ├── AIMessage
│   ├── SearchInput
│   └── SignalCard
│
├── organisms/             # Feature-level components
│   ├── MarketTable
│   ├── TradingChart
│   ├── AIChatPanel
│   ├── PortfolioSummary
│   └── ActivityFeed
│
└── templates/             # Page layouts
    ├── Dashboard
    ├── Trading
    └── Settings`,
        language: "plaintext",
      },
      {
        title: "Real-Time Data Flow",
        description:
          "Live Binance market data flows through a custom hook into memoized components.",
        code: `Binance WebSocket
        │
        ▼
useBinanceStream()
        │
        ▼
State Management
        │
        ▼
Memoized UI Components
        │
        ▼
Live Dashboard`,
        language: "plaintext",
      },
      {
        title: "AI Streaming Flow",
        description:
          "AI responses stream token-by-token and render incrementally into the chat interface.",
        code: `User Prompt
      │
      ▼
useStreamingLLM()
      │
      ▼
Streaming Response
      │
      ▼
Incremental Rendering
      │
      ▼
Chat Interface`,
        language: "plaintext",
      },
      {
        title: "Performance Strategy",
        description:
          "The techniques that keep the UI smooth under continuous high-frequency updates.",
        code: `• WebSocket lifecycle management
• Memoization (React.memo, useMemo, useCallback)
• Controlled state batching
• Incremental rendering
• Responsive rendering for high-frequency updates`,
        language: "plaintext",
      },
    ],
    metrics: [
      {
        label: "Frame rate",
        value: "60fps",
        context: "Sustained under continuous real-time streaming load",
      },
      {
        label: "p95 interaction latency",
        value: "48ms",
        context: "User interactions remain responsive even during streaming",
      },
      {
        label: "Re-renders",
        value: "-78%",
        context: "Cut with memoization and controlled state batching",
      },
      {
        label: "Time to interactive",
        value: "1.2s",
        context: "Dashboard is responsive from first paint",
      },
    ],
    lessonsLearned: [
      "Managing state efficiently is just as important as rendering fast when working with real-time data.",
      "WebSocket performance isn't about the library. It's about when and where you apply updates, and batching them was the biggest win.",
      "Memoization only helps when the selectors are right. Every chart that re-rendered despite memoization meant the selector was wrong.",
      "Custom hooks that isolate streaming and AI logic keep components simple and make the real-time behavior easy to reuse.",
      "Streaming AI responses with incremental rendering lets users see results as they arrive, without the UI freezing.",
    ],
    relatedPosts: [
      {
        title: "How I optimized a React dashboard handling 100k+ real-time data points",
        href: "#notes",
      },
      {
        title: "Understanding React rendering performance from first principles",
        href: "#notes",
      },
    ],
  },
  {
    id: "prembly-analytics",
    index: "03",
    name: "Prembly",
    tag: "DATA / DASHBOARDS",
    image: projectDesignSystem,
    imageAlt: "Prembly analytics dashboard for identity verification data",
    overview:
      "Prembly is a digital trust and identity infrastructure company. It provides APIs and platforms that help businesses verify identities, prevent fraud, and meet regulatory compliance requirements throughout the customer lifecycle.",
    role: "Software Engineer · Performance, data viz, Core Web Vitals",
    problem:
      "Pages routinely shipped 1MB+ of JS, LCP sat above 4 seconds, and chart-heavy views janked on mid-range devices used by most customers.",
    decisions:
      "The analytics dashboard was redesigned using Next.js, TypeScript, and D3.js, with a focus on performance, reusable UI patterns, and data visualization. The frontend introduced a modular dashboard architecture, optimized rendering for analytics-heavy pages, and standardized components to deliver a faster and more consistent user experience across the platform.",
    impact:
      "LCP dropped to 1.4s, JS payload shrank by 55%, and the dashboard cleared Core Web Vitals across every monitored page.",
    stack: ["Next.js", "TypeScript", "Recharts", "Edge Caching"],
    links: [{ label: "Live Demo", href: "https://prembly.com/" }],
    timeline: [
      {
        phase: "Lighthouse Audit",
        description:
          "Discovered LCP bottleneck: render-blocking chart library import. JS payload exceeded 1MB on dashboard.",
      },
      {
        phase: "Code Splitting Strategy",
        description:
          "Moved chart components to dynamic imports, split by route. Only load what you need when you need it.",
      },
      {
        phase: "Chart Library Migration",
        description:
          "Evaluated alternatives to heavy charting lib. Built lightweight wrapper around Recharts with typed adapters.",
      },
      {
        phase: "Streaming Dashboards",
        description:
          "Adopted skeleton-first rendering. Stream data in as it arrives rather than blocking on full data load.",
      },
    ],
    codeSnippets: [
      {
        title: "Route-level code splitting with Next.js",
        description: "How we split chart components so they only load when the route renders.",
        code: `// app/dashboard/page.tsx
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/Skeleton';

const VerificationChart = dynamic(
  () => import('@/components/charts/VerificationChart'),
  { loading: () => <Skeleton /> }
);

export default function DashboardPage() {
  return (
    <section>
      <h1>Verification Metrics</h1>
      <Suspense fallback={<Skeleton />}>
        <VerificationChart />
      </Suspense>
    </section>
  );
}`,
        language: "typescript",
      },
      {
        title: "Typed chart adapter pattern",
        description:
          "Abstraction that lets us swap chart libraries without changing consumer code.",
        code: `type ChartData = { label: string; value: number; }[];

interface IChartAdapter {
  render(data: ChartData): ReactNode;
}

class RechartsAdapter implements IChartAdapter {
  render(data: ChartData) {
    return (
      <LineChart data={data}>
        <CartesianGrid />
        <Line type="monotone" dataKey="value" />
      </LineChart>
    );
  }
}

// Swap implementations without touching consumers
export const useChart = () => new RechartsAdapter();`,
        language: "typescript",
      },
    ],
    metrics: [
      {
        label: "LCP (Largest Contentful Paint)",
        value: "1.4s",
        context: "Down from 4.2s. Now in green (< 2.5s threshold)",
      },
      {
        label: "JS payload",
        value: "-55%",
        context: "Reduced from 1.3MB to 580KB through code splitting",
      },
      {
        label: "CLS (Cumulative Layout Shift)",
        value: "0.08",
        context: "Stable layouts with skeleton loaders prevent jank",
      },
      {
        label: "Core Web Vitals score",
        value: "100",
        context: "All pages pass Google's Core Web Vitals thresholds",
      },
    ],
    lessonsLearned: [
      "Measure performance before optimizing. Lighthouse and bundle analysis showed where the biggest bottlenecks actually were.",
      "Dynamic imports improve performance, but good loading states matter just as much for a smooth experience.",
      "Users would rather see useful content quickly than wait for every piece of data to load.",
      "Optimizing for Core Web Vitals means designing for real-world devices, not just high-end machines.",
      "Performance and usability go hand in hand. Small frontend improvements can have a real impact on user engagement.",
    ],
    relatedPosts: [{ title: "Lessons from production frontend architecture", href: "#notes" }],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
