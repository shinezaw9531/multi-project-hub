import { useState } from 'react';
import { Layout } from './components/Layout';
import { Layers, AppWindow, ExternalLink } from 'lucide-react';

// Central Registry of all your standalone projects
const PROJECTS_REGISTRY = [
  {
    id: 'alpha',
    name: 'Project Alpha',
    description: 'Standalone CRM & Client Management Module.',
    // localUrl: 'http://localhost:5181',
    localUrl: '/multi-project-hub/alpha/', // Relative online link
    status: 'Active',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    icon: Layers
  },
  {
    id: 'beta',
    name: 'Project Beta',
    description: 'Decoupled Analytics & Data Aggregation Engine.',
    // localUrl: 'http://localhost:5182',
    localUrl: '/multi-project-hub/beta/', // Relative online link
    status: 'Maintenance',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    icon: AppWindow
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('hub');

  return (
    <Layout activeProject={activeTab} setActiveProject={setActiveTab}>
      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">System Workspace Hub</h1>
          <p className="text-sm text-slate-500 mt-1">
            Central orchestration console routing to independent standalone micro-apps.
          </p>
        </div>

        {/* Dynamic Matrix/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_REGISTRY.map((project) => {
            const Icon = project.icon;
            return (
              <div 
                key={project.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between p-6 group"
              >
                <div>
                  {/* Card Header Elements */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${project.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {project.status}
                    </span>
                  </div>

                  {/* Core Card Info */}
                  <h3 className="font-bold text-slate-800 text-lg mt-4 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Routing Link Trigger */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{project.localUrl}</span>
                  <a 
                    href={project.localUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Launch App
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}