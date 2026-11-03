export interface Founder {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  detailedBio: string;
  githubUsername: string;
  githubUrl: string;
  avatarUrl: string;
  technicalFocus: string[];
  keyHighlights: string[];
  initials: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  shortDescription: string;
  clientProblem: string;
  proposedSolution: string;
  deliverables: string[];
  workflow: string[];
  technologies: string[];
  featuredProject?: {
    name: string;
    owner: string;
    repo: string;
    note: string;
  };
}

export const STUDIO_CONFIG = {
  brand: {
    name: "Webstix",
    tagline: "Websites Built for What's Next.",
    eyebrow: "INDEPENDENT DIGITAL STUDIO",
    heroSupporting: "We design and build modern digital experiences that help ambitious businesses turn ideas into reality.",
    subHeroLine: "Two builders. One shared vision. Digital products made with purpose.",
    shortAbout: "Webstix is an independent digital studio founded by Vinit Gohil and Riddhi Patthar. We build fast, responsive, and maintainable web applications and modern websites for clients in India and worldwide.",
    domain: "webstix.studio",
    url: "https://webstix.studio",
    contactEmail: "hello.webstix@gmail.com",
  },
  founders: [
    {
      id: "vinitgohil45",
      name: "Vinit Gohil",
      role: "CEO",
      shortBio: "Full-stack developer and studio CEO focused on responsive web architectures, e-commerce stores, and high-performance applications.",
      detailedBio: "Vinit serves as CEO and leads architecture and full-stack development at Webstix. With a strong foundation in modern web engineering (TypeScript, React, Next.js, Node.js, and Java), he specializes in crafting reliable, scalable systems—from complex multi-tier platforms to production-ready online retail experiences.",
      githubUsername: "vinitgohil45",
      githubUrl: "https://github.com/vinitgohil45",
      avatarUrl: "/images/vinit.jpg",
      technicalFocus: [
        "Full-Stack Web Development",
        "Next.js & React Applications",
        "TypeScript & Node.js",
        "E-Commerce Architectures",
        "REST APIs & Scalable Backends",
        "Java & Database Management"
      ],
      keyHighlights: [
        "Built CraveGo (Food Delivery) full-stack ordering and administration platform",
        "Architected Aavira Clothing e-commerce web storefront",
        "Engineered Pharma AI QMS quality management web workflow",
        "Author of multiple verified web applications and open-source utilities"
      ],
      initials: "VG"
    },
    {
      id: "riddhipatthar",
      name: "Riddhi Patthar",
      role: "CEO",
      shortBio: "Frontend & real-time web developer and studio CEO specializing in interactive user experiences, modern layouts, and reactive web applications.",
      detailedBio: "Riddhi serves as CEO and leads frontend engineering at Webstix with a passion for building intuitive, high-engagement digital interfaces. Her engineering background centers on React, TypeScript, Node.js, and real-time socket communications, transforming intricate product requirements into clean, accessible, and fluid user journeys.",
      githubUsername: "riddhipatthar",
      githubUrl: "https://github.com/riddhipatthar",
      avatarUrl: "/images/riddhi.jpg",
      technicalFocus: [
        "Frontend Engineering & UI/UX",
        "Real-Time Applications (Socket.IO)",
        "React & TypeScript",
        "Node.js & MongoDB",
        "Responsive Digital Layouts",
        "Accessible Web Design"
      ],
      keyHighlights: [
        "Engineered Synchronized Video Streaming web app with real-time playback and chat",
        "Designed modern business web experiences for design studios and events",
        "Focus on high-speed CSS architectures and accessible component hierarchies",
        "Collaborative architecture across both client and server stacks"
      ],
      initials: "RP"
    }
  ] as Founder[],
  principles: [
    {
      title: "Direct CEO Collaboration",
      description: "You work directly with the CEOs writing every line of code—no account managers, no diluted communication."
    },
    {
      title: "Clean, Maintainable Code",
      description: "We use battle-tested technologies (TypeScript, Next.js, Tailwind CSS) that your business can depend on and scale effortlessly."
    },
    {
      title: "Transparent & Honest Scoping",
      description: "Clear milestones, direct progress demos, and realistic expectations without inflated promises or hidden charges."
    },
    {
      title: "Performance & Responsiveness First",
      description: "Every page is crafted to load fast, score high on Core Web Vitals, and adapt smoothly from compact mobile screens to ultra-wide monitors."
    }
  ],
  process: [
    {
      step: "01",
      name: "Discover",
      summary: "Understand the business, audience, goals, and requirements through focused discussion."
    },
    {
      step: "02",
      name: "Plan",
      summary: "Define scope, technical architecture, wireframes, milestone roadmap, and delivery timeline."
    },
    {
      step: "03",
      name: "Build",
      summary: "Implement responsive layouts, accessible components, clean code, and resilient integrations."
    },
    {
      step: "04",
      name: "Test",
      summary: "Perform thorough cross-device QA, accessibility checks, performance audits, and user journey testing."
    },
    {
      step: "05",
      name: "Launch",
      summary: "Deploy to production, configure custom domains and analytics, and provide handover documentation."
    }
  ],
  services: [
    {
      id: "website-design-development",
      title: "Website Design & Development",
      badge: "Core Service",
      shortDescription: "Custom-crafted, brand-tailored websites built from the ground up for speed, aesthetics, and conversions.",
      clientProblem: "Generic website templates often feel sluggish, fail to convey credibility, and don't reflect your unique brand identity.",
      proposedSolution: "We design bespoke digital experiences tailored to your audience, combining modern dark or light aesthetics with high-performance Next.js and Tailwind CSS.",
      deliverables: [
        "Custom responsive design system",
        "Full desktop, tablet, and mobile optimization",
        "Fast Core Web Vitals performance",
        "SEO foundational setup & meta tags",
        "Contact & inquiry workflows"
      ],
      workflow: [
        "Discovery & brand alignment",
        "Interactive UI architecture & layout approval",
        "Component-driven development",
        "Cross-browser testing & deployment"
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
    },
    {
      id: "business-websites-landing-pages",
      title: "Business Websites & Landing Pages",
      badge: "High Conversion",
      shortDescription: "Impactful web presences that introduce your business, establish trust, and turn visitors into qualified leads.",
      clientProblem: "Businesses struggle to communicate their value proposition clearly, resulting in high bounce rates and lost opportunities.",
      proposedSolution: "We structure clear, narrative-driven landing pages with bold typography, verified capability displays, and high-converting calls-to-action.",
      deliverables: [
        "High-impact hero section and value proposition",
        "Interactive services and capabilities grids",
        "Lead capture and inquiry contact forms",
        "Analytics and conversion event tracking setup"
      ],
      workflow: [
        "Goal definition and message hierarchy",
        "Wireframing and content structuring",
        "Design implementation and form integration",
        "Speed optimization and launch"
      ],
      technologies: ["React", "Next.js", "Tailwind CSS", "Semantic HTML5"]
    },
    {
      id: "ecommerce-solutions",
      title: "E-Commerce Websites",
      badge: "Retail & Sales",
      shortDescription: "Fast, modern storefronts designed to showcase products beautifully and guide customers to smooth checkout.",
      clientProblem: "Clunky checkout flows and bloated legacy platforms slow down shoppers and hurt mobile conversion rates.",
      proposedSolution: "Drawing on our direct experience building modern digital stores (such as Aavira Clothing), we create clean product catalogs, shopping carts, and seamless purchase flows.",
      deliverables: [
        "Dynamic product catalogs and filtering",
        "Shopping cart and drawer state management",
        "Mobile-first responsive purchasing journeys",
        "Payment gateway integration guidance",
        "Order inquiry and catalog management"
      ],
      workflow: [
        "Catalog structure & category mapping",
        "Storefront UI & shopping bag development",
        "Checkout flow and payment integration",
        "Load testing and production rollout"
      ],
      technologies: ["TypeScript", "Next.js", "Tailwind CSS", "REST APIs"],
      featuredProject: {
        name: "aavira-clothing",
        owner: "vinitgohil45",
        repo: "aavira-clothing",
        note: "Production e-commerce storefront demonstration with dynamic product catalog and responsive checkout UX."
      }
    },
    {
      id: "fullstack-web-apps",
      title: "Full-Stack Web Applications",
      badge: "Complex Systems",
      shortDescription: "Interactive custom web applications with authenticated accounts, databases, real-time data, and dashboards.",
      clientProblem: "Standard websites cannot support complex business logic, user logins, data persistence, or real-time communication.",
      proposedSolution: "We build scalable full-stack applications with robust APIs, relational or document databases, secure authentication, and real-time sockets (demonstrated in CraveGo and Synchronized Video Streaming).",
      deliverables: [
        "End-to-end full-stack architecture",
        "Authentication and user session management",
        "Database design and schema implementation",
        "Real-time event handling (WebSockets/Socket.IO)",
        "Administrative management dashboards"
      ],
      workflow: [
        "Data modeling and API specification",
        "Backend service and database setup",
        "Frontend interactive state implementation",
        "End-to-end security and load verification"
      ],
      technologies: ["TypeScript", "Node.js", "React", "Socket.IO", "MongoDB/SQL"],
      featuredProject: {
        name: "Synchronized Video Streaming",
        owner: "riddhipatthar",
        repo: "Synchronized-video-streaming-web-application",
        note: "Real-time collaborative video playback application with synchronized control and live chat."
      }
    },
    {
      id: "website-maintenance-improvements",
      title: "Website Maintenance & Performance",
      badge: "Reliability",
      shortDescription: "Ongoing technical care, performance optimizations, bug fixes, and feature updates for existing web assets.",
      clientProblem: "Websites degrade over time with broken scripts, slow loading speeds, unpatched packages, and outdated layouts.",
      proposedSolution: "We audit your codebase, eliminate performance bottlenecks, update dependencies, fix responsive layout bugs, and implement fresh enhancements.",
      deliverables: [
        "Performance audit and Core Web Vitals remediation",
        "Mobile responsiveness bug fixes",
        "Security update and dependency modernization",
        "Regular content updates and feature additions"
      ],
      workflow: [
        "Codebase inspection and diagnostic audit",
        "Prioritized issue backlog creation",
        "Iterative fixes and staging review",
        "Zero-downtime deployment"
      ],
      technologies: ["JavaScript/TypeScript", "CSS3", "Next.js", "Web Vitals"]
    },
    {
      id: "api-integrations",
      title: "API & Third-Party Integrations",
      badge: "Connected Services",
      shortDescription: "Connect your web platform to external services, payment gateways, CRM systems, and headless APIs.",
      clientProblem: "Disjointed tools force your team into manual data entry and create fragmented customer experiences.",
      proposedSolution: "We build resilient, secure server-side API connectors that sync data automatically and reliably between your website and third-party tools.",
      deliverables: [
        "Custom REST and webhook handlers",
        "Payment gateway integrations (Stripe, Razorpay, etc.)",
        "CRM & email service synchronization",
        "Secure environment variable management"
      ],
      workflow: [
        "API capability and rate-limit audit",
        "Server-side route development with error boundaries",
        "Validation and idempotency enforcement",
        "Logging and fallback monitoring"
      ],
      technologies: ["Node.js", "REST APIs", "Webhooks", "JSON"]
    }
  ] as ServiceItem[]
};
