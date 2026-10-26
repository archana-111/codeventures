export interface MetricItem {
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  deliverables: string[];
  previewType: 'web' | 'deeptech' | 'mobile' | 'marketing';
}

export interface AdvantageItem {
  id: string;
  number: string;
  title: string;
  description: string;
  highlight: string;
  iconName: string;
}

export interface JourneyStep {
  step: string;
  title: string;
  timeframe: string;
  description: string;
  focus: string;
  outputs: string[];
}

export interface PortfolioProject {
  id: string;
  name: string;
  category: string;
  sector: 'SaaS' | 'Deep Tech' | 'Mobile' | 'Marketplace';
  description: string;
  involvement: string;
  impact: string;
  image: string;
  tags: string[];
  link?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceNote: string;
  timeline: string;
  equity: string;
  badge?: string;
  features: string[];
  ctaLabel: string;
  popular?: boolean;
}

export interface PartnerPerk {
  name: string;
  logo: string;
  value: string;
  description: string;
  category: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Process' | 'Pricing' | 'Technical';
}

export const METRICS: MetricItem[] = [
  {
    value: '20+',
    numericValue: 20,
    suffix: '+',
    label: 'Years of Experience',
    description: 'Building, launching, and scaling digital products through Armia Systems & CodeVentures.',
  },
  {
    value: '50+',
    numericValue: 50,
    suffix: '+',
    label: 'Startups Supported',
    description: 'Vetted founders backed with dedicated engineering teams, product leadership, and GTM strategy.',
  },
  {
    value: '$3.7M',
    numericValue: 3.7,
    prefix: '$',
    suffix: 'M',
    label: 'Recent Fundraising',
    description: 'Raised across 34 seed and pre-Series A rounds over an 18-month deployment window.',
  },
  {
    value: '$1B+',
    numericValue: 1,
    prefix: '$',
    suffix: 'B+',
    label: 'Lifetime Valuation',
    description: 'Aggregate enterprise valuation achieved across our portfolio company ecosystem.',
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Web Application Development',
    tagline: 'SaaS, marketplaces, and web platforms that scale.',
    description: 'High-performance web apps with clean, modular code built for rapid iteration.',
    tags: ['React & Next.js', 'Node.js & Python', 'Multi-tenant SaaS'],
    deliverables: [
      'Marketplace & workflow engines',
      'Cloud infrastructure & CI/CD',
      'UX systems and zero-downtime deploys',
    ],
    previewType: 'web',
  },
  {
    id: 'deep-tech',
    number: '02',
    title: 'Deep Tech & AI Integration',
    tagline: 'LLMs, agents, IoT, and applied AI in production.',
    description: 'We turn frontier tech into reliable product features that give you a real edge.',
    tags: ['Autonomous Agents', 'LLM Pipelines', 'IoT & Edge'],
    deliverables: [
      'AI pipelines & RAG systems',
      'Edge analytics & IoT telemetry',
    ],
    previewType: 'deeptech',
  },
  {
    id: 'mobile-apps',
    number: '03',
    title: 'Mobile Application Development',
    tagline: 'Native iOS, Android, and cross-platform apps.',
    description: 'Fluid mobile apps with offline sync, native features, and store-ready polish.',
    tags: ['iOS & Android', 'React Native', 'Flutter'],
    deliverables: [
      'App Store & Play Store launch',
      'Hardware, Bluetooth & sensor sync',
    ],
    previewType: 'mobile',
  },
  {
    id: 'user-acquisition',
    number: '04',
    title: 'User Acquisition & Growth',
    tagline: 'GTM strategy, conversion, and acquisition from day zero.',
    description: 'We pair the build with practical growth — funnels, paid acquisition, and retention.',
    tags: ['Go-to-Market', 'Paid Acquisition', 'Retention'],
    deliverables: [
      'Funnel analytics & cohort tracking',
      'Pilot customer acquisition',
      'Lifecycle CRM pipelines',
    ],
    previewType: 'marketing',
  },
];

