import React, { useState, useMemo } from 'react';
import { Code, Users, Briefcase, Star, Search, Filter } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import Modal from './Modal';
import { Project as ProjectType } from '../types';

const Projects: React.FC = () => {
  const { data } = useLanguage();
  const { projects, ui } = data;
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  
  // New States for Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const toggleShowAll = () => setShowAll(!showAll);

  // Extract unique technologies/categories for filter buttons
  // Simply manually defining popular ones to avoid clutter
  const filters = ['All', 'Odoo', 'Python', 'Lead', 'Manager'];

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Text Search
      const matchesSearch = 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.toLowerCase().includes(searchTerm.toLowerCase());

      // Category Filter
      let matchesFilter = true;
      if (activeFilter !== 'All') {
        if (activeFilter === 'Lead') {
           matchesFilter = project.position.toLowerCase().includes('lead') || project.position.toLowerCase().includes('trưởng nhóm');
        } else if (activeFilter === 'Manager') {
           matchesFilter = project.position.toLowerCase().includes('manager') || project.position.toLowerCase().includes('quản lý');
        } else {
           matchesFilter = project.technologies.toLowerCase().includes(activeFilter.toLowerCase()) || 
                           project.name.toLowerCase().includes(activeFilter.toLowerCase());
        }
      }

      return matchesSearch && matchesFilter;
    });
  }, [projects, searchTerm, activeFilter]);

  // Determine which projects to show based on "Show All" toggle
  // If user is searching/filtering, we usually want to show all results, ignoring the "Show Less" limit
  const visibleProjects = (searchTerm || activeFilter !== 'All' || showAll) 
    ? filteredProjects 
    : filteredProjects.slice(0, 6);

  return (
    <>
      <section className="py-20 px-4 relative" id="section-projects">
        {/* Floating Stars for Projects Section */}
        <div className="absolute top-10 left-10 text-vn-red/20 animate-spin-slow pointer-events-none"><Star size={40} /></div>
        <div className="absolute top-40 right-20 text-vn-yellow/20 animate-pulse-slow pointer-events-none"><Star size={32} /></div>
        <div className="absolute bottom-20 left-1/3 text-blue-400/20 animate-bounce-slow pointer-events-none"><Star size={24} /></div>

        <div className="max-w-[90rem] mx-auto relative group">
             {/* Main Glass Container */}
             <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white/50 dark:border-slate-700/50 -z-10"></div>
             
             {/* Content Padding */}
             <div className="p-8 md:p-12 lg:p-16">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/30 transform rotate-3 hover:rotate-6 transition-transform">
                      <Code size={32} />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight uppercase">{ui.sections.projects}</h2>
                        <div className="h-1 w-20 bg-vn-red mt-2 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Decorative counter - BOLDER AND DARKER */}
                  <div className="hidden md:block text-right">
                       <span className="text-6xl font-display font-extrabold text-slate-800 dark:text-slate-200">{filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length}</span>
                       <span className="block text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">{ui.labels.totalProjects}</span>
                  </div>
                </div>

                {/* --- Search & Filter Bar --- */}
                <div className="mb-12 flex flex-col lg:flex-row gap-4 items-center justify-between relative z-20">
                    {/* Search Input */}
                    <div className="relative w-full lg:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-slate-400 group-focus-within:text-vn-red transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            placeholder={ui.labels.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-vn-red/50 text-slate-700 dark:text-slate-200 shadow-sm transition-all"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                        <div className="flex items-center gap-2 mr-2 text-slate-400">
                             <Filter size={16} />
                             <span className="text-xs font-bold uppercase">{ui.labels.filter}:</span>
                        </div>
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                    activeFilter === filter 
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' 
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {visibleProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 animate-fade-in-up">
                    {visibleProjects.map((project, index) => (
                      <div 
                        key={project.id} 
                        onClick={() => setSelectedProject(project)}
                        className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-vn-red/10 hover:-translate-y-2 transition-all duration-300 flex flex-col group/card cursor-pointer relative break-inside-avoid"
                      >
                        {/* Top Gradient Bar */}
                        <div className="h-2 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 group-hover/card:from-vn-red group-hover/card:via-orange-500 group-hover/card:to-vn-yellow transition-all duration-500"></div>
                        
                        <div className="p-8 flex-1 flex flex-col relative">
                          {/* Background number watermark */}
                          <div className="absolute -right-4 -bottom-4 text-[100px] font-display font-bold text-slate-50 dark:text-slate-900/50 pointer-events-none select-none z-0 group-hover/card:text-red-50 dark:group-hover/card:text-red-900/10 transition-colors">
                              {index + 1}
                          </div>

                          <div className="relative z-10">
                              <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover/card:text-vn-red transition-colors font-display tracking-wide">{project.name}</h3>
                              </div>
                              
                              <div className="mb-6 flex flex-wrap gap-2">
                                  <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600 shadow-sm">
                                      {project.period}
                                  </span>
                                  <span className="text-xs font-bold bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                                      {project.customer}
                                  </span>
                              </div>
                              
                              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3 min-h-[4.5em]">
                                {project.description}
                              </p>

                              <div className="space-y-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-700">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                                  <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-vn-red dark:text-red-400 font-bold">
                                    <Users size={14} />
                                    <span>{project.teamSize}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded text-yellow-700 dark:text-yellow-400 font-bold">
                                    <Briefcase size={14} />
                                    <span>{project.position}</span>
                                  </div>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700 group-hover/card:border-slate-200 transition-colors">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{ui.common.techStack}</p>
                                  <p className="text-xs text-slate-800 dark:text-slate-200 font-bold font-mono leading-tight line-clamp-1">{project.technologies}</p>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500 dark:text-slate-400 text-lg">{ui.labels.noResults}</p>
                        <button onClick={() => {setSearchTerm(''); setActiveFilter('All');}} className="mt-4 text-vn-red font-bold hover:underline">{ui.labels.clearFilters}</button>
                    </div>
                )}

                {/* Show More Button (Only if NOT searching/filtering and has more projects) */}
                {filteredProjects.length > 6 && !searchTerm && activeFilter === 'All' && (
                  <div className="mt-16 text-center print:hidden relative z-10">
                    <button 
                      onClick={toggleShowAll}
                      className="group px-10 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-full hover:bg-vn-red hover:dark:bg-vn-red hover:dark:text-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 mx-auto"
                    >
                      {showAll ? ui.common.showLess : ui.common.viewAll}
                    </button>
                  </div>
                )}
             </div>
        </div>
      </section>

      {/* Project Modal */}
      <Modal 
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name || ''}
      >
        {selectedProject && (
          <div className="space-y-6">
             <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/50 text-sm">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-slate-500 block text-xs uppercase font-bold tracking-wide">{ui.labels.time}</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedProject.period}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block text-xs uppercase font-bold tracking-wide">{ui.labels.customer}</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedProject.customer}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block text-xs uppercase font-bold tracking-wide">{ui.common.teamSize}</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedProject.teamSize}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block text-xs uppercase font-bold tracking-wide">{ui.common.role}</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedProject.position}</span>
                    </div>
                </div>
             </div>

             <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{ui.labels.description}</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedProject.description}</p>
             </div>

             <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{ui.labels.responsibilities}</h4>
                <ul className="space-y-2">
                    {selectedProject.responsibilities.map((res, i) => (
                        <li key={i} className="flex items-start text-slate-700 dark:text-slate-300">
                             <span className="mr-3 mt-2 block w-1.5 h-1.5 rounded-full bg-vn-red flex-shrink-0"></span>
                             <span>{res}</span>
                        </li>
                    ))}
                </ul>
             </div>

             <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{ui.labels.technologies}</h4>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-slate-800 dark:text-slate-200 font-medium font-mono text-sm">
                    {selectedProject.technologies}
                </div>
             </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Projects;