import type { LucideIcon } from 'lucide-react';
import {
  Code2, Database, Binary, Atom, Server, Users, Layout,
} from 'lucide-react';

export type InterviewType = 'Java' | 'DSA' | 'SQL' | 'React' | 'Node.js' | 'HR' | 'System Design';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export const interviewTypes: { type: InterviewType; icon: LucideIcon; color: string; desc: string }[] = [
  { type: 'Java', icon: Code2, color: 'from-orange-500 to-red-500', desc: 'Core Java, OOP, concurrency' },
  { type: 'DSA', icon: Binary, color: 'from-blue-500 to-cyan-500', desc: 'Data structures & algorithms' },
  { type: 'SQL', icon: Database, color: 'from-emerald-500 to-teal-500', desc: 'Queries, joins, optimization' },
  { type: 'React', icon: Atom, color: 'from-cyan-500 to-sky-500', desc: 'Hooks, state, performance' },
  { type: 'Node.js', icon: Server, color: 'from-green-500 to-emerald-600', desc: 'Runtime, APIs, streams' },
  { type: 'HR', icon: Users, color: 'from-pink-500 to-rose-500', desc: 'Behavioral & culture fit' },
  { type: 'System Design', icon: Layout, color: 'from-violet-500 to-purple-600', desc: 'Scalability & architecture' },
];

export const difficulties: { level: Difficulty; color: string; desc: string }[] = [
  { level: 'Beginner', color: 'from-emerald-400 to-green-500', desc: 'Warm-up & fundamentals' },
  { level: 'Intermediate', color: 'from-amber-400 to-orange-500', desc: 'Real-world problem solving' },
  { level: 'Advanced', color: 'from-rose-400 to-red-500', desc: 'Expert-level depth' },
];

export const questionBank: Record<InterviewType, string[]> = {
  Java: [
    'Explain the difference between abstract classes and interfaces in Java, and when would you use each?',
    'How does the JVM handle garbage collection? Describe the generational model.',
    'What is the volatile keyword and how does it differ from synchronized?',
    'Describe how HashMap works internally, including the role of hashCode() and equals().',
    'Explain Java Memory Model and what "happens-before" means.',
  ],
  DSA: [
    'Given an array of integers, find the two numbers that sum to a target. Walk through your approach.',
    'Explain the time and space complexity of quicksort vs. mergesort.',
    'How would you detect a cycle in a linked list? Describe multiple approaches.',
    'Implement a LRU cache. What data structures would you use and why?',
    'Given a binary tree, find the lowest common ancestor of two nodes.',
  ],
  SQL: [
    'Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN with examples.',
    'What is a database index and how does a B-tree index improve query performance?',
    'Write a query to find the second-highest salary in an employee table.',
    'Explain ACID properties and why they matter in transactional systems.',
    'How would you optimize a slow-running query? Walk through your debugging process.',
  ],
  React: [
    'Explain the React reconciliation algorithm and the role of the virtual DOM.',
    'When should you use useMemo vs. useCallback vs. React.memo?',
    'Describe how the useEffect dependency array works and common pitfalls.',
    'How would you optimize a React app that re-renders too often?',
    'Explain the difference between controlled and uncontrolled components.',
  ],
  'Node.js': [
    'Explain the Node.js event loop and how it handles asynchronous operations.',
    'What is the difference between callbacks, promises, and async/await?',
    'How would you handle streams in Node.js for large file processing?',
    'Describe how you would structure a scalable REST API in Node.js.',
    'What are worker threads and when would you use them?',
  ],
  HR: [
    'Tell me about yourself and what drew you to this role.',
    'Describe a challenging situation with a teammate and how you resolved it.',
    'What is your greatest weakness, and how are you working on it?',
    'Tell me about a time you failed. What did you learn?',
    'Where do you see yourself in five years?',
  ],
  'System Design': [
    'Design a URL shortener like bit.ly. Walk through the architecture.',
    'How would you design a real-time chat application for millions of users?',
    'Design a rate limiter. What algorithms would you consider?',
    'How would you design a distributed cache system?',
    'Design a notification system that handles email, SMS, and push notifications.',
  ],
};

export interface InterviewHistoryItem {
  id: string;
  type: InterviewType;
  difficulty: Difficulty;
  score: number;
  date: string;
  duration: string;
  questions: number;
}

