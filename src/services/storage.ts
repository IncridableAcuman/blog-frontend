import type { BlogPost, Category, Comment, UserProfile, DashboardStats } from '../types/blog';

const STORAGE_KEYS = {
  POSTS: 'nexus_blog_posts',
  CATEGORIES: 'nexus_blog_categories',
  COMMENTS: 'nexus_blog_comments',
  USERS: 'nexus_blog_users',
  BOOKMARKS: 'nexus_blog_bookmarks',
};

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Neural UI & UX',
    slug: 'neural-ui-ux',
    description: 'Next-generation adaptive interfaces, micro-interactions, and spatial design systems.',
    color: 'from-purple-500 to-indigo-600',
    iconName: 'Sparkles',
    postCount: 14,
  },
  {
    id: 'cat-2',
    name: 'Fullstack & React',
    slug: 'fullstack-react',
    description: 'React 19, TypeScript, server components, compiler deep-dives, and performance tuning.',
    color: 'from-blue-500 to-cyan-500',
    iconName: 'Code',
    postCount: 28,
  },
  {
    id: 'cat-3',
    name: 'AI & Machine Learning',
    slug: 'ai-ml',
    description: 'LLM agents, vector embeddings, autonomous workflows, and neural inference at scale.',
    color: 'from-emerald-500 to-teal-500',
    iconName: 'Cpu',
    postCount: 19,
  },
  {
    id: 'cat-4',
    name: 'Cloud & DevOps',
    slug: 'cloud-devops',
    description: 'Kubernetes, edge compute, distributed databases, zero-trust security and WASM runtime.',
    color: 'from-amber-500 to-orange-500',
    iconName: 'Server',
    postCount: 11,
  },
  {
    id: 'cat-5',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Quantum-safe cryptography, smart contract audits, and zero-day defense strategies.',
    color: 'from-rose-500 to-pink-600',
    iconName: 'Shield',
    postCount: 8,
  },
];

