import {
  Code2,
  Database,
  Server,
  Layout,
  Cpu,
  Wrench
} from 'lucide-react';

export const skillsData = [
  {
    category: "Languages",
    icon: Cpu,
    items: ["Python", "SQL", "Javascript", "TypeScript"]
  },
  {
    category: "Frontend",
    icon: Layout,
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "ShadCn"]
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "Python"]
  },
  {
    category: "Database",
    icon: Database,
    items: ["PostgreSQL", "Supabase"]
  },
  {
    category: "UI/UX",
    icon: Code2,
    items: ["Responsive Design", "User Interface Design", "Design Principles"]
  },
  {
    category: "Tools",
    icon: Wrench,
    items: ["Git", "Figma", "PowerBI", "Excel"]
  }
];