export const interviewHistory: InterviewHistoryItem[] = [
  { id: 'int-001', type: 'React', difficulty: 'Intermediate', score: 87, date: '2026-07-14', duration: '24 min', questions: 5 },
  { id: 'int-002', type: 'DSA', difficulty: 'Advanced', score: 72, date: '2026-07-12', duration: '31 min', questions: 5 },
  { id: 'int-003', type: 'System Design', difficulty: 'Advanced', score: 65, date: '2026-07-09', duration: '28 min', questions: 4 },
  { id: 'int-004', type: 'HR', difficulty: 'Beginner', score: 91, date: '2026-07-05', duration: '18 min', questions: 5 },
  { id: 'int-005', type: 'Java', difficulty: 'Intermediate', score: 78, date: '2026-07-01', duration: '26 min', questions: 5 },
  { id: 'int-006', type: 'SQL', difficulty: 'Intermediate', score: 83, date: '2026-06-28', duration: '22 min', questions: 5 },
];

export const skillProgress = [
  { skill: 'React', level: 85, trend: '+8%' },
  { skill: 'DSA', level: 72, trend: '+5%' },
  { skill: 'System Design', level: 65, trend: '+3%' },
  { skill: 'SQL', level: 83, trend: '+6%' },
  { skill: 'Java', level: 78, trend: '+4%' },
  { skill: 'Communication', level: 90, trend: '+12%' },
];

export const performanceData = [
  { month: 'Jan', score: 55 },
  { month: 'Feb', score: 62 },
  { month: 'Mar', score: 68 },
  { month: 'Apr', score: 71 },
  { month: 'May', score: 76 },
  { month: 'Jun', score: 82 },
  { month: 'Jul', score: 87 },
];

export const recentActivity = [
  { action: 'Completed React interview', time: '2 days ago', score: 87 },
  { action: 'Completed DSA interview', time: '4 days ago', score: 72 },
  { action: 'Earned "Consistent Learner" badge', time: '5 days ago' },
  { action: 'Completed HR interview', time: '1 week ago', score: 91 },
  { action: 'Joined InterviewIQ AI', time: '3 weeks ago' },
];

export const badges = [
  { name: 'First Interview', icon: '🎯', earned: true },
  { name: 'Consistent Learner', icon: '🔥', earned: true },
  { name: 'Top Scorer', icon: '🏆', earned: true },
  { name: 'DSA Master', icon: '🧠', earned: false },
  { name: 'System Architect', icon: '🏗️', earned: false },
  { name: 'Communication Pro', icon: '💬', earned: true },
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Frontend Engineer @ Stripe',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote:
      'InterviewIQ AI transformed my prep. The instant feedback loop helped me identify blind spots I never knew I had. Landed my dream job in 3 weeks.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Backend Engineer @ Airbnb',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote:
      'The system design interviews felt incredibly real. The AI follow-up questions adapt to your answers like a senior engineer would. Game changer.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Full Stack Developer @ Shopify',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote:
      'I went from nervous wreck to confident in a month. The performance analytics showed me exactly where to focus. Worth every minute.',
    rating: 5,
  },
];

export const resultData = {
  overall: 82,
  scores: {
    technical: 85,
    communication: 78,
    confidence: 80,
    problemSolving: 84,
  },
  strengths: [
    'Strong understanding of React hooks and state management',
    'Clear, structured explanations with good code examples',
    'Excellent problem decomposition and edge case handling',
  ],
  weaknesses: [
    'Could improve on system design scalability discussions',
    'Time complexity analysis was sometimes incomplete',
    'More depth needed on performance optimization techniques',
  ],
  suggestions: [
    'Practice 2-3 system design problems per week to build architectural intuition',
    'Review Big-O notation for common data structures and algorithms',
    'Study React performance profiling tools and memoization strategies',
    'Record yourself explaining solutions to build communication confidence',
  ],
  resources: [
    { title: 'System Design Primer', type: 'GitHub Repo', url: '#' },
    { title: 'React Performance Deep Dive', type: 'Article', url: '#' },
    { title: 'Big-O Cheat Sheet', type: 'Reference', url: '#' },
    { title: 'Cracking the Coding Interview', type: 'Book', url: '#' },
  ],
};