const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Mark Johnson',
    email: 'mark.johnson@nexusblog.io',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Lead Design Technologist & Systems Architect. Writing about futuristic UI paradigms and scalable web architecture.',
    articlesCount: 42,
    joinedDate: 'Jan 2025',
  },
  {
    id: 'user-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@nexusblog.io',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior AI Engineer & Prompt Architect. Passionate about multi-agent systems and cognitive computing.',
    articlesCount: 26,
    joinedDate: 'Mar 2025',
  },
  {
    id: 'user-3',
    name: 'Alex Rivers',
    email: 'alex.rivers@nexusblog.io',
    role: 'Author',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Distributed systems engineer. Writing about WebAssembly, Rust kernel modules, and high-concurrency backend services.',
    articlesCount: 18,
    joinedDate: 'May 2025',
  },
];

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'future-of-neural-ui-design-2026',
    title: 'The Future of Neural UI Design: Adaptive Aesthetics in 2026',
    excerpt: 'Explore how generative artificial intelligence and biometric intent tracking are completely redefining interactive user interface design systems.',
    content: `## The Next Frontier of Digital Interaction

Interfaces are no longer static grids of buttons and text. In 2026, the convergence of high-frequency local neural models and sensory input has ushered in the era of **Adaptive Neural Interfaces**. 

### 1. Intent Prediction Over Reactive Feedback
Traditional UI waits for a mouse click or screen tap before initiating a transition. Neural UI systems continuously evaluate user micro-gestures, gaze direction, and past behavioral workflows to prepare context states milliseconds ahead of time.

> "A truly intelligent interface does not force users to adapt to its layout; rather, the layout fluidly bends around user intention in real-time."

### 2. Glassmorphism Evolution: Dynamic Refractive Materials
Notice the subtle light dispersion on our cards. Rather than fixed CSS blurs, modern design embraces real-time GPU shader pipelines. We achieve:
- **Depth modulation** based on scroll velocity
- **Chromatic aberration** that mimics optical glass prisms
- **Adaptive luminescent accents** reflecting system state

### 3. Key Takeaways for Product Architects
1. Design for fluid state transitions rather than rigid page boundaries.
2. Ensure accessibility is baked into adaptive layers with fallback high-contrast modes.
3. Optimize GPU rendering cycles by offloading blur calculations to CSS backdrop-filter hardware acceleration.`,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    category: 'Neural UI & UX',
    tags: ['UI/UX', 'Glassmorphism', 'Generative Design', 'Frontend'],
    status: 'Published',
    views: 34820,
    likes: 1845,
    readTime: '6 min read',
    createdAt: '2026-05-12',
    updatedAt: '2026-05-14',
    author: {
      id: 'user-1',
      name: 'Mark Johnson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Lead Editor',
      bio: 'Lead Design Technologist & Systems Architect.',
    },
    featured: true,
  },
  {
    id: 'post-2',
    slug: 'mastering-react-19-concurrent-features',
    title: 'Mastering React 19: Actions, Server Signals and the Compiler',
    excerpt: 'A comprehensive engineering guide on leveraging React 19 automatic memoization, optimistic UI updates, and native resource prefetching.',
    content: `## A Quantum Leap for React Developers

React 19 represents the most monumental shift in frontend architecture since the introduction of Hooks. With the automated React Compiler, manual \`useMemo\` and \`useCallback\` micro-optimizations are officially obsolete.

### Key Highlights:
1. **The React Compiler (React Forget)**: Automatically tracks re-renders and handles granular caching.
2. **First-class Server Actions**: Direct RPC communication between client and server components without boilerplate controllers.
3. **Optimistic Hooks**: Seamless feedback loops for asynchronous mutation using \`useOptimistic\`.

\`\`\`tsx
import { useOptimistic } from 'react';

function LikeButton({ initialLikes, onLike }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (current, update) => current + (update as number)
  );

  return (
    <button onClick={async () => {
      setOptimisticLikes(1);
      await onLike();
    }}>
      ❤️ {optimisticLikes}
    </button>
  );
}
\`\`\`

This pattern completely eliminates jarring UI latency and gives end users an instant, responsive feeling.`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80',
    category: 'Fullstack & React',
    tags: ['React 19', 'TypeScript', 'Performance', 'WebDev'],
    status: 'Published',
    views: 28940,
    likes: 1420,
    readTime: '8 min read',
    createdAt: '2026-05-10',
    updatedAt: '2026-05-11',
    author: {
      id: 'user-1',
      name: 'Mark Johnson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Lead Editor',
    },
    featured: true,
  },
  {
    id: 'post-3',
    slug: 'autonomous-ai-agents-production-guide',
    title: 'Deploying Autonomous Multi-Agent Workflows in Production',
    excerpt: 'Architectural blueprints, consensus protocols, and safety guardrails for running cooperative LLM agents in enterprise environments.',
    content: `## Building Robust Multi-Agent Swarms

When moving beyond simple prompt chains, autonomous agent swarms require explicit communication protocols, deterministic state machines, and fail-safe human-in-the-loop triggers.

### Architectural Principles:
- **Role Isolation**: Each agent must have a tightly bounded domain responsibility.
- **Shared Memory Matrix**: Using vector memory stores (Qdrant, Pinecone) combined with short-term transactional scratchpads.
- **Verification Gates**: Automated linting and test execution before an agent can commit mutations to staging environments.`,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80',
    category: 'AI & Machine Learning',
    tags: ['AI Agents', 'LLM', 'Python', 'Architecture'],
    status: 'Published',
    views: 19850,
    likes: 930,
    readTime: '10 min read',
    createdAt: '2026-05-08',
    updatedAt: '2026-05-08',
    author: {
      id: 'user-2',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'Senior AI Engineer',
    },
    featured: false,
  },
  {
    id: 'post-4',
    slug: 'webassembly-edge-computing-benchmarks',
    title: 'High-Throughput Edge Streaming with Rust & WebAssembly',
    excerpt: 'How we reduced serverless cold-start latency down to sub-1ms and doubled processing throughput using WASM component models.',
    content: `## Microsecond Execution on the Edge

Traditional container runtimes carry substantial OS overhead. By compiling native Rust logic into standard Wasm bytecode, serverless edge workers can boot instantly and scale effortlessly across hundreds of global points of presence.`,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    category: 'Cloud & DevOps',
    tags: ['WASM', 'Rust', 'Cloudflare', 'Edge'],
    status: 'Published',
    views: 15400,
    likes: 812,
    readTime: '7 min read',
    createdAt: '2026-05-04',
    updatedAt: '2026-05-05',
    author: {
      id: 'user-3',
      name: 'Alex Rivers',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Staff Infrastructure',
    },
    featured: false,
  },
  {
    id: 'post-5',
    slug: 'quantum-safe-cryptography-web-standard',
    title: 'Post-Quantum TLS: Preparing Web Applications for 2027',
    excerpt: 'A practical migration checklist for adopting NIST-approved post-quantum algorithms like ML-KEM and ML-DSA before legacy RSA becomes vulnerable.',
    content: `## The Harvest-Now-Decrypt-Later Threat Model

While commercial quantum computers with cryptanalytically relevant qubit counts are still in development, adversaries are already archiving encrypted network traffic today. We analyze the latency impact of Kyber hybrid handshakes on modern browsers.`,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    category: 'Cybersecurity',
    tags: ['Security', 'Cryptography', 'TLS', 'WebStandards'],
    status: 'Under Review',
    views: 4210,
    likes: 310,
    readTime: '5 min read',
    createdAt: '2026-05-02',
    updatedAt: '2026-05-03',
    author: {
      id: 'user-3',
      name: 'Alex Rivers',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Staff Infrastructure',
    },
    featured: false,
  },
  {
    id: 'post-6',
    slug: 'tailwind-v4-modern-styling-guide',
    title: 'Zero-Config Styling: Deep Dive into Tailwind CSS v4 Engine',
    excerpt: 'Unpacking the Lightning CSS powered compiler, native CSS variables cascading, dynamic container queries, and seamless Vite integration.',
    content: `Tailwind CSS v4 is a total rewrite that drops Babel/PostCSS dependencies in favor of native Rust LightningCSS. Learn how CSS variables become first-class theme tokens.`,
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    category: 'Fullstack & React',
    tags: ['CSS', 'Tailwind', 'Frontend', 'Design'],
    status: 'Draft',
    views: 0,
    likes: 0,
    readTime: '4 min read',
    createdAt: '2026-05-01',
    updatedAt: '2026-05-01',
    author: {
      id: 'user-1',
      name: 'Mark Johnson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Lead Editor',
    },
    featured: false,
  },
];

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'comm-1',
    postId: 'post-1',
    postTitle: 'The Future of Neural UI Design: Adaptive Aesthetics in 2026',
    authorName: 'Sarah Jenkins',
    authorEmail: 'sarah.j@example.com',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    content: 'The depth modulation and optical glass blur concept is genuinely breathtaking! We are already prototyping this for our fintech dashboard.',
    createdAt: '2 hours ago',
    status: 'Approved',
    likes: 18,
  },
  {
    id: 'comm-2',
    postId: 'post-2',
    postTitle: 'Mastering React 19: Actions, Server Signals and the Compiler',
    authorName: 'David Chen',
    authorEmail: 'david.chen@enterprise.tech',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    content: 'The useOptimistic hook example made it crystal clear. No more spinning wheels on instant button interactions!',
    createdAt: '4 hours ago',
    status: 'Approved',
    likes: 24,
  },
  {
    id: 'comm-3',
    postId: 'post-3',
    postTitle: 'Deploying Autonomous Multi-Agent Workflows in Production',
    authorName: 'Dmitri Pavlov',
    authorEmail: 'dmitri.p@deepai.labs',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    content: 'Could you elaborate on how consensus conflicts are resolved when two agents propose conflicting database migrations?',
    createdAt: '1 day ago',
    status: 'Approved',
    likes: 9,
  },
  {
    id: 'comm-4',
    postId: 'post-1',
    postTitle: 'The Future of Neural UI Design: Adaptive Aesthetics in 2026',
    authorName: 'WebSpamBot',
    authorEmail: 'promo@freecrypto-deals.xyz',
    content: 'Click here to buy automated followers and instant backlinks!!! Discount code: NEXUS2026',
    createdAt: '3 days ago',
    status: 'Spam',
    likes: 0,
  },
  {
    id: 'comm-5',
    postId: 'post-4',
    postTitle: 'High-Throughput Edge Streaming with Rust & WebAssembly',
    authorName: 'Maya Lin',
    authorEmail: 'maya@cloudedge.dev',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    content: 'Sub-1ms cold start is unbelievable. We migrated our telemetry pipeline from Node to WASM and saw 4x memory reduction.',
    createdAt: '3 days ago',
    status: 'Pending',
    likes: 5,
  },
];