export const ADVANTAGES: AdvantageItem[] = [
  {
    id: 'investor-readiness',
    number: '01',
    title: 'Your First Co-Investor',
    description:
      'CodeVentures may join you from the outset, investing development capital and skin-in-the-game equity before you even seek outside venture funds.',
    highlight: 'Co-build capital & equity alignment',
    iconName: 'BadgePercent',
  },
  {
    id: 'overhead-reduction',
    number: '02',
    title: 'Zero Tech Overhead',
    description:
      'We supply your entire technological foundation—cloud infrastructure, developer tooling, security compliance, and testing suites—saving tens of thousands upfront.',
    highlight: 'Save $100K+ in startup overhead',
    iconName: 'ShieldCheck',
  },
  {
    id: 'dedicated-squad',
    number: '03',
    title: 'Dedicated Engineering Squad',
    description:
      'Gain an elite, cross-functional team of senior full-stack developers, UI/UX designers, DevOps architects, and QA specialists managed directly by our leadership.',
    highlight: 'Day-one senior talent with zero hiring lag',
    iconName: 'Users',
  },
  {
    id: 'operator-mentorship',
    number: '04',
    title: '20+ Years Operator Leadership',
    description:
      'Direct mentorship and strategic guidance from Aji Abraham and seasoned technology operators who have built, bootstrapped, and exited successful ventures.',
    highlight: 'Interim CTO support & fundraising advisory',
    iconName: 'Compass',
  },
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: '01',
    title: 'Discover',
    timeframe: 'Week 1 — 2',
    description:
      'Our unique Discovery Workshop dives deep into your concept. We evaluate user pain points, audit competitors, test commercial assumptions, and align on product differentiation.',
    focus: 'Vision, Market Validation & User Problem Alignment',
    outputs: ['User Persona Map', 'Competitor Benchmark', 'Value Proposition Canvas'],
  },
  {
    step: '02',
    title: 'Define',
    timeframe: 'Week 2 — 3',
    description:
      'We transform your idea into an actionable engineering blueprint. We define the lean MVP scope, map user journeys, establish system architecture, and outline technical dependencies.',
    focus: 'Scope De-risking, System Architecture & User Stories',
    outputs: ['MVP Scope Definition', 'High-Level Architecture Diagram', 'Clickable Wireframes'],
  },
  {
    step: '03',
    title: 'Build',
    timeframe: 'Week 4 — 10',
    description:
      'Our dedicated squad builds the product in weekly delivery sprints. You get continuous testing deployments, transparent code reviews, and visible progress every single Friday.',
    focus: 'Agile Full-Stack Development & Quality Assurance',
    outputs: ['Weekly Staging Builds', 'Automated Test Suites', 'Production-Ready Codebase'],
  },
  {
    step: '04',
    title: 'Launch',
    timeframe: 'Week 10 — 12',
    description:
      'We deploy your product to scalable cloud infrastructure, launch in application stores, configure analytics telemetry, and recruit your first cohort of pilot customers.',
    focus: 'Production Deployment & Market Introduction',
    outputs: ['Store & Cloud Live Release', 'Analytics Telemetry Dashboard', 'Initial User Cohort Onboarded'],
  },
  {
    step: '05',
    title: 'Grow',
    timeframe: 'Ongoing Partnership',
    description:
      'We analyze behavioral data, optimize retention, iterate on high-leverage features, and support you through institutional fundraising or transitioning to an in-house team.',
    focus: 'Product-Market Fit, Scaling & Capital Advisory',
    outputs: ['Iterative Feature Releases', 'Interim CTO Advisory', 'Investor Deck & Metrics Preparation'],
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'tinybits',
    name: 'Tinybits',
    category: 'Children EdTech & Habit Formation',
    sector: 'Mobile',
    description:
      'A delightful mobile experience designed to help young children cultivate positive daily habits and emotional intelligence through interactive play and reward loops.',
    involvement: 'Full product architecture, native mobile development, gamification engine & UI design.',
    impact: 'Featured across family app categories; thousands of active family routines supported.',
    image: '/assets/portfolio/tinybits.png',
    tags: ['React Native', 'Gamification Engine', 'Parent Portal', 'Cloud Sync'],
  },
  {
    id: 'flexshft',
    name: 'FLEXSHFT',
    category: 'Workforce On-Demand Marketplace',
    sector: 'Marketplace',
    description:
      'A high-velocity mobile and web marketplace connecting healthcare and hospitality facilities with verified, on-demand shift workers in real time.',
    involvement: 'Real-time shift matching algorithm, compliance verification pipeline & automated payroll.',
    impact: 'Sub-60-second shift fulfillment rate with multi-city commercial rollouts.',
    image: '/assets/portfolio/flexshft.png',
    tags: ['Next.js', 'Geolocation API', 'Stripe Connect', 'Instant Payouts'],
  },
  {
    id: 'social-defender',
    name: 'Social Defender',
    category: 'AI Digital Safety & Bullying Prevention',
    sector: 'Deep Tech',
    description:
      'An intelligent digital monitoring and safeguarding suite that detects toxicity, harassment, and cyberbullying across messaging channels using contextual natural language models.',
    involvement: 'Custom NLP classification engine, multi-platform SDK integration & parental alert portal.',
    impact: 'Analyzed millions of message events with over 94% threat detection accuracy.',
    image: '/assets/portfolio/social-defender.jpg',
    tags: ['NLP Classifier', 'Real-time WebSocket', 'Privacy-Preserving AI', 'Cross-Platform'],
  },
  {
    id: 'carunify',
    name: 'CarUnify',
    category: 'Automotive Ecosystem & Fleet Telematics',
    sector: 'SaaS',
    description:
      'A unified automotive management platform connecting car owners, certified service centers, and fleet managers with real-time maintenance diagnostics and bookings.',
    involvement: 'End-to-end platform architecture, OBD-II device integration & booking management system.',
    impact: 'Rated exceptionally by founders and fleet owners; streamlined multi-vendor workflows.',
    image: '/assets/portfolio/carunify.png',
    tags: ['IoT Telemetry', 'Enterprise Dashboard', 'Mobile App', 'Payment Gateway'],
  },
  {
    id: 'mazeflower',
    name: 'Mazeflower',
    category: 'Consumer Digital Platform',
    sector: 'Marketplace',
    description:
      'An engaging digital experience platform featuring interactive content delivery, gamified challenges, and community interaction.',
    involvement: 'Interactive frontend engineering, responsive media delivery & high-concurrency database.',
    impact: 'Fast global load times and high user retention metrics.',
    image: '/assets/portfolio/mazeflower.png',
    tags: ['Next.js', 'Media Pipeline', 'Community Feed', 'Global CDN'],
  },
  {
    id: 'orb-tattoo',
    name: 'Orb Tattoo',
    category: 'Artist Booking & Studio Management',
    sector: 'Marketplace',
    description:
      'Specialized booking, portfolio showcase, and appointment management platform designed exclusively for premium tattoo studios and independent artists.',
    involvement: 'Custom calendar booking engine, visual portfolio grid & deposit payment automation.',
    impact: 'Reduced booking overhead by 65% for participating studio artists.',
    image: '/assets/portfolio/orb-tattoo.png',
    tags: ['Custom Booking', 'Stripe Payments', 'Artist Portfolios', 'SMS Automation'],
  },
  {
    id: 'alice',
    name: 'Alice',
    category: 'Artisanal Coffee & On-Demand Delivery',
    sector: 'Mobile',
    description:
      'Hyper-customized coffee ordering and doorstep delivery application with real-time barista preparation tracking.',
    involvement: 'Mobile order-ahead app, kitchen display system (KDS) & loyalty reward tiers.',
    impact: 'Exceptional customer repeat order rates in metropolitan pilot markets.',
    image: '/assets/portfolio/alice.jpg',
    tags: ['Order-Ahead', 'Kitchen Display', 'Loyalty System', 'Real-time Tracking'],
  },
  {
    id: 'locologic',
    name: 'Locologic',
    category: 'Last-Mile Delivery & Dispatch Optimization',
    sector: 'SaaS',
    description:
      'Enterprise logistics platform enabling 3PL providers, retailers, and couriers to optimize delivery routes and monitor field drivers in real time.',
    involvement: 'Route optimization algorithm, driver mobile application & customer live tracking web link.',
    impact: 'Decreased fuel and transit time by up to 28% across logistics fleets.',
    image: '/assets/portfolio/locologic.jpg',
    tags: ['Route Optimization', 'Driver Mobile App', 'Real-time GPS', 'Analytics'],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'early-mvp',
    name: 'Early MVP',
    subtitle: 'For early-stage startups validating fast',
    price: '$4,000',
    priceNote: 'Starting at initial engagement',
    timeline: 'Delivery in 8–12 weeks',
    equity: 'Equity: 5–10% (negotiated)',
    features: [
      'Core MVP scope definition & technical blueprint',
      'Full managed product squad (Engineers + Designer + QA)',
      'Modern, scalable web or native mobile application',
      'Database architecture & cloud deployment',
      'Essential third-party integrations (Auth, Payments, Analytics)',
      'Quick investor readiness & interactive demo prototype',
    ],
    ctaLabel: 'Apply for Early MVP',
    popular: false,
  },
  {
    id: 'turnkey-startup',
    name: 'Turnkey Startup',
    subtitle: 'For validated ideas ready to launch & scale',
    price: '$10,000 – $20,000',
    priceNote: 'Starting range based on project scope',
    timeline: 'Delivery timeline defined in discovery',
    equity: 'Equity: ~10% (negotiated)',
    badge: 'Most Popular',
    features: [
      'Everything in Early MVP included',
      'Full-time interim CTO & strategic technical guidance',
      'Comprehensive 2-week Discovery Workshop session',
      'Deep tech or complex algorithmic capabilities',
      'Complete go-to-market & user acquisition support',
      'Post-launch user testing and analytics telemetry',
      'Direct investor introductions & deck preparation',
    ],
    ctaLabel: 'Apply for Turnkey Model',
    popular: true,
  },
  {
    id: 'dedicated-team',
    name: 'Dedicated Team',
    subtitle: 'For scaling startups needing ongoing control',
    price: '$3,800 – $20,000',
    priceNote: 'Monthly investment based on squad composition',
    timeline: 'Ongoing partnership, 1–7 members',
    equity: 'Optional small equity alignment',
    features: [
      'Custom squad composition that you manage directly',
      'Dedicated full-time senior developers & UI/UX leads',
      'Assigned Project Manager & Scrum Master',
      'Continuous feature roadmap execution & sprint planning',
      'Flexible scale: adjust team capacity month-to-month',
      'Seamless talent transition to your in-house team post-funding',
    ],
    ctaLabel: 'Hire a Dedicated Squad',
    popular: false,
  },
];

