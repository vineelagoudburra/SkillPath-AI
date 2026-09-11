import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkillPath AI — Evidence-Based Career Readiness Engine',
  description: 'Know where you stand. Know what to learn next. Turn your resume, projects and target job into an evidence-based career readiness profile.',
  keywords: ['career readiness', 'skill gap analyzer', 'resume analyzer', 'developer roadmap', 'project upgrader'],
  authors: [{ name: 'SkillPath AI Team' }],
  openGraph: {
    title: 'SkillPath AI — Evidence-Based Career Readiness Engine',
    description: 'Know where you stand. Know what to learn next.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#070b14',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
        <div className="relative min-h-screen flex flex-col">
          {/* Ambient background light gradients */}
          <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 ambient-glow bg-indigo-600 animate-ambient -z-10" />
          <div className="fixed top-[40%] right-[-150px] ambient-glow bg-cyan-600 animate-ambient -z-10" style={{ animationDelay: '4s' }} />
          <div className="fixed bottom-[-100px] left-[-150px] ambient-glow bg-emerald-600 animate-ambient -z-10" style={{ animationDelay: '8s' }} />
          
          {children}
        </div>
      </body>
    </html>
  );
}