export const StorageService = {
  getPosts: (): BlogPost[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.POSTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
        return INITIAL_POSTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_POSTS;
    }
  },

  savePosts: (posts: BlogPost[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (err) {
      console.error('Error saving posts to localStorage', err);
    }
  },

  getCategories: (): Category[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        return INITIAL_CATEGORIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CATEGORIES;
    }
  },

  saveCategories: (categories: Category[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (err) {
      console.error('Error saving categories to localStorage', err);
    }
  },

  getComments: (): Comment[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(INITIAL_COMMENTS));
        return INITIAL_COMMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_COMMENTS;
    }
  },

  saveComments: (comments: Comment[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    } catch (err) {
      console.error('Error saving comments to localStorage', err);
    }
  },

  getUsers: (): UserProfile[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
        return INITIAL_USERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_USERS;
    }
  },

  getBookmarks: (): string[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : ['post-1', 'post-2'];
    } catch {
      return ['post-1'];
    }
  },

  saveBookmarks: (ids: string[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(ids));
    } catch (err) {
      console.error('Error saving bookmarks', err);
    }
  },

  getDashboardStats: (posts: BlogPost[], comments: Comment[]): DashboardStats => {
    const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
    const approvedComments = comments.filter(c => c.status === 'Approved').length;

    return {
      totalViews,
      viewsChange: '+28.4%',
      totalPosts: posts.length,
      postsChange: '+14%',
      totalComments: approvedComments,
      commentsChange: '+19.2%',
      satisfactionRate: 96.8,
      satisfactionChange: '+4.2%',
      weeklyViews: [
        { day: 'Mon', views: 8400, visitors: 4200 },
        { day: 'Tue', views: 12500, visitors: 6100 },
        { day: 'Wed', views: 9800, visitors: 5300 },
        { day: 'Thu', views: 18400, visitors: 9400 },
        { day: 'Fri', views: 24200, visitors: 11800 },
        { day: 'Sat', views: 16900, visitors: 8200 },
        { day: 'Sun', views: 21500, visitors: 10500 },
      ],
      categoryDistribution: [
        { name: 'Neural UI & UX', percentage: 38, color: '#a855f7' },
        { name: 'Fullstack & React', percentage: 32, color: '#06b6d4' },
        { name: 'AI & ML', percentage: 18, color: '#10b981' },
        { name: 'Cloud & DevOps', percentage: 12, color: '#f59e0b' },
      ],
    };
  },
};