export const PARTNER_PERKS: PartnerPerk[] = [
  {
    name: 'Amazon Web Services',
    logo: '/assets/partners/aws.svg',
    value: '$1,000 Credits',
    description: 'AWS Activate credits, architecture reviews, and premium technical support.',
    category: 'Cloud Infrastructure',
  },
  {
    name: 'Stripe',
    logo: '/assets/partners/stripe.svg',
    value: '$1,000 Credits',
    description: 'Waived processing fees on transactions and priority access to Stripe Atlas.',
    category: 'Payments & Billing',
  },
  {
    name: 'Google Cloud',
    logo: '/assets/partners/google-cloud.svg',
    value: '$1,000 Credits',
    description: 'GCP startup credits, Gemini AI developer tools, and Firebase support.',
    category: 'AI & Cloud',
  },
  {
    name: 'ZenDesk',
    logo: '/assets/partners/zendesk.svg',
    value: '3 Months Free',
    description: 'Full customer service suite, omnichannel ticketing, and knowledge base.',
    category: 'Customer Support',
  },
  {
    name: 'HubSpot',
    logo: '/assets/partners/hubspot.svg',
    value: '50% Discount',
    description: 'Enterprise CRM, marketing automation, inbound sales pipeline, and CMS.',
    category: 'Sales & Marketing',
  },
  {
    name: 'Apollo',
    logo: '/assets/partners/apollo.svg',
    value: '50% Discount',
    description: 'B2B lead intelligence, verified executive contacts, and automated outbound email.',
    category: 'GTM & Outreach',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Their dedication and proactive approach made the collaboration both efficient and highly effective. They did not just take requirements—they helped refine the core business model.',
    author: 'Chris Zelenka',
    role: 'Co-Founder',
    company: 'Orb Tattoo Studio Platform',
    avatar: '/assets/testimonials/chris-zelenka.png',
  },
  {
    quote:
      'We were highly satisfied with the Armia Systems & CodeVentures team on the CarUnify project, and they consistently exceeded our delivery expectations across complex mobile and IoT surfaces.',
    author: 'Tyler Novae',
    role: 'CEO & Founder',
    company: 'CarUnify',
    avatar: '/assets/testimonials/tyler-novae.png',
  },
  {
    quote:
      'They took the time upfront in the Discovery Workshop to really understand what I wanted the app to accomplish and made sure every single screen delivered that promise to our users.',
    author: 'Shari Morin-Degel',
    role: 'Founder',
    company: 'My Work BALANCE',
    avatar: '/assets/testimonials/shari-morin.png',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: '1. What is Codeventures and who is it for?',
    answer:
      'CodeVentures acts as a technical co-founder and startup studio for founders who lack in-house technical leadership. Whether you are a non-technical founder validating your first idea or an experienced operator scaling a new concept, we provide comprehensive product engineering, architectural leadership, and startup support—from the first wireframe through deployment and growth.',
    category: 'General',
  },
  {
    question: '2. What services does Codeventures provide?',
    answer:
      'We provide full-lifecycle venture-building services: Web Application Development (custom platforms, marketplaces, enterprise SaaS), Deep Tech Development (AI/ML models, LLM agents, blockchain, IoT, AR), Mobile Application Development (native iOS, Android, cross-platform), and User Acquisition & Marketing (GTM launch campaigns, funnel optimization, analytics telemetry).',
    category: 'Technical',
  },
  {
    question: '3. What is the Discovery Workshop, and how does it work?',
    answer:
      'The Discovery Workshop is our consultative kickoff phase. Over structured sessions, our senior product architects and engineers work side-by-side with you to explore your vision, audit user pain points, analyze competitors, and construct an actionable technical blueprint—defining the MVP scope, system architecture, database schema, and delivery timeline before code is written.',
    category: 'Process',
  },
  {
    question: '4. Are there any AI-powered tools available through Codeventures?',
    answer:
      'Yes, CodeVentures provides specialized proprietary startup tools: IdeaEngine (an AI-powered business plan generator that analyzes competitors and markets), AI Elevator Pitch Generator (creates three polished 30-second pitch variations), and an Equity Calculator (a transparent, data-driven framework for fair co-founder and advisor equity splits).',
    category: 'Technical',
  },
  {
    question: '5. Why partner with Codeventures instead of hiring freelance developers?',
    answer:
      'Freelancers execute isolated tasks without ownership or business context. CodeVentures operates as your invested technical co-founder. We bring 20+ years of institutional engineering experience from Armia Systems, complete product squads, dedicated PMs, and shared skin in the game through cash-plus-equity partnerships. Non-technical founders can launch production-ready products without quitting their jobs or risking massive upfront hiring capital.',
    category: 'General',
  },
  {
    question: "6. How is pricing structured, and what's the timeline for building an MVP?",
    answer:
      'Our Early MVP model starts at $4,000 with delivery in 8–12 weeks. Our Turnkey Startup model ranges from $10,000 to $20,000 for end-to-end development, full-time CTO support, and launch strategy. For ongoing scaling, dedicated developer squads range from $3,800 to $20,000 monthly for 1–7 engineers.',
    category: 'Pricing',
  },
  {
    question: '7. What industries does Codeventures work with?',
    answer:
      'We work across fintech, digital health & wellness, enterprise SaaS, on-demand marketplaces, logistics, education, and frontier tech like applied AI and computer vision. Our foundational engineering frameworks adapt seamlessly to both regulated industry standards and fast-moving consumer markets.',
    category: 'General',
  },
  {
    question: '8. How does Codeventures support startups after launch?',
    answer:
      'We remain actively invested in your success. Post-launch support includes: infrastructure monitoring and scaling, detailed analytics and user funnel reporting, real user usability testing, interim CTO advisory until you hire permanent leadership, and assisting in transitioning developers to your in-house team once you raise venture capital.',
    category: 'Process',
  },
  {
    question: '9. What is the typical engagement process with Codeventures?',
    answer:
      'Our engagement follows 5 clear steps: 1) Discovery Workshop to define the blueprint and scope; 2) MVP Development delivering tested features in 8–12 weeks; 3) Launch & Initial User Acquisition to gather real traction; 4) Post-launch iteration based on real data; 5) Long-term growth support or team transition.',
    category: 'Process',
  },
  {
    question: '10. Can non-technical founders successfully work with Codeventures?',
    answer:
      'Absolutely. In fact, CodeVentures was built specifically to empower non-technical founders. You bring domain expertise, customer insights, and business vision; we provide the complete technical leadership, engineering firepower, and architecture needed to build an institutional-grade technology business.',
    category: 'General',
  },
];
