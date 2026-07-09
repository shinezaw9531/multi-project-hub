import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, Layers, Settings, AppWindow } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeProject: string;
  setActiveProject: (id: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeProject, setActiveProject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'hub', name: 'Dashboard Hub', icon: LayoutDashboard },
    { id: 'alpha', name: 'Project Alpha', icon: Layers },
    { id: 'beta', name: 'Project Beta', icon: AppWindow },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-200 border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-xl font-bold text-white tracking-wide">Console Central</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveProject(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeProject === item.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                    : 'hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Drawer Slide-out */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-72 bg-slate-900 text-slate-200 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <span className="text-lg font-bold text-white">Console Central</span>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveProject(item.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium ${
                      activeProject === item.id ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Container Wrapper */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header panel */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <button onClick={() => setIsOpen(true)} className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm font-medium text-gray-700">Developer Profile</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">Dev</div>
          </div>
        </header>

        {/* Dynamic Display Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};